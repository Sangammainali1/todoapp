import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Component/Navbar'
import Footer  from "./Component/Footer";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";





function App() {
  const [todo, setTodo] = useState("")
  const [todos,setTodos]=useState([])
  const [showfinished,setshowFinished]=useState(true)


  const toggleFinished =  (e) => {
    setshowFinished(!showfinished)
  }
  

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  


  const handleDelete  = (e,id)=>{
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const handleEdit = (e,id)=> {
      let t = todos.filter(i=> i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id!==id;
      })
      setTodos(newTodos)
      saveToLocalStorage()
  }

  const handleAdd = ()=> {
    setTodos([...todos,{id:uuidv4(), todo,isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLocalStorage()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(`the id is ${id}`)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage()
  }
  return (
    <>
    <Navbar />
    <div className="md:container mx-3 bg-violet-300 md:mx-auto my-5 rounded-xl py-5 px-4 min-h-[80vh] md:w-1/2">
    <div className="addTodo flex flex-col gap-4">
      <h1 className='font-bold text-center text-xl'>i-Task Manage your todo at one place</h1>
      <h2 className='text-lg font-bold my-5'>Add Todo</h2>
      <div className="flex">
      <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-2'/>
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950 p-3 font-bold text-sm py-1 text-white  mx-2 rounded-full'>Save
      </button>
      </div>
    </div>

    <input type="checkbox" onChange={toggleFinished} checked={showfinished} /> show finished
    <div className='h-[1px] bg-black opacity-15 w-[95%] my-2 mx-auto'></div>
        <h2 className='text-lg font-bold'>your todos</h2>
      <div className="todos">

        {todos.length===0 && <div className='m-5'>No todo to show</div>}

        {todos.map(item=>{

        
        return(showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 md:w-1/2 mx-1 space-between">
          <div className='flex gap-5'>

          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className=" buttons flex h-full">
         <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 font-bold text-sm py-1 text-white rounded-lg mx-1'><FaEdit />
</button>
         <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 font-bold text-sm py-1 text-white rounded-lg mx-1'><MdDelete /></button>
         </div>
        </div>

})}
      </div>
      
    </div>
    <Footer />
    
    </>
  )
}

export default App




