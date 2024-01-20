// const { request, response } = require('express')
// const express = require('express')
// const app = express()
// const { Todo } = require("./models")
// const bodyParser = require('body-parser')

// app.use(bodyParser.json());


// app.get("/todos", (request, response) => {
//     console.log("Todo list")
// })

// app.post("/todos", async (request, response) => {
//     console.log("Creating a todo", request.body)
//     //todo

//     try {
//         const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
//         return response.json(todo)
//     } catch (error) {
//         console.log(error)
//         return response.status(422).json(error)

//     }
// })

// app.put("/todos/:id/markAsCompleted", async (request, response) => {
//     console.log("We have to update a todo with ID:", request.params.id)
//     const todo = await Todo.findByPk(request.params.id)
//     try {
//         const updatedTodo = await todo.markAsCompleted()
//         return response.json(updatedTodo)
//     } catch (error) {
//         console.log(error)
//         return response.status(422).json(error)
//     }

// })

// app.delete("/todos/:id", (request, response) => {
//     console.log("Delete a todo by ID: ", request.params.id)
// })

// module.exports = app;



// const express = require("express");
// const app = express();
// const { Todo } = require("./models");
// const bodyParser = require("body-parser");
// const path = require("path")
// app.use(bodyParser.json());

// app.set("view engine", "ejs");

// app.get("/", async (request, response) => {
//   const allTodos = await Todo.getTodos();
//   if (request.accepts("html")) {
//     response.render("index", {
//       allTodos
//     });
//   } else {
//     response.json({
//       allTodos
//     })
//   }
  
// })

// app.use(express.static(path.join(__dirname, 'public')));

// app.get("/todos", (request, response) => {
//   console.log("Todo list", request.body);
// })

// // app.get("/", function (request, response) {
// //   response.send("Hello World");
// // });

// app.get("/todos", async function (_request, response) {
//   try {
//     const todos = await Todo.findAll();
//     return response.json(todos);
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({ error: "Internal Server Error" });
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
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.put("/todos/:id/setCompletionStatus", async (request, response) => {
//   const todoId = request.params.id;

//   try {
//     const todo = await Todo.findByPk(todoId);

//     if (!todo) {
//       return response.status(404).json({ error: "Todo not found" });
//     }

//     todo.completed = request.body.completed;
//     await todo.save();

//     return response.json({ todo, message: "Todo updated successfully" });


//   } catch (error) {
//     console.error(error);
//     return response.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.put("/todos/:id/markAsCompleted", async function (request, response) {
//   const todo = await Todo.findByPk(request.params.id);
//   try {
//     const updatedTodo = await todo.markAsCompleted();
//     return response.json(updatedTodo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// // app.delete("/todos/:id", async function (request, response) {
// //     try {
// //       const todoId = request.params.id;
// //       const deletedTodoCount = await Todo.destroy({
// //         where: { id: todoId },
// //       });

// //       if (deletedTodoCount > 0) {
// //         return response.json({ success: true });
// //       } else {
// //         return response.status(404).json({ error: "Todo not found" });
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       return response.status(500).json({ error: "Internal Server Error" });
// //     }
// //   });

// // app.delete("/todos/:id", async function (request, response) {
// //     try {
// //       const todoId = request.params.id;

// //       // Using `destroy` method to delete the todo by ID
// //       const deletedTodoCount = await Todo.destroy({
// //         where: { id: todoId },
// //       });

// //       // Check if a todo was deleted and send a boolean response
// //       if (deletedTodoCount > 0) {
// //         return response.json({ success: true });
// //       } else {
// //         // If no todo was found with the given ID, respond accordingly
// //         return response.json({ success: false });
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       return response.status(500).json({ error: "Internal Server Error" });
// //     }
// //   });

// app.delete("/todos/:id", async (request, response) => {
//   console.log("Delete a todo by ID:", request.params.id)
//   const todoId = request.params.id;
//   const todo = await Todo.findByPk(todoId);
//   try {
//     if (!todo) {
//       return response.status(404).send(false);
//     }
//     else {
//       return response.send(await todo.destroy() ? true : false);
//     }
//     await Todo.remove(request.params.id);
//     return response.json({ success: true });
//   } catch (error) {
//     console.error("Error deleting todo:", error);
//     return response.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// })


// module.exports = app;






// new




// const express = require("express");
// // const { sequelize, testConnection } = require('./db');
// const app = express();
// const { Todo } = require("./models");
// // const port = process.env.PORT || 3000;
// const path = require("path");
// const bodyParser = require("body-parser");

// // testConnection();

// app.use(bodyParser.json());


// app.set("view engine", "ejs");

// app.get("/", async (request,response) =>{
//   const allTodos = await Todo.getTodos();
//   if(request.accepts("html")){
//     response.render('index',{allTodos});
//     return;
//   }else{
//     response.json({
//       allTodos
//     })
//   }
  
// })

// app.use(express.static(path.join(__dirname,'public')));

// app.get("/todos", async function (_request, response) {
//   console.log("Processing list of all Todos ...");
//   try{
//     const todo = await Todo.findAll();
//     return response.json(todo);

//   } catch(error){
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
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.put("/todos/:id/markAsCompleted", async function (request, response) {
//   const todo = await Todo.findByPk(request.params.id);
//   try {
//     const updatedTodo = await todo.markAsCompleted();
//     return response.json(updatedTodo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// app.delete("/todos/:id", async function (request, response) {
//   console.log("We have to delete a Todo with ID: ", request.params.id);
//   const deleteFlag = await Todo.destroy({ where: { id: request.params.id}})
//    response.send(deleteFlag?true:false)
// });


// module.exports = app;




// old

const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path")
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  const allTodos = await Todo.getTodos();
  if (request.accepts("html")) {
    response.render("index", {
      allTodos
    });
  } else {
    response.json({
      allTodos
    })
  }
  
})

app.use(express.static(path.join(__dirname, 'public')));

app.get("/todos", (request, response) => {
  console.log("Todo list", request.body);
})



app.get("/todos", async function (_request, response) {
  try {
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
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
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/setCompletionStatus", async (request, response) => {
  const todoId = request.params.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }

    todo.completed = request.body.completed;
    await todo.save();

    return response.json({ todo, message: "Todo updated successfully" });


  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});


app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by ID:", request.params.id)
  const todoId = request.params.id;
  const todo = await Todo.findByPk(todoId);
  try {
    if (!todo) {
      return response.status(404).send(false);
    }
    else {
      return response.send(await todo.destroy() ? true : false);
    }
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return response.status(500).json({ success: false, error: "Internal Server Error" });
  }
})


module.exports = app;
