//npx cypress open to start

describe("The Home Page", () => {
    it("successfully loads", () => {
      cy.visit("/");
    });
    it("shows login button", () => {
      cy.get(".primary").should("be.visible");
    });
  
  })