describe("Validation form", () => {
  it("Error is displayed when Old password field is left empty and submit button is clicked", () => {
    cy.visit("http://localhost:5173/");
    // check that error does not exist before clicking change password button
    cy.get("#old-password-error").should("have.text", "");
    cy.get("#submit-password").click();
    // check that error exists after clicking change password button
    cy.get("#old-password-error").contains("Please Enter your old password");
  });

  it("Error is not displayed when Old password field is entered and submit button is clicked", () => {
    cy.visit("http://localhost:5173/");
    // check that error does not exist before clicking change password button
    cy.get("#old-password-error").should("have.text", "");
    cy.get("#old-password-input").type("oldpassword123@345#");
    cy.get("#submit-password").click();
    // check that error does not exists after clicking change password button
    cy.get("#old-password-error").should("have.text", "");
  });

  it("Error is displayed when New password does not match with confirmed password and submit button is clicked", () => {
    cy.visit("http://localhost:5173/");
    // check that error does not exist before clicking change password button
    cy.get("#confirm-password-error").should("have.text", "");
    cy.get("#new-password-input").type("newPassWord1@@@");
    cy.get("#confirm-password-input").type("newPassWord1@@");
    cy.get("#submit-password").click();
    // check that error does not exists after clicking change password button
    cy.get("#confirm-password-input").should("have.text", "");
  });
});
