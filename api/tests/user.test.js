const axios = require("axios");

// TODO make test cases more specific

describe("user resolvers", () => {
  test("four required fields for register", async () => {
    const response = await axios.post("http://localhost:4000", {
      query: `
      mutation {
        register(registerInput: {
          username: "testing"
          password: "password"
          confirmPassword: "password"
          email: "test@gmail.com"
        }) {
          id
          username
          email
          createdAt
        }
      }
        `,
    });

    expect(response);
  });

  test("returns an auth token when login is successful", async () => {
    const response = await axios.post("http://localhost:4000", {
      query: `
            mutation {
                login(username: "simon", password: "") {
                    token
                }
            }
          `,
    });
    expect(response.data.token);
  });
});
