import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

const title = useRef()
const description = useRef()
const [data,setData] = useState(false)

useEffect(()=>{

axios.get('http://localhost:3000/api/v1/todos')
.then((res)=>{
console.log(res.data);
setData(res.data)
})
.catch(()=>{})
  
},[])


// add todo ka funtion

const addTodo = (event) => {
event.preventDefault()

axios.post('http://localhost:3000/api/v1/todo',{
  title:title.current.value,
  description:description.current.value
})
.then((res)=>{
console.log(res.data);
window.location.reload();

})
.catch((err)=>{
  console.log(err);
  
})



}

// delete todo ka funtion

const deleteTodo = (id) => {

axios.delete(`http://localhost:3000/api/v1/todo/${id}`)
.then((res)=>{
  console.log(res.data);
  window.location.reload()
  
})
.catch((err)=>{
  console.log(err);
  
})

}

// edit todo ka function

const editTodo = (id) =>{
  // event.preventDefault() 
const updatedtitle = prompt('Enter updated title')
const updateddescription = prompt('Enter updated description')
axios.put(`http://localhost:3000/api/v1/todo/${id}`,{
   ...(updatedtitle && {title:updatedtitle} ),
   ...(updateddescription && {description:updateddescription} ),
  }
)
.then((res)=>{
window.location.reload()

})
.catch((err)=>{
console.log(err);

})

}


return (
<>
 <h1 style={{textAlign:"center",fontSize:30}}>Todo App</h1>

<form onSubmit={addTodo} style={{textAlign:"center"}}>
<input type="text" placeholder='Enter title' ref={title}/> <br /> <br />
<input type="text" placeholder='Enter description' ref={description} /> <br /> <br /> 
<button>Add Todo</button>

</form> 


{data && data.map((item,index)=>{
  return <ol key={item._id}>
    <div >


<h3>{item.title}</h3>
<p>{item.description}</p>

<button onClick={()=>{deleteTodo(item._id)}}>Delete</button>
<button style={{marginLeft:10}} onClick={()=>{editTodo(item._id)}}>Edit</button>
<hr />


  </div></ol>
})}


</>
  )
}

export default App