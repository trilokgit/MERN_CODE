const express = require('express');
const app = express();
const notes = require('./data/notes');
const dotenv = require('dotenv')
const User = require("./models/userModel")
const Note = require('./models/noteModel');
const asyncHandler = require('express-async-handler');
const protect = require("./middleware/authMeddileware");

dotenv.config();
const mongoose = require("mongoose");
require("./conn")
app.use(express.json());
const cors = require("cors");
const { notFound, errorHandler } = require('./middleware/errorMiddlewarehandler');
const generateToken = require('./util/generateToken');
const { find } = require('./models/userModel');
app.use(cors());


//NOTES API

app.get('/api/notes', protect ,asyncHandler (async (req, res) => {
     
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);


}))

app.post('/api/notes/create',protect, asyncHandler(async (req, res) => {
    
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400)
        throw new Error("Please Fill All The Field");
    } else {
        const note = new Note({ user: req.user._id, title, content, category });
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }

}));


app.get('/api/notes/:id', asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }


}))


app.put('/api/notes/:id', asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    const loginuser = await User.findById(note.user._id);
    if (!loginuser._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized User to delete this Note");
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updateNote = await note.save();
        res.json(updateNote);
    } else {
        res.status(404);
        throw new Error("Notes Not Found");
    }
}));


app.delete('/api/notes/:id', protect, asyncHandler(async (req, res) => {
    
    const note = await Note.findById(req.params.id);
    const loginuser = await User.findById(note.user._id);
    if (!loginuser._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized User to delete this Note");
    }
    if (note) {
        await note.remove();
        res.json({ message: "Note deleted Successfully" });
    } else {
        res.status(404);
        throw new Error("Note Not Found");
    }


}));





// app.get('/api/notes/:id', (req, res) => {
//     const { id } = req.params;

//     const note = notes.find((n) => n._id === id);
//     res.send(note);
// })

//USER API



app.post("/api/user", asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error("user already exist");
    }

    const user = await User.create({
        name, email, password, picture,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            picture: user.picture,
            token : generateToken(user._id)

        });
    } else {
        res.status(400)
        throw new Error("Error occured!");
    }

}))

app.post("/api/user/login", asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)

        });
    } else {
        res.status(400)
        throw new Error("Invalid Email and password");
    }

}))

app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/bulid"));
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server start on Port ${PORT}`));