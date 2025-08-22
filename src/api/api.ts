import {MetaResponse, Todo, TodoInfo, TodoRequest} from "../types/todo";
const BASE_URL = 'https://easydev.club/api/v1/todos';

//загрузка задач с сервера
export const fetchTasks = (status: "all" | "completed" | "inWork"): Promise<MetaResponse<Todo, TodoInfo>> => {
  return fetch(`${BASE_URL}?filter=${status}`,
    {method: 'GET'},)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response error: !ok`);
      }
      return response.json();
    })
    .catch(error => {
      console.error("Ошибка загрузки данных:", error);
      throw error;
    });
}

// Добавление задачи
export const addTask = (taskData: TodoRequest): Promise<Response> => {
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response error: !ok`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    });
};

// Удаление задачи
export const deleteTask = (taskId: number): Promise<Response> => {
  return fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
  }).catch((error) => {
    console.error('Ошибка при удалении задачи:', error);
    throw error;
  });
};

// Изменение данных о задаче (статус задачи или текст)
export const changeTaskData = (id: number, taskData: TodoRequest): Promise<Response> => {
  return fetch(`${BASE_URL}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(taskData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Response error: !ok`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при изменения статуса задачи:', error);
      throw error;
    });
}

