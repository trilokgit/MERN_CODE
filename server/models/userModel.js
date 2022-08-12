const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false
        },
        picture: {
            type: String,
            require: true,
            default: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
}


const User = mongoose.model('User', userSchema);

module.exports = User;