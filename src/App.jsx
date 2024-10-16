import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task.todo]);
    console.log(task);
  };

  const onSubmit = (data) => {
    addTask(data);
    reset();
  };

  return (
    <div className="h-screen bg-gradient-to-r from-[#1F357B] via-[#30286E] to-[#3E1D6A] flex items-center justify-center">
      <div className="w-10/12 md:w-1/2 lg:w-1/3 h-auto p-10 mt-10 text-center mx-auto bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          My Todo App ✅{" "}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("todo", { required: true })}
            className="border py-3 px-5 rounded w-1/2 mb-5"
          />
          {errors.todo && (
            <p className="text-red-500">This field is required</p>
          )}
          <input
            type="submit"
            className="border py-3 hover:bg-gray-600 px-5 rounded bg-gray-400 text-white cursor-pointer"
          />
        </form>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between border p-3 rounded-md mt-5"
            >
              <span>{task}</span>
              <span className="cursor-pointer">❌</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
