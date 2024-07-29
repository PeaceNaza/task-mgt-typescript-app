import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
      className="flex xs:w-[95%] relative items-center"
    >
      <input
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
        placeholder="Enter a task"
        className="input-box w-full rounded-[50px] px-[30px] py-[20px] text-[25px] border-0"
      />
      <button
        type="submit"
        className="submit absolute w-[50px] h-[50px] m-[12px] rounded-[50px] right-0 border-0 text-[15px] bg-[#2f74c0] text-white hover:bg-[#388ae2]"
      >
        Go
      </button>
    </form>
  );
};

export default InputFeild;
