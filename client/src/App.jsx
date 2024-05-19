import React,{useState,useEffect} from 'react'
import "./App.css"


const App = () => {
const [todo,setTodo]=useState("")
const [todoList,setList]=useState([])

useEffect(()=>{
  fetch("http://localhost:5000/gettask")
  .then(response=>response.json())
  .then(json=>{
    setList(json)
  
  })

},[])


 const handleSubmit=(e)=>{
e.preventDefault()
fetch('http://localhost:5000/addtask', {
  method: 'post',
  headers: {'Content-Type':'application/json'},
  body:JSON.stringify({ todo })
 })
 .then(response=>response.json())
 .then(json=>{
  console.log(json)
   setList(json)
   setTodo("")
 })

  }
  


  const delHandler=id=>{
    console.log(id)
    fetch(`http://localhost:5000/delete/${id}`,{method:'DELETE'})
    .then(res=>res.json())
    .then(json=>{
      setList(json)
    
    })
  }
  
 
  console.log(todo)
  console.log(todoList)
  
  return (
    <div className='container'>
<h1 >Todo Maker</h1>
<form onSubmit={handleSubmit}>
  <input type="text" className='input-ele' value={todo} onChange={(e)=>{console.log(e.target.value)
    setTodo(e.target.value)
  } }/>
  <button type='submit' className='button'>submit</button>
</form>
<ul>
  {todoList.map(todos=>{
    return (
    <div className='items'  key={todos._id}>
 <li>{todos.todo}</li>
  <button className='button' onClick={()=>{delHandler(todos._id)}}>close</button>
    </div>
   
  )
  })}
</ul>
    </div>
  )
}

export default App