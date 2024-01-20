// const express = require("express");
// const app = express();
// const { Todo } = require("./models");
// const bodyParser = require("body-parser");
// const path = require("path");

// app.use(bodyParser.json());

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", async (request, response) => {
//   try {
//     const overdue = await Todo.getOverdueTodos();
//     const duetoday = await Todo.getDueTodayTodos();
//     const duelater = await Todo.getDueLaterTodos();

//     if (request.accepts("html")) {
//       response.render("index.ejs", {
//         overdue,
//         duetoday,
//         duelater,
//       });
//     } else {
//       response.json({
//         overdue,
//         duetoday,
//         duelater,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/", function (request, response) {
//   response.send("Hello World");
// });

// app.get("/todos", async function (_request, response) {
//   console.log("Processing list of all Todos ...");
//   try {
//     const todos = await Todo.findAll();
//     response.send(todos);
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/todos/:id", async function (request, response) {
//   try {
//     const todo = await Todo.findByPk(request.params.id);
//     return response.json(todo);
//   } catch (error) {
//     console.error(error);
//     return response.status(422).json(error);
//   }
// });

// app.post("/todos", async function (request, response) {
//   try {
//     const todo = await Todo.addTodo(request.body);
//     return response.json(todo);
//   } catch (error) {
//     console.error(error);
//     return response.status(422).json(error);
//   }
// });

// app.put("/todos/:id/markAsCompleted", async function (request, response) {
//   const todo = await Todo.findByPk(request.params.id);
//   try {
//     const updatedTodo = await todo.markAsCompleted();
//     return response.json(updatedTodo);
//   } catch (error) {
//     console.error(error);
//     return response.status(422).json(error);
//   }
// });

// app.delete("/todos/:id", async function (request, response) {
//   console.log("We have to delete a Todo with ID: ", request.params.id);
//   try {
//     if (await Todo.findByPk(request.params.id)) {
//       await Todo.destroy({
//         where: {
//           id: request.params.id,
//         },
//       });
//       if (await Todo.findByPk(request.params.id)) {
//         response.send(false);
//       } else {
//         response.send(true);
//       }
//     } else {
//       response.send(false);
//     }
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = app;





const express = require("express");
const app = express();
var csrf = require("csurf");
var cookieParser = require("cookie-parser");
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("ssh! some secret string"));
app.use(csrf({ cookie: true }));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
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

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
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

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    await todo.setCompletionStatus(todo.completed);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("Deleting a Todo with ID: ", request.params.id);
  try {
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;