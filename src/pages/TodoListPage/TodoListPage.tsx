import {useState, useEffect, useCallback} from "react";
import "./TodoListPage.css"
import AddTask from "@/components/AddTask/AddTask";
import {fetchTasks} from "@/api/api";
import TaskFilters from "@/components/TaskFilters/TaskFilters";
import TaskList from "@/components/TaskList/TaskList";
import {Todo, TodoInfo, MetaResponse, Status} from "@/types/todo";

const TodoListPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [status, setStatus] = useState<Status>("all")
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  //загрузка задач после запроса с сервера
  const loadTasks = useCallback((): void => {
    fetchTasks(status)
      .then((obj) => {
        console.log(obj.data.data);
        //тут было setInfo(obj.info)
        setInfo(obj.data.info)
        setTasks(obj.data.data);
      })
  }, [status])

  useEffect(() => {
    const id = setInterval(loadTasks, 5000);
    loadTasks();
    return () => clearInterval(id);
  }, [loadTasks]);

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
