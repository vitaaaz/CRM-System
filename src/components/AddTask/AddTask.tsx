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

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function postNewTask(/*e: FormEvent<HTMLFormElement>*/) {
    /* e.preventDefault()*/
    const trimmedTitle: string = newTask.trim()
    /*   if (!trimmedTitle) {
         alert("Задача не может быть пустой!");
         return;
       }

       if (trimmedTitle.length <= 2) {
         alert("Требуется ввести от 2 до 64 символов");
         return;
       }

       if (trimmedTitle.length > 64) {
         alert(`Требуется ввести от 2 до 64 символов. Вы ввели ${trimmedTitle.length}`);
         return;
       }*/

    const taskData: TodoRequest = {
      title: trimmedTitle,
      isDone: false,
    };
    //вызов запроса с методом PUT и обработка .then
    addTask(taskData)
      .then(() => {
        console.log("Задача добавлена и строка очищена");
        setNewTask("")
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