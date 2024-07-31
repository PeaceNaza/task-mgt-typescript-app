import React, { useEffect } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { useState } from "react";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(() => {
    const savedCompletedTodos = localStorage.getItem("completedTodos");
    return savedCompletedTodos ? JSON.parse(savedCompletedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTodo: Todo = { id: Date.now(), todo, isDone: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setTodo("");
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };



  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    localStorage.setItem("todos", JSON.stringify(active));
    localStorage.setItem("completedTodos", JSON.stringify(complete));
    
    setCompletedTodos(complete);
    setTodos(active);

  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-screen min-h-screen flex flex-col items-center bg-[#2f74c0]">
          <span className="uppercase md:text-[40px] text-white md:mx-0 md:my-8 z-[1] text-center xs:my-4 xs:text-[35px]">
            Taskify
          </span>
          <InputFeild handleAdd={handleAdd} todo={todo} setTodo={setTodo} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
