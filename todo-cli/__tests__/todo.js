// /* eslint-disable no-undef */
// // const { default: test, before } = require('node:test');
// const todoList = require("../todo");

// const { all, markAsComplete, add } = todoList();

// describe("Todolist Test Suite", () => {
//   beforeAll(() => {
//     add({
//       title: "new todo",
//       completed: false,
//       dueDate: new Date().toISOString("en-CA"),
//     });
//   });

//   test("Should add new todo", () => {
//     const todoItemsCount = all.length;
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: new Date().toISOString("en-CA"),
//     });
//     expect(all.length).toBe(todoItemsCount + 1);
//   });

//   test("Should mark a todo as complete", () => {
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true);
//     // Uncomment the line below if you have a function to mark as complete for index 1
//     // markAsComplete(1);
//   });
// });

// i think this is a trial version of take it lite

/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    add({
      title: "new todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
  });

  test("A test that checks creating a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("A test that checks marking a todo as completed", () => {
    expect(all[0].completed).toBe(false);

    markAsComplete(0);

    expect(all[0].completed).toBe(true);
  });

  test("A test that checks retrieval of overdue items", () => {
    const overdueItems = overdue();

    expect(overdueItems.length).toBe(0);

    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: "2022-01-01",
    });

    const updatedOverdueItems = overdue();

    expect(updatedOverdueItems.length).toBe(1);
  });

  test("A test that checks retrieval of due today items", () => {
    const dueTodayItems = dueToday();

    expect(dueTodayItems.length).toBe(0);

    add({
      title: "Due Today Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });

    const updatedDueTodayItems = dueToday();

    expect(updatedDueTodayItems.length).toBe(1);
  });

  test("A test that checks retrieval of due later items", () => {
    const dueLaterItems = dueLater();

    console.log("Initial due later items:", dueLaterItems);

    expect(dueLaterItems.length).toBe(1);
    add({
      title: "Due Later Todo",
      completed: false,
      dueDate: "2023-01-01",
    });

    const updatedDueLaterItems = dueLater();

    console.log("Updated due later items:", updatedDueLaterItems);

    expect(updatedDueLaterItems.length).toBe(1);
  });
});
