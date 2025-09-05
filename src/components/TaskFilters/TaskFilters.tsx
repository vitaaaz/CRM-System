import './TaskFilters.css'
import {Status, TodoInfo} from "@/types/todo";
import {Tabs, TabsProps} from "antd";


type TaskFiltersProps = {
  onSetStatus: (status: Status) => void;
  info: TodoInfo;
}

const TaskFilters = (props: TaskFiltersProps) => {
  const {
    onSetStatus,
    info,
  } = props

  const onChange = (key: string) => {
    if (key === "all" || key === "completed" || key === "inWork") {
      onSetStatus(key as Status);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `ALL(${info.all})`,
    },
    {
      key: 'inWork',
      label: `IN WORK(${info.inWork})`,
    },
    {
      key: 'completed',
      label: `COMPLETED(${info.completed})`,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>

  );
};

export default TaskFilters;