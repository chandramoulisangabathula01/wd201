const express = require("express");
const app = express();
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const ConnectEnsureLogin = require("connect-ensure-login");
const { Todo } = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("ssh! some secret string"));
app.use(csrf({ cookie: true }));
app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  const allTodos = await Todo.allTodos();
  if (request.accepts("html")) {
    response.render("index", {
      allTodos,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json(allTodos);
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todo = await Todo.findAll();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const status = todo.completed;
    // Toggle the completion status
    const updatedTodo = await todo.update({ completed: !status });
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    // Validation: Should not create a todo item with an empty title or dueDate
    if (!request.body.title || !request.body.dueDate) {
      return response.status(422).json({ error: "Title and dueDate are required" });
    }

    const todo = await Todo.addTodo(request.body);
    if (request.accepts("html")) {
      return response.redirect("/");
    } else {
      return response.json(todo);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/sample-due-today", async function (_request, response) {
  try {
    const todo = await Todo.addTodo({
      title: "Sample Due Today Item",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/sample-due-later", async function (_request, response) {
  try {
    const todo = await Todo.addTodo({
      title: "Sample Due Later Item",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/sample-overdue", async function (_request, response) {
  try {
    const todo = await Todo.addTodo({
      title: "Sample Overdue Item",
      dueDate: new Date("2022-01-01").toISOString(),
      completed: false,
    });

    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("Deleting a Todo with ID: ", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    
    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    await todo.destroy();
    
    return response.json({ success: true });
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;
