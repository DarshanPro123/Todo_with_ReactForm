import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getData = () => {
  const data = localStorage.getItem("Todos");

  if (data) return JSON.parse(data);
  return [];
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tasks, setTasks] = useState(getData());

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), todo: task.todo }]);
    toast.success("Add data sucessFully");
  };

  const onSubmit = (data) => {
    addTask(data);
    reset();
  };

  const handleDelete = (id, todo) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    toast.error(`${todo} delete Sucessfully`);
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="h-screen bg-gradient-to-r from-[#1F357B] via-[#42369d] to-[#3E1D6A] flex items-center justify-center">
      <div className="w-10/12 md:w-1/2 lg:w-1/3 h-auto p-10 mt-10 text-center mx-auto bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          My Todo App ✅{" "}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("todo", { required: true })}
            className="border border-gray-300  py-3 px-5 rounded w-1/2 mb-5"
          />
          {errors.todo && (
            <p className="text-red-500">This field is required</p>
          )}
          <input
            type="submit"
            className="border py-3 hover:bg-gray-600 px-5 rounded mx-1  bg-gray-500 text-white cursor-pointer"
          />
        </form>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between border p-3 rounded-md mt-5"
            >
              <span>{task.todo}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleDelete(task.id, task.todo)}
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}

export default App;
