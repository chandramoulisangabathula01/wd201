const request = require("supertest");
const app = require("../app");
const db = require("../models/index");
const cheerio = require("cheerio");

let server, agent;

function extractCsrfToken(res) {
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
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    
    // Check if the response indicates a successful redirect
    expect(response.statusCode).toBe(302);
    expect(response.header["location"]).toBe("/");  // Adjust this based on your actual redirect path
  
    // You might want to follow the redirect to check the resulting page
    const redirectedRes = await agent.get(response.header["location"]);
    expect(redirectedRes.statusCode).toBe(200);
    // Add more checks if needed
  
    // If you still want to check the JSON response, you can do so after following the redirect
    // const parsedResponse = JSON.parse(redirectedRes.text);
    // expect(parsedResponse.id).toBeDefined();
  });
  

  test("Marks a todo with the given ID as complete", async () => {
    const res = await agent.get("/");
    const csrfToken = extractToken(res);
    const todoID = 1;
    const response = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken });
    
    // Parse the response and extract the completed value
    const parsedResponse = JSON.parse(response.text);
    const completedValue = parsedResponse && parsedResponse.completed;
  
    expect(completedValue).toBe(true);
  });
  
  test("Marks a todo with the given ID as incomplete", async () => {
    const res = await agent.get("/");
    const csrfToken = extractToken(res);
    const todoID = 1;
    const response = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken });
    
    // Parse the response and extract the completed value
    const parsedResponse = JSON.parse(response.text);
    const completedValue = parsedResponse && parsedResponse.completed;
  
    expect(completedValue).toBe(false);
  });
  

  test("Delete a Todo item", async () => {
    const res3 = await agent.get("/");
    const csrfToken = extractCsrfToken(res3);
    const todoID = 1;
    const response = await agent
      .delete(`/todos/${todoID}`)
      .send({ _csrf: csrfToken });
    expect(JSON.parse(response.text).success).toBe(true);
  });

  // ... Rest of the tests
});
