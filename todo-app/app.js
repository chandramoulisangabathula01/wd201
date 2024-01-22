const express = require("express");
const app = express();
<<<<<<< HEAD
const bodyParser = require("body-parser");
=======
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const ConnectEnsureLogin = require("connect-ensure-login");
const { Todo } = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
>>>>>>> 54ba54d507790d4cb61b23987d5795cd0003b23d
const path = require("path");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const { Todo } = require("./models");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
<<<<<<< HEAD
=======

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
>>>>>>> 54ba54d507790d4cb61b23987d5795cd0003b23d

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("your-secret-string"));  // Add cookie-parser middleware
app.use(express.static(path.join(__dirname, "public")));

// Update csrf middleware configuration
app.use(csrf({ cookie: true }));  // Set httpOnly to false for client-side access

// Routes
app.get("/", async (request, response) => {
  try {
    const allTodos = await Todo.allTodos();
    if (request.accepts("html")) {
      response.render("index", {
        allTodos,
        csrfToken: request.csrfToken(),
      });
    } else {
      response.json(allTodos);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

<<<<<<< HEAD

app.post("/todos", async (request, response) => {
  try {
    // Validate input
=======
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
>>>>>>> 54ba54d507790d4cb61b23987d5795cd0003b23d
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
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

<<<<<<< HEAD
app.put("/todos/:id", async (request, response) => {
  try {
    const todo = await Todo.findByPk(request.params.id);

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    const newCompletionStatus = !todo.completed;
    await todo.update({ completed: newCompletionStatus });
=======
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
>>>>>>> 54ba54d507790d4cb61b23987d5795cd0003b23d

    return response.json(todo);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

<<<<<<< HEAD
app.delete("/todos/:id", async (request, response) => {
=======
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
>>>>>>> 54ba54d507790d4cb61b23987d5795cd0003b23d
  try {
    const todo = await Todo.findByPk(request.params.id);

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    await todo.destroy();
    return response.json({ success: true });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
