import React from 'react'
import { Todo } from "../model"
import SingleTodo from './SingleTodo'

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos}:Props) => {
  return (
    <div className='flex justify-evenly w-[90%] flex-wrap'>
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}

    </div>
  )
}

export default TodoList
