describe("The privacy policy page", () => {
  const SELECTORS = {
    PRIVACY_POLICY_PAGE: '[data-cy="privacy-policy-page"]',
  };

  it("renders", () => {
    cy.visit("http://localhost:3000/public/privacy-policy");

    cy.get(SELECTORS.PRIVACY_POLICY_PAGE).should("exist");
  });
});
