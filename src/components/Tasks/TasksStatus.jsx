const TasksStatus = () => {

  function showTaskInWork() {
    fetch(`https://easydev.club/api/v1/todos?filter=inWork`)
      .then((res) => res.json())
      .then(data => {
        console.log(data)
      })
  }

  // function showTaskIsDone() {
  //
  // }

  return (
    <>
      <button>Все</button>
      <button onClick={showTaskInWork}>В процессе</button>
      {/*<button>Выполнено{showTaskIsDone}</button>*/}
    </>
  );
};

export default TasksStatus;