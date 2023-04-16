const express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
require('dotenv').config();
const Todo = require('./models/Todo');


const app = express();

app.use(express.json());
app.use (cors());

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {console.log("connected to DB")})
.catch(console.error);

//////////////////Models


app.get('/todos', async (req, res) => {

    const todos = await Todo.find();
    res.json(todos)
});

app.post('/todo/new', async (req, res) =>{

    const todo = await Todo.create({
        text: req.body.text
    })
    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {

    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.get('/todo/complete/:id', async (req, res) => {

    const todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    todo.save()
    res.json(todo)
})


app.listen(3000, () => {console.log("server started")})