import {useState} from "react";
import {addTask} from "../api/api";


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

    if (newTask.length <= 2) {
      alert("Требуется ввести от 2 до 64 символов");
      return;
    }

    if (newTask.length > 64) {
      alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${newTask.length}`);
      return;
    }

    const taskData = {
      title: newTask.trim(),
      isDone: false,
    };
    //вызов запроса с методом PUT и обработка .then
    addTask(taskData)
      .then(obj => {
        console.log("Задача добавлена и строка очищена");
        setNewTask("")
        if (putTaskList) putTaskList()
      })
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
        Add
      </button>
    </div>
  );
};

export default AddTask;