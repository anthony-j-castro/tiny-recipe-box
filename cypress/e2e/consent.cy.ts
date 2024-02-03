describe("The consent modal", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="consents"]').should("exist");
  });
});
