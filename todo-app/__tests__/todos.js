// const request = require("supertest");
// const app = require("../app");
// const db = require("../models/index");
// const cheerio = require("cheerio");

// let server, agent;

// function extractCsrfToken(res) {
//   let $ = cheerio.load(res.text);
//   return $("[name=_csrf]").val();
// }

// describe("Todo Application", function () {
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//     server = app.listen(3000, () => {});
//     agent = request.agent(server);
//   });

//   afterAll(async () => {
//     try {
//       await db.sequelize.close();
//       await server.close();
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   test("Creates a Todo and responds with json at /todos POST endpoint", async () => {
//     const res = await agent.get("/");
//     const csrfToken = extractCsrfToken(res);
//     const response = await agent.post("/todos").send({
//       title: "Buy milk",
//       dueDate: new Date().toISOString(),
//       completed: false,
//       _csrf: csrfToken,
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.header["content-type"]).toBe(
//       "application/json; charset=utf-8"
//     );
//     const parsedResponse = JSON.parse(response.text);
//     expect(parsedResponse.id).toBeDefined();
//   });

//   test("Marks a todo with the given ID as complete", async () => {
//     const res1 = await agent.get("/");
//     const csrfToken = extractCsrfToken(res1);
//     const todoID = 1;
//     const response = await agent
//       .put(`/todos/${todoID}`)
//       .set("Accept", "application/json")
//       .send({ _csrf: csrfToken });

//     expect(JSON.parse(response.text).completed).toBe(true);
//   });

//   test("Marks a todo with the given ID as incomplete", async () => {
//     const res2 = await agent.get("/");
//     const csrfToken = extractCsrfToken(res2);
//     const todoID = 1;
//     const response = await agent
//       .put(`/todos/${todoID}`)
//       .set("Accept", "application/json")
//       .send({ _csrf: csrfToken });
//     expect(JSON.parse(response.text).completed).toBe(false);
//   });

//   test("Delete a Todo item", async () => {
//     const res3 = await agent.get("/");
//     const csrfToken = extractCsrfToken(res3);
//     const todoID = 1;
//     const response = await agent
//       .delete(`/todos/${todoID}`)
//       .send({ _csrf: csrfToken });
//     expect(JSON.parse(response.text).success).toBe(true);
//   });

//   // ... Rest of the tests
// });


// const db = require("../models/index");
// const request = require("supertest");
// const app = require("../app");


// describe("Todo Application Tests", () => {
//   // ... Other tests ...
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//     server = app.listen(3000, () => { });
//     agent = request.agent(server);
//   });

//   afterAll(async () => {
//     try {
//       await db.sequelize.close();
//       await server.close();
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   test("Should create sample due today item", async () => {
//     const response = await request(app)
//       .post("/todos")
//       .send({
//         title: "Sample Due Today",
//         dueDate: new Date().toISOString(),
//         completed: false,
//         _csrf: "your_csrf_token", // Replace with a valid CSRF token
//       });

//     expect(response.statusCode).toBe(302); // Assuming a successful redirect
//   });

//   test("Should create sample due later item", async () => {
//     const response = await request(app)
//       .post("/todos")
//       .send({
//         title: "Sample Due Later",
//         dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // Set due date for tomorrow
//         completed: false,
//         _csrf: "your_csrf_token", // Replace with a valid CSRF token
//       });

//     expect(response.statusCode).toBe(302); // Assuming a successful redirect
//   });

//   test("Should create sample overdue item", async () => {
//     const response = await request(app)
//       .post("/todos")
//       .send({
//         title: "Sample Overdue",
//         dueDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // Set due date for yesterday
//         completed: false,
//         _csrf: "your_csrf_token", // Replace with a valid CSRF token
//       });

//     expect(response.statusCode).toBe(302); // Assuming a successful redirect
//   });

//   test("Should not mark sample overdue item as completed", async () => {
//     // Assuming you have a todo item with the title "Sample Overdue" in your database
//     const todoId = 1; // Replace with the actual ID of the todo item

//     const response = await request(app)
//       .put(`/todos/${todoId}`)
//       .send({ _csrf: "your_csrf_token" }); // Replace with a valid CSRF token

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.text).completed).toBe(true);
//   });

//   test("Should toggle a completed item to incomplete when clicked on it", async () => {
//     // Assuming you have a completed todo item with the title "Sample Completed" in your database
//     const todoId = 2; // Replace with the actual ID of the completed todo item

//     const response = await request(app)
//       .put(`/todos/${todoId}`)
//       .send({ _csrf: "your_csrf_token" }); // Replace with a valid CSRF token

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.text).completed).toBe(false);
//   });

//   test("Should delete an item", async () => {
//     // Assuming you have a todo item with the title "Sample Delete" in your database
//     const todoId = 3; // Replace with the actual ID of the todo item

//     const response = await request(app)
//       .delete(`/todos/${todoId}`)
//       .send({ _csrf: "your_csrf_token" }); // Replace with a valid CSRF token

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.text).success).toBe(true);
//   });
  
//   test("Should not create a todo item with empty title", async () => {
//     const response = await request(app)
//       .post("/todos")
//       .send({
//         title: "", // Empty title
//         dueDate: new Date().toISOString(),
//         completed: false,
//         _csrf: "your_csrf_token", // Replace with a valid CSRF token
//       });
  
//     expect(response.statusCode).toBe(/* Expected status code for validation failure */);
//     // Add assertions for any other expected behavior
//   });
  

// });



const request = require("supertest");

const db = require("../models/index");
const app = require("../app");
var cheerio = require("cheerio");
let server, agent;

function extractToken(res) {
  let $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => { });
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
    expect(response.statusCode).toBe(302);
    // expect(response.header["content-type"]).toBe(
    //   "application/json; charset=utf-8"
    // );
    // const parsedResponse = JSON.parse(response.text);
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
    expect(JSON.parse(response.text).completed).toBe(true);
  });

  test("Marks a todo with the given ID as incomplete", async () => {
    const res = await agent.get("/");
    const csrfToken = extractToken(res);
    const todoID = 1;
    const response = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({ _csrf: csrfToken });
    expect(JSON.parse(response.text).completed).toBe(false);
  });

  test("Delete a Todo item", async () => {
    const res1 = await agent.get("/");
    const csrfToken = extractToken(res1);
    const todoID = 1;
    const res = await agent
      .delete(`/todos/${todoID}`)
      .send({ _csrf: csrfToken });
    expect(JSON.parse(res.text).success).toBe(true);
  });
});

test("Fetches all todos in the database using /todos endpoint", async () => {
  const res = await agent.get("/");
  const csrfToken = extractToken(res);
  await agent.post("/todos").send({
    title: "Buy xbox",
    dueDate: new Date().toISOString(),
    completed: false,
    _csrf: csrfToken,
  });
  await agent.post("/todos").send({
    title: "Buy ps3",
    dueDate: new Date().toISOString(),
    completed: false,
    _csrf: csrfToken,
  });
  const response = await agent.get("/todos");
  const parsedResponse = JSON.parse(response.text);

  expect(parsedResponse.length).toBe(3);
  expect(parsedResponse[2]["title"]).toBe("Buy ps3");
});