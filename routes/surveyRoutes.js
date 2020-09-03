const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const recipientSchema = require("../models/Recipient");
const Mailer = require("../services/Mailer");
const surveyTemplate2 = require("../services/emailTemplates/surveyTemplate2");

//use to create an instance of the survey class
//then call save() to actually get it in the db
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  
  //callback for email response
  app.get("//api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you for your feedback!");
  });

  //for sendgrid to deal with email response
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            //find criteria
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            //update info
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });

//send a new survey
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), //return email as object
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate2(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      //update header
      res.send(user); 
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //get all surveys
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });

  //get one survey
  app.get("/api/surveys/:id", requireLogin, async (req, res) => {
    const survey = await Survey.findById({ _id: req.params.id }).select({
      recipients: false,
    });
    res.send(survey);
  })

  //save a draft of a survey
  app.post("/api/surveys/save", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), //return email as object
      _user: req.user.id,
    });
    try {
      await survey.save();
      const user = await req.user.save();
      //update header
      res.send(user); 
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //delete a survey
  app.post("/api/surveys/delete/:id", requireLogin, async (req, res)=> {
    const surveyId = req.params.id    
    const deleted = await Survey.findByIdAndDelete(surveyId, data => data)
    res.send({})
  })
};
