import {deleteTask, changeTaskData} from "../../api/api";
import {ChangeEvent, useState} from "react";
import {Todo, TodoRequest} from "../../types/todo";
import {Button, Checkbox, Input} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";

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
    <li className="todo-item">
      {editIdTask === task.id ? (
        <>
          <Input
            status="warning"
            value={editText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          />
          <div className="container-btn">
            <Button
              className="inner-button edit-button"
              onClick={() => {
                setEditIdTask(null)
              }}
              icon={<CloseOutlined />}
            />
            <Button
            icon={<CheckOutlined />}
            type="primary"
            className="inner-button edit-button"
            onClick={saveTask}
            />
          </div>
        </>
      ) : (
        <>
          <Checkbox
            checked={task.isDone}
            onChange={() => handleToggle(task.title, task.id, task.isDone)}
          />
          {task.title}
          <div className="container-btn">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {editClick(task)}}
              className='inner-button edit-button'
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={deleteTaskFunction}
              color="danger"
              variant="solid"
            />
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;