import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <form
      className="image flex md:w-[29.5%] rounded-md p-5 mt-4 xs:w-full"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          placeholder="Edit todo"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="flex-1 p-[5px] border-0 text-[20px] focus:outline-none"
        />
      ) : todo.isDone ? (
        <s className="flex-1 p-[5px] border-0 text-[20px] focus:outline-none">{todo.todo}</s>
      ) : (
        <span className="flex-1 p-[5px] border-0 text-[20px] focus:outline-none">{todo.todo}</span>
      )}

      <div className="flex flex-row">
        <span
          className="ml-[10px] text-[25px] cursor-pointer"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span
          className="ml-[10px] text-[25px] cursor-pointer"
          onClick={() => handleDelete(todo.id)}
        >
          <AiFillDelete />
        </span>
        <span className="ml-[10px] text-[25px] cursor-pointer" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
