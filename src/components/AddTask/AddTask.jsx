import {useEffect, useState} from "react";


const AddTask = (props) => {
  //принимаем функцию загрузки задач в пропс
  const {putTaskList} = props

  const [newTask, setNewTask] = useState("")

  function handleInput(event) {
    setNewTask(event.target.value)
  }

  function postNewTask() {

    const taskData = {
      title: newTask.trim(),
      isDone: false,
    };

    fetch("https://easydev.club/api/v1/todos",
      {
        method: 'POST',
        // headers: {"Content-Type": "application/json",},
        body: JSON.stringify(taskData),
      })
      .then(response => response.json())
      .then(obj => {
        console.log("Задача добавлена и строка очищена");
        setNewTask("")
        //вызываем функцию, чтобы обновить список с сервера
        if (putTaskList) putTaskList()

      })
      .catch(error => {
        console.error("Ошибка загрузки данных:", error);
      });
  }

  return (
    <div>
      <input
        placeholder="Enter new task..."
        value={newTask}
        onChange={handleInput}
      />
      <button
        type="button"
        onClick={postNewTask}
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;