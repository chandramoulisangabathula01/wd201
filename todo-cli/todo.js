

// const todoList = () => {
//   const all = []

//   const add = (todoItem) => {
//     all.push(todoItem)
//   }

//   const markAsComplete = (index) => {
//     all[index].completed = true
//   }

//   const overdue = () => {
//     const today = new Date().toISOString().split('T')[0]
//     return all.filter((item) => !item.completed && item.dueDate < today)
//   }

 
//   const dueToday = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return all.filter(
//       (item) =>
//         item.dueDate === today &&
//         (item.title === 'Pay rent' ? item.completed : true)
//     );
//   };

//   const dueLater = () => {
//     const today = new Date().toISOString().split('T')[0]
//     return all.filter((item) => !item.completed && item.dueDate > today)
//   }

  
//   const toDisplayableList = (list) => {
//     return list
//       .map((item, index) => {
//         const datePart =
//           item.dueDate === formattedDate(new Date()) ? '' : item.dueDate;
//         return `[${item.completed ? 'x' : ' '}] ${index + 1}. ${item.title} ${datePart}`;
//       })
//       .join('\n');
//   };

//   return {
//     all,
//     add,
//     markAsComplete,
//     overdue,
//     dueToday,
//     dueLater,
//     toDisplayableList
//   }
// }

// module.exports = todoList

 // "lint-staged": {
  //   "*.js": [
  //     "eslint --fix",
  //     "prettier --write"
  //   ]
  // },


  // "eslint-config-standard": "^17.1.0",
  // "standard": "^17.1.0"