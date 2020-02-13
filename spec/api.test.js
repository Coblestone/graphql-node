import app from "../src/app";
import request from "supertest";

describe("GET /", () => {
  let response;
  test("Verify send many posts has authors", async () => {
    const query_string = `{
      posts{
        title
      }
    }`;
    response = await request(app)
      .post("/graphql")
      .send({ query: query_string });
    console.log(response.body.data);
    expect(response.body.data.posts[0].title).toBe("My first blog post");
    console.log(response.body);
  });

  test("Verify that an author is related to a post", async () => {
    const query_string = `{
      posts{
        title,
        author,
        related {
          name,
          email
        }
      }
    }`;

    response = await request(app)
      .post("/graphql")
      .send({ query: query_string });
    console.log(response.body.data);
    expect(response.body.data.posts[0].author[0]).toBe("Xavier Decuyper");
    console.log(response.body);
  })

  test("Verify there is many authors", async () => {
    const query_string = `{
      authors {
        name,
        email
      }
    }`;
    response = await request(app)
      .post("/graphql")
      .send({ query: query_string });
    console.log(response.body.data);
    expect(response.body.data.authors[0].name).toBe("Xavier Decuyper");
    console.log(response.body);
  });

  test("Verify we can get just one author", async () => {
    const query_string = `{
      authors {
        name,
        email
      }
    }`;

    response = await request(app)
      .post("/graphql")
      .send({ query: query_string});
    // console.log()
    expect(response.body.data.author.name)

  })
});

