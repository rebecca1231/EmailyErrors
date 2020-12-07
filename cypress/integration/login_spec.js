const keys = require("../../config/keys");

describe("can log in", () => {
  it("can log in", () => {
    cy.setCookie("express:sess.sig", keys.sessionSig);
    cy.setCookie("express:sess", keys.session);
    cy.visit('/surveys')
  });
});


