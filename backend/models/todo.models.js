import mongoose, {Schema,model} from 'mongoose';
const todoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    completed : { type:Boolean, default:false}
});

const Todo = model("todos",todoSchema);

export default Todo;