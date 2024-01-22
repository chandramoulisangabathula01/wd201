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

  test("Should mark sample overdue item as completed", async () => {
    // Create a sample overdue item in the database
    const overdueItem = await Todo.create({
      title: "Sample Overdue Item",
      dueDate: new Date("2022-01-01"), // Set a past due date for the item
      completed: false,
    });
  
    const res = await agent.get("/");
    const csrfToken = extractToken(res);
  
    const response = await agent
      .put(`/todos/${overdueItem.id}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken });
  
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).completed).toBe(true);
  });


  test("Should toggle a completed item to incomplete when clicked on it", async () => {
    const res = await agent.get("/");
    const csrfToken = extractToken(res);

    // Assuming there is a completed item in the database with ID 1
    const todoID = 1;

    // Toggle the completed item to incomplete
    const response = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).completed).toBe(false);
  });
});
