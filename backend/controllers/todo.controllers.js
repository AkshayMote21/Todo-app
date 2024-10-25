import Todo from "../models/todo.models.js";

export const GetAllTodos = async(req,res) => {
    const userId  = req.userId;
    try{
        const todo = await Todo.find({userId});
        return res.json({success:true,todo})
    }catch(error){
        return res.json({success:false,error});
    }
};

export const CreateNewTodo = async(req,res) =>{
    try{
        const title = req.body.todo;
        const userId = req.userId;
        const newTodo = new Todo({
            title,
            userId
        });
        const CreatedTodo = await newTodo.save();
        return res.json({success :true,message : "Todo added successfully.",CreatedTodo})
    }catch(error){
        return res.json({success:false,error});
    }
}

export const UpdateTodo = async (req,res)=>{
    try{
        const obj= {completed:!req.body.completed} 
        const updatedTodo =  await Todo.findByIdAndUpdate(req.params.id,obj,{new:true});
        console.log(updatedTodo,"updatedTodo");
        return res.json({success:true,message:"task updated successfully",updatedTodo});
    }catch(error){
        console.log(error,"error");
        return res.json({success:false,error});
    }
}

export const DeleteTodo = async (req,res)=>{
    const userId  = req.userId;
    try{
        await Todo.findByIdAndDelete(req.params.id);
        const updatedTodo =await Todo.find({userId});
        return  res.json({success:true,message:"task deleted successfully",updatedTodo});
    }catch(error){
        console.log(error,"error");
        return res.json({success:false,error});
    }
}

