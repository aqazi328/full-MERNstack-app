import express from 'express';
const router = express.Router();
import User from '../models/user.model.js'

router.route('/').get((req, res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const admin = req.body.admin;

    const newUser = new User({username, password, email, admin});
    newUser.save()
        .then(()=> res.json('User added!'))
        .catch(err=> res.status(400).json('Error: ' + err));
});

export default router;