
const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

const getTasks = asyncHandler(async(req, res) => {
  console.log('ffffffff')
    //const tasks = await Task.find() 
    const tasks = await Task.find({user: req.user.id}) 
    console.log(tasks)
    res.status(200).json(tasks);
    //res.status(200).json({ message: 'Get All Tasks' });
   })
   

   const setTask = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter a task')
        //res.status(400).json({ message: 'Please enter a task' })
      }
    console.log(req.body);
    //res.status(200).json({ message: 'Create Task' });

    //const task = await Task.create({ text: req.body.text })
    const task = await Task.create({ text: req.body.text,user: req.user.id })
    res.status(200).json(task);
   })
   const updateTask = asyncHandler(async(req, res) => {
    //res.status(200).json({ message: `Task ${req.params.id}
    //updated.` });
    const task = await Task.findById(req.params.id)
 if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }
  const user = await User.findById(req.user.id)
 if(!user){
  res.status(401)
  throw new Error('No such user found')
}
 if (task.user.toString() !== user.id) {
  res.status(401)
  throw new Error('User is not authorized to update')
}
   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
   res.status(200).json(updatedTask)
   })
   const deleteTask = asyncHandler(async(req, res) => {
    //res.status(200).json({ message: `Task ${req.params.id}
    //deleted.` });
    const task = await Task.findById(req.params.id)
 if (!task) {
  res.status(400)
  throw new Error('Task not found')
}
const user = await User.findById(req.user.id)
 if(!user){
  res.status(401)
  throw new Error('No such user found')
}
 if (task.user.toString() !== user.id) {
  res.status(401)
  throw new Error('User is not authorized to update')
}
await Task.findByIdAndDelete(req.params.id)
res.status(200).json({ id: req.params.id })
  })
  
  module.exports = { getTasks ,setTask,updateTask,deleteTask}