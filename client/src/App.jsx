import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./App.css"


const App = () => {
const [todo,setTodo]=useState("")
const [todoList,setList]=useState([{id:uuidv4(),todo:"Learning Todo"}])
//  const handleSubmit=(e)=>{
// e.preventDefault()
// let task={id:uuidv4(),todo:todo}
// setList([...todoList,task])
// setTodo("")

//   }

//  const handleChange=(e)=>{
//  let item=e.target.value

//  setTodo(item)
//   }

  
  return (
    <div className='container'>
<h1 >Todo Maker</h1>
<form>
  <input type="text" className='input-ele' value={todo} />
  <button type='submit' className='button'>submit</button>
</form>
<ul>
  {todoList.map(todos=>{
    return (
    <div className='items'>
 <li key={todos.id}>{todos.todo}</li>
  <button className='button'>close</button>
    </div>
   
  )
  })}
</ul>
    </div>
  )
}

export default App