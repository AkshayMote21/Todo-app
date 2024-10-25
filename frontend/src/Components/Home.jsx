import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";
import "../styles/Home.css";

function Home() {
  const { state} = useContext(AuthContext);
  const router = useNavigate();
  const [todo, setTodo] = useState("");
  const [alltodos, setAllTodos] = useState([]);
  
  function handleChange(event) {
    console.log(event.target.value);
    setTodo(event.target.value);
  }

  async function handleSubmit(){
    try{
      if(!todo){
        return toast.error("Cannot add empty task! please write task to add");
      }
      if(!todo.trim()){
          return toast.error("Task cannot be spaces!");
      }
      const validPattern = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
      if(!validPattern.test(todo)){
        return toast.error("Task must start with letters! and can only contain letters, numbers");
      }
      if(todo.length > 40){
          return toast.error("City name can not be longer than 40 letters!");
      }
      const response =  await Api.post("/todo/create-todo",{todo});
      if(response.data.success){
        setAllTodos([...alltodos, response.data.CreatedTodo]);
        setTodo("");
        toast.success(response.data.message)
      }
    }catch(error){
      toast.error(error?.response?.data?.error);
      console.log(error,"error");
    }
  }
  const updateTodo = async (id,completed) => {
      try{
        const respone = await Api.put(`/todo/update-todo/${id}`,{completed:completed});
        GetAllTodos();
      }catch(error){
        toast.error("error at upate todo");
      }
  };

  const deleteTodo = async (id) => {
    try{
      const respone = await Api.delete(`/todo/delete-todo/${id}`);
      setAllTodos(respone.data.updatedTodo);
    }catch(error){
      toast.error("error at delete todo");
    }
  };

  const GetAllTodos = async () => {
    const response = await Api.get('/todo/get-todo-list');
    try{
      setAllTodos(response.data.todo);
    }catch(error){
      toast.error("error");
    }
  };
  useEffect(() => {
    GetAllTodos();
  }, []);

  return (
    <div id="fullpage">
        <div>
          {state?.user?.name ? (
            <div>
              <h2 style={{paddingTop:"20px"}}>Welcome, {state?.user?.name}</h2> 
              <div id="firstDiv">
                <input onChange={handleChange} id="inputId"  value={todo} />
                <button onClick={handleSubmit} id="submitBtn">Add task</button>
              </div>
              <h2>Your todos</h2>
              <div id="notepad">
                {alltodos.map((todo) => (
                  <div key={todo._id} id="contentDiv">
                    <li id="para">
                      {todo.title}
                    </li>
                    <button onClick={() => deleteTodo(todo._id)}  id="deleteBtn">
                      Delete
                    </button>
                    <button  onClick={() => updateTodo(todo._id, todo.completed)}  id="updateBtn">
                     {todo.completed ? "Completed" :"Incompleted" } 
                    </button>
                  </div>
                ))}
              </div>
            </div>
            ) : (
            <>
              <h1 style={{paddingTop:"20px",fontWeight:"lighter"}}>Welcome to the Todo App</h1>
              <h3 style={{marginBottom:"45px",fontWeight:"lighter",fontSize:"23px"}}>Manage your tasks efficiently!</h3>
              <span style={{fontSize:"18px",fontWeight:"lighter"}}>Please <span onClick={()=>{router('/login')}} style={{textDecoration:"underline",color:"blue",cursor:"pointer"}}>Log In</span> to create a todo list</span>
            </>
          )}
        </div>
    </div>
  );
}
export default Home;
