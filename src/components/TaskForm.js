import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params, tasks]);

  return (
    <>
    <div class="container py-10 px-10 mx-0 min-w-full grid place-items-center gap-5">
    <div>
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold">Tarea:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Escriba el título de la tarea"
        autoFocus
      />
      <label>
        Descripción:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Escriba la descripción de la tarea"
        />
      </label>
      <label className="block text-sm font-bold">Fecha:</label>
      <input
        type="date"
        name="date"
        onChange={handleChange}
        value={task.date}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        autoFocus
      />
      <button type="submit" className="bg-indigo-600 px-2 py-1">Guardar</button>
    </form>
    </div>
    <div>
    <Link
          to="/"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Volver a la lista
        </Link>
    </div>
    </div>
    </>


  );
}

export default TaskForm;
