import {deleteTask, changeTaskData} from "../../api/api";
import {ChangeEvent, useState} from "react";
import {Todo, TodoRequest} from "../../types/todo";
import IconButton from "../../UI/IconButton/IconButton";

type TodoItemProps = {
  task: Todo
  loadTasks: () => void;
}

const TodoItem = (props: TodoItemProps) => {
  const [editIdTask, setEditIdTask] = useState<null | number>(null)
  const [editText, setEditText] = useState<string>("")
  const {
    task,
    loadTasks,
  } = props

  const DeleteIcon: React.JSX.Element = (<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 1024 1024"
  >
    <path
      fill="currentColor"
      d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
    />
  </svg>)
  const EditIcon: React.JSX.Element = (
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
  )
  //реакция на нажатие кнопки редактировать
  const editClick = (task: Todo): void => {
    setEditIdTask(task.id)
    setEditText(task.title)
  }

  //сохранение задачи(ред) и отправка на сервер методом put
  const saveTask = (): void => {
    if (editText.length <= 2) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${editText.length}`);
      return;
    }
    if (editText.length > 64) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${editText.length}`);
      return;
    }

    const updateTaskData: TodoRequest = {
      title: editText.trim(),
      isDone: false,
    };

    changeTaskData(editIdTask, updateTaskData)
      .then(() => {
        loadTasks()
        setEditIdTask(null)
        console.log(`Задача обновилась на сервере`)
      })
  }

  //управление чекбоксом
  const handleToggle = (title: string, id: number, isDone: boolean): void => {
    const taskStatus = {
      title: title.trim(),
      isDone: !isDone,
    };
    changeTaskData(id, taskStatus)
      .then(() => {
        loadTasks()
        console.log("Поменялся статус задачи")
      })
  }

  const deleteTaskFunction = () => {
    deleteTask(task.id)
      .then(() => {
        console.log(`Задача удалена`)
        if (loadTasks) loadTasks()
      })
  }

  return (
    <li key={task.id}>
      {editIdTask === task.id ? (
        <>
          <input
            value={editText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          />
          <div className="container">
            <button
              className="inner-button edit-button"
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
              className="inner-button edit-button"
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
            <IconButton
              className='inner-button edit-button'
              icon={EditIcon}
              onClick={() => {
                editClick(task)
              }}
            />
            <IconButton
              className="delete-button inner-button"
              icon={DeleteIcon}
              onClick={deleteTaskFunction}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;