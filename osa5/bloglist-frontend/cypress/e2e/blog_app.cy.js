describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "John Doe",
      username: "johndoe",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("johndoe");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("John Doe logged in");
      // cy.contains("log out").click()
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("johndoe");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();
      cy.get("#error")
        .should("contain", "wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "John Doe logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "johndoe",
        password: "salainen",
      };

      cy.login(user);
    });

    it("A blog can be created and viewed", function () {
      cy.get("#create-button").click();
      cy.get("#title").type("Blog Title");
      cy.get("#author").type("Blog Author");
      cy.get("#url").type("Blog Url");
      cy.get("#blog-submit-button").click();

      cy.get("#notification")
        .should("contain", "Blog Title by Blog Author added")
        .and("have.css", "color", "rgb(0, 128, 0)");

      cy.get("#view-button").click();
      cy.get("#blog-info")
        .should("have.css", "display", "block")
        .and("contain", "johndoe")
        .and("contain", "Blog Url")
        .and("contain", "0 likes");
    });

    it("blog can be liked", function () {
      cy.createBlog({
        title: "test-blog",
        author: "test-author",
        url: "test-url",
      });
      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.get("#notification")
        .should("contain", "Liked")
        .and("have.css", "color", "rgb(0, 128, 0)");
      cy.get("#blog-info").should("contain", "1 likes");
    });

    it("blog can be deleted", function () {
      cy.createBlog({
        title: "test-blog",
        author: "test-author",
        url: "test-url",
      });
      cy.get("#view-button").click();
      cy.get("#delete-button").click();
      cy.contains("test-blog").should("not.exist");
    });
  });

  describe("When there are multiple users", function () {
    beforeEach(function () {
      const user = {
        username: "johndoe",
        password: "salainen",
      };
      const user2 = {
        username: "janedoe",
        password: "salainen",
        name: "Jane Doe",
      };

      cy.request("POST", "http://localhost:3003/api/users/", user2);
      cy.login(user2);
      cy.get("html").should("contain", "Jane Doe logged in");

      cy.createBlog({
        title: "test-blog",
        author: "test-author",
        url: "test-url",
      });
      cy.contains("log out").click();
      cy.login(user);
    });

    it("blog cant be deleted if user doesnt own it", function () {
      cy.get("#view-button").click();
      cy.get("#delete-button").should("not.exist");
    });

    it("blogs are sorted by likes", function () {
      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.wait(1000);
      cy.get("#like-button").click();
      cy.wait(1000);

      cy.createBlog({
        title: "least-likes",
        author: "test-author2",
        url: "test-url2",
        likes: 1,
      });

      cy.createBlog({
        title: "most-likes",
        author: "test-author3",
        url: "test-url3",
        likes: 20,
      });

      cy.get("#blog-list").eq(0).should("contain", "most-likes");
      cy.get("#blog-list").last().should("contain", "least-likes");
    });
  });
});
