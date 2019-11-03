const express = require('express');

const router = express.Router();

const Todo = require('../models/Todo');

//get all todo tasks (PASSED)
router.get('/', async (req, res) => {
  console.info('GET ALL TOTO');
  try {
    const todos = await Todo.find({});
    let newTodos = [];
    for (let item of todos) {
      console.info(item);
      let temp = {};

      temp.id = item._id;
      temp.text = item.text;
      temp.completed = item.completed;
      newTodos.push(temp);
    }
    res.json(newTodos);
    // console.log(newTodos);
  } catch (error) {
    res.json({ message: error });
  }
});

//add a todo task (PASSED)
router.post('/create', async (req, res) => {
  console.log('this is add request', req.body);
  const newTodo = new Todo({
    text: req.body.text
  });
  try {
    await newTodo.save();
    console.info('----', newTodo);
    res.json(newTodo);
  } catch (error) {
    res.json({ message: error });
  }
});

// get specific todo task (PASSED)
router.get('/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.json(todo);
  } catch (error) {
    res.json({ message: error });
  }
});

// update a todo text (PASSED)
router.patch('/:todoId', async (req, res) => {
  try {
    console.info('ID: ', req.params.todoId);
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: { text: req.body.text } }
    );
    console.log(updatedTodo);

    res.json(updatedTodo);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE A SPECIFIC TASKS (PASSED)
router.delete('/:todoId', async (req, res) => {
  try {
    const deleteOne = await Todo.deleteOne({
      _id: req.params.todoId
    });
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// CLEAR ALL COMPLETED TASKS (PASSED)
router.delete('/', async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteMany({ isCompleted: false });
    res.json(deletedTodo);
  } catch (error) {
    res.json({ message: error });
  }
});

// TOGGLE A TODO (PASSED)
router.patch('/toggle/:id', async (req, res) => {
  try {
    const todo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { completed: req.body.completed } }
    );
    res.json(todo);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

// TOGGLE ALL
router.patch('/', async (req, res) => {
  try {
    const todo = await Todo.updateMany({
      $set: {
        completed: req.body.completed
      }
    });
    res.json({ message: 'ok' });
  } catch (error) {
    res.json({
      message: error
    });
  }
});

module.exports = router;
