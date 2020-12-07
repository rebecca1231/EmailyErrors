const keys = require("../../config/keys");

describe("dashboard", () => {
  it("dashboard loads when authorized", () => {
    cy.setCookie("express:sess.sig", keys.sessionSig);
    cy.setCookie("express:sess", keys.session);
    cy.visit('/surveys')
  });
});


