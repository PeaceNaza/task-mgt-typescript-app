import React from 'react'
import './App.css'
import InputFeild from './components/InputFeild'
import { useState } from 'react'
import { Todo } from "./model"
import TodoList from './components/TodoList'


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("") 
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
   e.preventDefault();
   if (todo) {
    setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
    setTodo("");
   }
  }

  console.log(todos)

  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center bg-[#2f74c0]'>
        <span className='uppercase md:text-[40px] text-white md:mx-0 md:my-8 z-[1] text-center xs:my-4 xs:text-[35px]'>Taskify</span>
        <InputFeild handleAdd={handleAdd}  todo={todo} setTodo={setTodo} />
        <TodoList todos={todos} setTodos={setTodos} />
       
      </div>
    </>
  
  )
}

export default App
