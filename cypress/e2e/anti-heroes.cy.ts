describe("Anti Heroes Page", () => {
  //Basic Test
  it("should display login page", () => {
    cy.visit("/");
    cy.url().should("include","/login");
    cy.get("[data-cy=auth-title]").should("contain", "Login");
  })
})
