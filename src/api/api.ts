import {Status, TodoRequest} from "../types/todo";
import api from './axiosInstance'

export const fetchTasks = (status: Status) => {
  return api.get('/todos', {
    params: {
      filter: status,
    }
  })
}

export const addTask = (taskData: TodoRequest) => {
  return api.post('/todos', taskData)
}

export const deleteTask = (taskId: number) => {
  return api.delete(`/todos/${taskId}`)
}

export const changeTaskData = (id: number, taskData: TodoRequest) => {
  return api.put(`/todos/${id}`, taskData)
}

// const BASE_URL = 'https://easydev.club/api/v1/todos';
//загрузка задач с сервера через axios
/*export const fetchTasks = (status: "all" | "completed" | "inWork") => {
  return axios.get(`${BASE_URL}?filter=${status}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Response error: !ok`);
      }
      return response;
    })
    .catch(error => {
      console.error("Ошибка загрузки данных:", error);
      throw error;
    });
}*/

// Добавление задачи через axios
/*export const addTask = (taskData: TodoRequest) => {
  return axios.post(BASE_URL, taskData)
    .then(response => {
      console.log(response)
      if (response.status !== 200) {
        throw new Error(`Response error: !ok`);
      }
    })
    .catch((error) => {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    });
}*/

// Удаление задачи через axios
/*export const deleteTask = (taskId: number) => {
  return axios.delete(`${BASE_URL}/${taskId}`)
    .catch((error) => {
    console.error('Ошибка при удалении задачи:', error);
    throw error;
  });
};*/


// Изменение данных о задаче (статус задачи или текст) через axios
/*export const changeTaskData = (id: number, taskData: TodoRequest) => {
  return axios.put(`${BASE_URL}/${id}`, taskData)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Response error: !ok`);
      }
      return response;
    })
    .catch((error) => {
      console.error('Ошибка при изменения статуса задачи:', error);
      throw error;
    });
}*/
