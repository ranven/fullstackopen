describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "John Doe",
      username: "johndoe",
      password: "salainen",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function () {
    cy.contains("Blogs")
    cy.contains("login").click()
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("johndoe")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()
      cy.contains("John Doe logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("johndoe")
      cy.get("#password").type("secret")
      cy.get("#login-button").click()
      cy.contains("wrong credentials")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("johndoe")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()
    })

    it("A blog can be created", function () {
      // logged in user can create a blog
    })

    it("blog can be liked", function () {
      // can like when logged in
    })

    it("blog can be deleted", function () {
      // user who has created the blog can delete it
    })

    it("blog can be deleted", function () {
      // user who hasnt created the blog can't delete it
    })
    it("blogs are sorted by likes", function () {
      // ??? make the bloglist update when liked so the like sort works
    })
  })
})
