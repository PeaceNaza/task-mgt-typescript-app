import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="flex xs:w-[95%] mt-3 justify-between items-start md:flex-row xs:flex-col">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`${snapshot.isDraggingOver ? "bg-[#00DDEC]" : ""} md:ml-10 w-[47.5%] rounded-md flex md:w-[45%] xs:w-[95%] xs:mb-3 flex-col p-4 bg-[#32C3CD]`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className=" text-[30px] text-white">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`${snapshot.isDraggingOver ? "bg-[#FF2600]" : ""} mr-10 w-[47.5%] flex rounded-md  md:w-[45%] flex-col p-4 bg-[#EB6750] xs:w-[95%] xs:mb-3`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-[30px] text-white">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
