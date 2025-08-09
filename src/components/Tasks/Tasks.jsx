import {useState, useEffect} from "react";
import "./Tasks.css"
import AddTask from "../AddTask/AddTask";
import DeleteTask from "../DeleteTask/DeleteTask";


const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [editIdTask, setEditIdTask] = useState(null)
  const [editText, setEditText] = useState("")
  const [status, setStatus] = useState("filter=all")
  const [info, setInfo] = useState(5)

  const queryStr = {
    all: "filter=all",
    inWork: "filter=inWork",
    completed: "filter=completed",
  }

  //загрузка задач с сервера
  const loadTasks = () => {
    fetch(`https://easydev.club/api/v1/todos?${status}`,
      {method: 'GET'},)
      .then(response => response.json())
      .then(obj => {
        console.log(obj.data);
        setTasks(obj.data);
        setInfo(obj.info)
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
    if (editText.length <= 2 ) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${editText.length}`);
      return;
    }
    if (editText.length > 64 ) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${editText.length}`);
      return;
    }

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
      <div className="status-bar">
        <button
          className="status-button"
          type="button"
          onClick={() => setStatus(queryStr.all)}
        >All({info.all})
        </button>
        <button
          className="status-button"
          type="button"
          onClick={() => setStatus(queryStr.inWork)}
        >In work({info.inWork})
        </button>
        <button
          className="status-button"
          type="button"
          onClick={() => setStatus(queryStr.completed)}
        >Completed({info.completed})
        </button>
      </div>
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
                <div className="container">
                  <button
                    className="inner-button"
                    type="button"
                    onClick={() => {
                      setEditIdTask(null)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 2048 2048"
                    >
                      <path
                        fill="currentColor"
                        d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z"
                      />
                    </svg>
                  </button>
                  <button
                    className="inner-button"
                    type="button"
                    onClick={saveTask}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="m15.3 5.3l-6.8 6.8l-2.8-2.8l-1.4 1.4l4.2 4.2l8.2-8.2z"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => handleToggle(task.title, task.id, task.isDone)}
                />
                {task.title}
                <div className="container">
                  <DeleteTask
                    taskId={task.id}
                    putTaskList={loadTasks}
                  />
                  <button
                    className="inner-button"
                    type="button"
                    onClick={() => {
                      editClick(task)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 20h16M4 20v-4l8-8M4 20h4l8-8m-4-4l2.869-2.869l.001-.001c.395-.395.593-.593.821-.667a1 1 0 0 1 .618 0c.228.074.425.272.82.666l1.74 1.74c.396.396.594.594.668.822a1 1 0 0 1 0 .618c-.074.228-.272.426-.668.822h0L16 12.001m-4-4l4 4"
                      />
                    </svg>
                  </button>
                </div>

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