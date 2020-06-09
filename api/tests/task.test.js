const axios = require("axios");

// TODO make test cases more specific

describe("task resolvers", () => {
  test("getTasks query", async () => {
    const response = await axios.post("http://localhost:4000", {
      query: `
      query {
        getTasks {
            id
            username
            body
            completed
            createdAt
          }
        }
      `,
    });

    expect(response);
  });
});
