import TodoItem from "../TodoItem/TodoItem";
import {MetaResponse, Todo, TodoInfo} from "../../types/todo";
import {JSX} from "react";

type TaskListProps = {
  tasks: Todo[]
  loadTasks: () => void;
}

const TaskList = (props: TaskListProps) => {
  const {
    tasks,
    loadTasks,
  } = props

  return (
    <ul className="task-list">
      {tasks.map((task:Todo): JSX.Element => (
        <TodoItem
          task={task}
          loadTasks={loadTasks}
        />
      ))}
    </ul>
  );
};

export default TaskList;