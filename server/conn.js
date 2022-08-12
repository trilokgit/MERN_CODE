const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

const DB = process.env.MONGO_URL

mongoose.connect(DB, {
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("mongodb connected...")
}).catch((error) => {
    console.log(error.message);
})