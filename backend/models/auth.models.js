import {model, Schema} from 'mongoose';
const userSchema = new Schema({
    name : String,
    email : String,
    password : String
});

const User = new model("users",userSchema);

export default User;