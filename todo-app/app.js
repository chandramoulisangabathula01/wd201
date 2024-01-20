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
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Set view engine and static file directory
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Route to handle root URL
app.get("/", async (request, response) => {
  try {
    // Retrieve overdue, due today, and due later todos
    const overdue = await Todo.getOverdueTodos();
    const duetoday = await Todo.getDueTodayTodos();
    const duelater = await Todo.getDueLaterTodos();

    // Check if the client accepts HTML, render the HTML view; otherwise, send JSON
    if (request.accepts("html")) {
      response.render("index.ejs", {
        overdue,
        duetoday,
        duelater,
      });
    } else {
      response.json({
        overdue,
        duetoday,
        duelater,
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// Default route for root URL, responds with "Hello World"
app.get("/", function (request, response) {
  response.send("Hello World");
});

// Route to get all todos
app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll();
    response.send(todos);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a specific todo by ID
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// Route to add a new todo
app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// Route to mark a todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// Route to delete a todo by ID
app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    if (await Todo.findByPk(request.params.id)) {
      await Todo.destroy({
        where: {
          id: request.params.id,
        },
      });
      if (await Todo.findByPk(request.params.id)) {
        response.send(false);
      } else {
        response.send(true);
      }
    } else {
      response.send(false);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the Express app
module.exports = app;
