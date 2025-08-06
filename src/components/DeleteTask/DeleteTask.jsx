import {useState} from "react";

const DeleteTask = (props) => {
 const {taskId, putTaskList} = props

  //функция удаления задачи
  function deleteTask() {
    fetch(`https://easydev.club/api/v1/todos/${taskId}`,
      {method: 'DELETE',})
      .then(response => {
        console.log("Задача удалена")
        if (putTaskList) putTaskList()
      })
  }

  return (

    <button
      type="button"
      onClick={deleteTask}
    >
      Delete
    </button>

  );
};

export default DeleteTask;