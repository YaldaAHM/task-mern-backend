const express = require('express');
 const router = express.Router();
const {getTasks,setTask,updateTask,deleteTask}=require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')


router.get('/',protect, getTasks)
router.post('/',protect, setTask)
router.put('/:id', protect,updateTask)
router.delete('/:id', protect,deleteTask)

//  router.get('/', (req, res) => {
//   res.status(200).json({ message: 'Get All Tasks routes 1' });
// })

// router.post('/', (req, res) => {
//     res.status(200).json({ message: 'Create Task' });
//   })
//    router.put('/:id', (req, res) => {
//     res.status(200).json({ message: `Task ${req.params.id}
//     updated.` });
//   })
//    router.delete('/:id', (req, res) => {
//     res.status(200).json({ message: `Task ${req.params.id}
//     deleted.` });
//   }) 

  

 module.exports = router;

