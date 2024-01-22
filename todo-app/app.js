const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const { Todo } = require("./models");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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


app.post("/todos", async (request, response) => {
  try {
    // Validate input
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

app.put("/todos/:id", async (request, response) => {
  try {
    const todo = await Todo.findByPk(request.params.id);

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    const newCompletionStatus = !todo.completed;
    await todo.update({ completed: newCompletionStatus });

    return response.json(todo);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (request, response) => {
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