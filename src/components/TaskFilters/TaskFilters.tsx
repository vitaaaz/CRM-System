import {TodoInfo} from "../../types/todo";
import Tab from "../../UI/Tab/Tab";
import {useState} from "react";

type TaskFiltersProps = {
  onSetStatus: (status: ("all" | "completed" | "inWork")) => void;
  info: TodoInfo;
}

const TaskFilters = (props: TaskFiltersProps) => {
  const [activeTab, setActiveTab] = useState<"All" | "InWork" | "Completed">("All")
  const {
    onSetStatus,
    info,
  } = props

  return (
    <div className="status-bar">
      <Tab
        className="status-button"
        type="button"
        onClick={(): void => {
          onSetStatus("all")
          setActiveTab("All")
        }}
        isActive={activeTab === "All"}
        title={`All(${info.all})`}
      >
      </Tab>
      <Tab
        className="status-button"
        type="button"
        onClick={(): void => {
          onSetStatus("inWork")
          setActiveTab("InWork")
        }}
        isActive={activeTab === "InWork"}
        title={`In work(${info.inWork})`}
      >
      </Tab>
      <Tab
        className="status-button"
        type="button"
        onClick={(): void => {
          onSetStatus("completed")
          setActiveTab("Completed")
        }}
        isActive={activeTab === "Completed"}
        title={`Completed(${info.completed})`}
      >
      </Tab>
    </div>
  );
};

export default TaskFilters;