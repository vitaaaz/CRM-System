import {useState, useEffect} from "react";
import "./TodoListPage.css"
import AddTask from "../components/AddTask/AddTask";
import {fetchTasks} from "../api/api";
import TaskFilters from "../components/TaskFilters/TaskFilters";
import TaskList from "../components/TaskList/TaskList";
import {Todo, TodoInfo, MetaResponse} from "../types/todo";

const TodoListPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [status, setStatus] = useState<"all" | "completed" | "inWork">("all")
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  //загрузка задач после запроса с сервера
  const loadTasks = (): void => {
    fetchTasks(status)
      .then((obj) => {
        console.log(obj.data.data);
        //тут было setInfo(obj.info)
        setInfo(obj.data.info)
        setTasks(obj.data.data);
      })
  }

  useEffect((): void => {
    loadTasks()
    console.log("TODO PAGE: Успех. Все задачи загружены!")
  }, [status])

  return (
    <div className="container-todo">
      <h1>Todo list</h1>
      <TaskFilters
        info={info}
        onSetStatus={setStatus}
      />
      <AddTask loadTasks={loadTasks} />
      <TaskList
        loadTasks={loadTasks}
        tasks={tasks}
      />
    </div>
  );
};

export default TodoListPage;
