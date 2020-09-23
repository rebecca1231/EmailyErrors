const keys = require("../../config/keys");

module.exports = (survey, email) => {
  return `
  <html>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@500&display=swap" rel="stylesheet">      
  <link href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap" rel="stylesheet">

  <div style="background-color: #eeeeee; padding: 1rem; text-align: center; font-family: 'Lobster Two', Arial, sans-serif; color:#24a19c" >

    <h2>Opine</h2>

  <body style=>
  <div style="border-radius: 25px; text-align:center; line-height:1.5; background-color:white; font-family:‘Roboto’, Arial, sans-serif; color:black; padding:0.5rem">
  <h3> A Question From: ${survey.sender}</h3>
  <h3>${survey.body} </h3>
<div  style="padding:1%; line-height:1.5">
    <div>
      <a style="text-decoration: none; color:#24a19c; font-size: 1.5em" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
    </div>
    <div>
    <a style="text-decoration: none; color:#24a19c; font-size: 1.4em" href="${keys.redirectDomain}/api/surveys/${survey.id}/maybe">Maybe</a>
  </div>
    <div>
      <a style="text-decoration: none; color:#24a19c; font-size: 1.4em" href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
    </div>
  </div>
  </div>

</body>
<p>Thank you for taking the time answer this question!</p>
<p style="color:#3b6978; font-family:‘Roboto’, Arial, sans-serif; font-size: 0.75em">&#169;2020 
  <a style="text-decoration: none; color:#24a19c;font-size: 1.2em" href="https://sleepy-ridge-95118.herokuapp.com/">Opine</a></p>
</html>
`;
};
