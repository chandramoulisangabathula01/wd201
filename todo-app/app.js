// const express = require("express");
// const app = express();
// var csrf = require("csurf");
// var cookieParser = require("cookie-parser");
// const { Todo } = require("./models");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// const path = require("path");
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("ssh! some secret string"));
// app.use(csrf({ cookie: true }));
// app.set("view engine", "ejs");
// // app.set("views", path.join(__dirname, "views"));
// // app.use(express.static(path.join(__dirname, "public")));
// app.get("/", async (request, response) => {
//   const allTodos = await Todo.allTodos();
//   if (request.accepts("html")) {
//     response.render("index", {
//       allTodos,
//       csrfToken: request.csrfToken(),
//     });
//   } else {
//     response.json(allTodos);
//   }
// });

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/todos", async function (_request, response) {
//   console.log("Processing list of all Todos ...");
//   try {
//     const todo = await Todo.findAll();
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.get("/todos/:id", async function (request, response) {
//   try {
//     const todo = await Todo.findByPk(request.params.id);
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.post("/todos", async function (request, response) {
//   try {
//     const todo = await Todo.addTodo(request.body);
//     if (request.accepts("html")) {
//       return response.redirect("/");
//     } else {
//       return response.json(todo);
//     }
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.put("/todos/:id", async function (request, response) {
//   try {
//     const todo = await Todo.findByPk(request.params.id);

//     // Toggle the completion status
//     todo.completed = !todo.completed;

//     // Save the changes to the database
//     await todo.save();

//     console.log(`Todo item ${todo.id} completion status toggled to ${todo.completed ? 'completed' : 'incomplete'}`);

//     return response.json(todo);
//   } catch (error) {
//     console.error(error);
//     return response.status(422).json(error);
//   }
// });


// app.delete("/todos/:id", async function (request, response) {
//   console.log("Deleting a Todo with ID: ", request.params.id);
//   try {
//     await Todo.remove(request.params.id);
//     return response.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// module.exports = app;



const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(cookieParser("it's a secret"));
app.use(csurf({ cookie: true }));

app.get("/", async function (req, res) {
  const allTodos = await Todo.getTodos();
  if (req.accepts("html")) {
    const todaysDate = new Date().toISOString().split("T")[0];
    res.render("index", {
      overdue: allTodos.filter(
        (todo) => todo.dueDate < todaysDate && !todo.completed
      ),
      dueToday: allTodos.filter(
        (todo) => todo.dueDate === todaysDate && !todo.completed
      ),
      dueLater: allTodos.filter(
        (todo) => todo.dueDate > todaysDate && !todo.completed
      ),
      completedItems: allTodos.filter((todo) => todo.completed),
      csrfToken: req.csrfToken(),
    });
  } else {
    res.json(allTodos);
  }
});

app.get("/todos", async function (req, res) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

app.get("/todos/:id", async function (req, res) {
  try {
    const todo = await Todo.findByPk(req.params.id);
    return res.json();
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.post("/todos", async (req, res) => {
  console.log("Creating a todo", req.body);
  try {
    const todo = await Todo.addTodo({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: false,
    });
    if (req.accepts("html")) res.redirect("/");
    else res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
});

app.put("/todos/:id", async (req, res) => {
  console.log("Update todo of id:", req.params.id);
  const todo = await Todo.findByPk(req.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(req.body.completed);
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(422).json(err);
  }
});

app.delete("/todos/:id", async function (req, res) {
  console.log("We have to delete a Todo with ID: ", req.params.id);
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.send(true);
  } catch (err) {
    console.log(err);
    res.status(422).send(false);
  }
});

module.exports = app;