import {useState, useEffect} from "react";
import "./Tasks.css"
import AddTask from "../AddTask/AddTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import TasksStatus from "./TasksStatus";

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [editIdTask, setEditIdTask] = useState(null)
  const [editText, setEditText] = useState("")
  const [status, setStatus] = useState("filter=all")


  //загрузка задач с сервера
  const loadTasks = () => {
    fetch(`https://easydev.club/api/v1/todos?${status}`,
      {method: 'GET'},)
      .then(response => response.json())
      .then(obj => {
        console.log(obj.data);
        setTasks(obj.data);
      })
      .catch(error => {
        console.error("Ошибка загрузки данных:", error);
      });
  }
  useEffect(() => {
    loadTasks();
  }, [status])

  //реакция на нажатие кнопки редактировать
  function editClick(task) {
    console.log(task.title)
    setEditIdTask(task.id)
    setEditText(task.title)
  }

  //сохранение задачи(ред) и отправка на сервер методом put
  function saveTask() {
    const putTaskData = {
      title: editText.trim(),
      isDone: false,
    };

    fetch(`https://easydev.club/api/v1/todos/${editIdTask}`,
      {
        method: 'PUT',
        body: JSON.stringify(putTaskData),
      })
      .then(response => response.json())
      .then(data => {
        loadTasks()
        setEditIdTask(null)
        console.log(data)
        console.log(`Задача обновилась на сервере`)
      })
  }

  //управление чекбоксом
  function handleToggle(title, id, isDone) {
    const TaskStatus = {
      title: title.trim(),
      isDone: !isDone,
    };

    fetch(`https://easydev.club/api/v1/todos/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(TaskStatus),
      })
      .then(response => response.json())
      .then(data => {
        loadTasks()
      })
  }

  return (
    <>
      <button type="button" onClick={() =>setStatus("filter=all")}>All</button>
      <button type="button" onClick={() =>setStatus("filter=inWork")}>In work</button>
      <button type="button" onClick={() =>setStatus("filter=completed")}>Completed</button>
      <AddTask putTaskList={loadTasks} />
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editIdTask === task.id ? (
              <>
                <input
                  id=""
                  name=""
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setEditIdTask(null)
                  }}
                >cancel
                </button>
                <button
                  type="button"
                  onClick={saveTask}
                >save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={()=>handleToggle(task.title, task.id, task.isDone)}
                />
                {task.title}
                <DeleteTask
                  taskId={task.id}
                  putTaskList={loadTasks}
                />
                <button
                  type="button"
                  onClick={() => {
                    editClick(task)
                  }}
                >Edit
                </button>
              </>
            )}
            {/*{task.isDone == true ? " выполнено" : " в процессе"}*/}

          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;