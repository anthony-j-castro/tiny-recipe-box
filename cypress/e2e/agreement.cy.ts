describe("The agreement modal", () => {
  const SELECTORS = {
    CHECKBOX: '[data-cy="agreement-checkbox"]',
    HOME_PAGE: '[data-cy="home-page"]',
    SUBMIT: '[data-cy="agreement-submit"]',
  };

  it("appears then directs to the home page", () => {
    cy.visit("http://localhost:3000");

    cy.get(SELECTORS.CHECKBOX).should("not.be.checked");
    cy.get(SELECTORS.SUBMIT).should("be.disabled");

    cy.get(SELECTORS.CHECKBOX).click();
    cy.get(SELECTORS.SUBMIT).click();

    // Timeout is set to 10s to give the initialization modal
    // time to render and disappear.
    cy.get(SELECTORS.HOME_PAGE, { timeout: 10_000 }).should("exist");
  });
});
