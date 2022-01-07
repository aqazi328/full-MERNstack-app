import express from 'express';
const router = express.Router();
import Bug from '../models/bug.model.js'

router.route('/').get((req, res)=>{
    Bug.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const time = req.body.time;
    const date = req.body.date;
    const dueDate = req.body.dueDate;
    const assignee = req.body.assignee;

    const newBug = new Bug({title, description, time, date, dueDate, assignee});
    newBug.save()
        .then(()=> res.json(`Bug with title: ${req.body.title} added!`))
        .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res)=>{
    Bug.findById(req.params.id)
        .then(bug=>res.json(bug))
        .catch(err=> res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res)=>{
    Bug.findByIdAndDelete(req.params.id)
        .then(()=>res.json(`Bug with id: ${req.params.id} deleted.`))
        .catch(err=> res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res)=>{
    Bug.findById(req.params.id)
        .then(bug=>{
            bug.title = req.body.title;
            bug.description = req.body.description;
            bug.time = req.body.time;
            bug.date = req.body.date;
            bug.dueDate = req.body.dueDate;
            bug.assignee = req.body.assignee;

            bug.save()
                .then(()=> res.json(`Bug with id: ${req.params.id} updated!`))
                .catch(err=> res.status(400).json('Error: ' + err));
        })
        .catch(err=> res.status(400).json('Error: ' + err));
})

export default router;