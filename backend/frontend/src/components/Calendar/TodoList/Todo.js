import React,{useState,useEffect} from 'react'
import '../../../css/Calender/todo.css';
import axios from 'axios' 

import {GrCheckbox} from 'react-icons/gr'
import {GrCheckboxSelected} from 'react-icons/gr'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin5Fill} from 'react-icons/ri'


function Todo({year, month, day}) {
    const initialTodo={
        id:null,
        title:"",
        completed: false
    }
    const [todos,setTodos]=useState([])
    const [todo,setTodo]=useState(initialTodo)
    const [updateOrCreate,setUpdateOrCreate]=useState(false)
    const [fetch,setFetch]=useState(false)
    const done =(todo)=>{
         return (todo.completed)?"fa fa-check-circle fa-2x text-success":"fa fa-check-circle fa-2x"
    }
    const Token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todos/', {
            headers: {
                Authorization: `Token ${Token}`
            }
        })
        .then(
            response=>{
                
                setTodos(response.data)
                console.log('fetched data ...')
            }
        )
        .catch(
            console.log("error")

        )

    })
    
    const handlechange=(e)=>{
       setTodo({...todo,
               title:e.target.value,
               
            })
        console.log('handle change:'+ todo)
    }

    const handleSubmit=(e)=>{
     e.preventDefault()
     setFetch(!fetch)
     axios.post('http://127.0.0.1:8000/api/todo-create/',todo, {
        headers: {
            Authorization: `Token ${Token}`
        }
    });
    setTodo(initialTodo)
   
    }
     
    const handleToUpdate=(todo)=>{
        setTodo(todo)
        setUpdateOrCreate(true)
        setFetch(!fetch)

    }

    const handleUpdate=(e)=>{
        e.preventDefault()
        // setFetch(!fetch)
        setUpdateOrCreate(true)
         console.log(todo)
         axios.post('http://127.0.0.1:8000/api/todo-update/'+todo.id,
         {
            title:todo.title,
            completed:todo.completed
         }, {
            headers: {
                Authorization: `Token ${Token}`
            }
        });
         setUpdateOrCreate(false)
         setTodo(initialTodo)
         setFetch(!fetch)
    }

    const handleDelete=(todo)=>{
        axios.delete('http://127.0.0.1:8000/api/todo-delete/'+todo, {
            headers: {
                Authorization: `Token ${Token}`
            }
        });
        setFetch(!fetch)
    }
    
    const handleComplete=(todo)=>{
        axios.post('http://127.0.0.1:8000/api/todo-update/'+todo.id,
        {
           title:todo.title,
           completed:true
        }, {
            headers: {
                Authorization: `Token ${Token}`
            }
        });
        setFetch(!fetch)
    }

  return (
    
     <div className="list-container ">
        <div className="form-container">
           <form className="form-input-container" onSubmit={e=>(updateOrCreate)?handleUpdate(e):handleSubmit(e) }>
           <button className="btn btn-success">할일 추가</button>
            <input type="text" className="form-control mr-1" onKeyPress={(e)=> {if(e.key==='Enter') {(updateOrCreate)?handleUpdate(e):handleSubmit(e)}}} onChange={e=>handlechange(e)} value={todo.title} id="titleInput" placeholder="할일을 입력해주세요."/>
          </form>
        </div>
       
       
        <div className="tasks-container">

            
        {todos.map((todo,index)=>( 
            <div className="task" key={index}>
                {todo.completed ? <GrCheckboxSelected/> : <GrCheckbox/>}
                <div style={{flex:20}} onClick={()=>handleComplete(todo)} >
                    <label className="todo-text ml-2 mb-0"><span className={todo.completed?"todo-completed" : ""}>{todo.title}</span></label>
                </div>
           
               <div className="d-flex">
                    
                    <button  className="btn btn-default mr-1 edit-btn" onClick={()=>handleToUpdate(todo)}  >
                        <BiEditAlt size="30" color= "#686868"/>
                    </button>
                   <button className="btn btn-default delete-btn" onClick={()=>handleDelete(todo.id)} >
                       <RiDeleteBin5Fill size="30" color= "#686868"/>
                    </button>
              </div>
             
            </div>
        ))}

        </div>

         


      </div>
       
  );
}

export default Todo;