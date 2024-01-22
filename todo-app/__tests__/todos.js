const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const cheerio = require("cheerio");
const { Todo } = require("../models");


let server, agent;

function extractToken(res) {
  let $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a Todo and responds with json at /todos POST endpoint", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const response = await agent
      .post("/todos")
      .send({
        title: "Buy milk",
        dueDate: new Date().toISOString(),
        completed: false,
        _csrf: csrfToken,
      })
      .expect(302)
      .expect("location", "/");

    // Follow the redirect and add more checks if needed
    const redirectedRes = await agent.get(response.header["location"]);
    expect(redirectedRes.statusCode).toBe(200);
    // Add more checks if needed
  });

  test("Marks a todo with the given ID as complete", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const todoID = 1;
    const response = await agent
      .put(`/todos/${overdueItem.id}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken })
      .expect(200);

    const completedValue = response.body.completed;
    expect(completedValue).toBe(true);
  });

  test("Marks a todo with the given ID as incomplete", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const todoID = 1;

    // Toggle the completed item to incomplete
    const response = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken })
      .expect(200);

    const completedValue = response.body.completed;
    expect(completedValue).toBe(false);
  });

  test("Delete a Todo item", async () => {
    const res3 = await agent.get("/");
    const csrfToken = extractCsrfToken(res3);
    const todoID = 1;
    await agent
      .delete(`/todos/${todoID}`)
      .send({ _csrf: csrfToken })
      .expect(200, { success: true });
  });
});
