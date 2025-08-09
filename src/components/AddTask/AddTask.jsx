import {useState} from "react";


const AddTask = (props) => {
  //принимаем функцию загрузки задач из пропса
  const {putTaskList} = props

  const [newTask, setNewTask] = useState("")

  function handleInput(event) {
      setNewTask(event.target.value)
  }

  function postNewTask() {
    if (!newTask.trim()) {
      alert("Задача не может быть пустой!");
      return;
    }

    if (newTask.length <= 2 ) {
      alert("Требуется ввести от 2 до 64 символов");
      return;
    }

    if (newTask.length > 64 ) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${newTask.length}`);
      return;
    }

    const taskData = {
      title: newTask.trim(),
      isDone: false,
    };

    fetch("https://easydev.club/api/v1/todos",
      {
        method: 'POST',
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
        className="add-input"
        placeholder="Enter new task..."
        value={newTask}
        onChange={handleInput}
      />
      <button
        className="add-button"
        type="button"
        onClick={postNewTask}
      >
Add      </button>
    </div>
  );
};

export default AddTask;