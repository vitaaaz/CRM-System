import {ChangeEvent, useState} from "react";
import {addTask} from "../../api/api";
import {TodoRequest} from "../../types/todo";
import {Button, Form, Input} from "antd";

type AddTaskProps = {
  loadTasks: () => void;
}

const AddTask = (props: AddTaskProps) => {
  //принимаем функцию загрузки задач из пропса
  const {loadTasks} = props
  const [newTask, setNewTask] = useState<string>("")
  const [form] = Form.useForm();


  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function postNewTask() {
    const trimmedTitle: string = newTask.trim()

    const taskData: TodoRequest = {
      title: trimmedTitle,
      isDone: false,
    };
    //вызов запроса с методом PUT и обработка .then
    addTask(taskData)
      .then(() => {
        console.log("Задача добавлена и строка очищена");
        setNewTask("")
        form.resetFields();
        if (loadTasks) loadTasks()
      })
      .catch((error) => {
        console.error("Ошибка при добавлении задачи:", error);
        alert("Не удалось добавить задачу. Проверьте подключение к интернету.");
      });
  }

  return (
    <>
      <Form
        form={form}
        className="add-form"
        onFinish={postNewTask}
        initialValues={{remember: true}}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter new task!',
              validateTrigger: 'onSubmit'
            },
            {
              min: 3,
              max: 64,
              message: 'Задача должна быть от 3 до 64 символов.',
              validateTrigger: 'onSubmit',
            }
          ]}
        >
          <Input
            placeholder="Enter new task"
            value={newTask}
            onChange={handleInput}
            onPressEnter
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </>

  );
};

export default AddTask;