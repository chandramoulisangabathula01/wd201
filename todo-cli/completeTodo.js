
const argv = require('minimist')(process.argv.slice(2));
const db = require('./models/index');

const markAsComplete = async (id) => {
  try {
    await db.Todo.markAsComplete(id);
    console.log(`Todo with ID ${id} marked as complete.`);
  } catch (error) {
    console.error(error.message);
  }
};

(async () => {
  const { id } = argv;
  if (!id) {
    throw new Error('Need to pass an id');
  }

  const parsedId = parseInt(id,10);
  
  if (isNaN(id) || !Number.isInteger(Number(id))) {
    throw new Error('The id needs to be an integer');
  }
  

  await markAsComplete(parsedId);
  await db.Todo.showList();
})();
