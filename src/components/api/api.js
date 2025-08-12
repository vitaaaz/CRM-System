const BASE_URL = 'https://easydev.club/api/v1/todos';

//загрузка задач с сервера
export const fetchTasks = (query) => {
  return fetch(`${BASE_URL}?${query}`,
    {method: 'GET'},)
    .then(response => {
     if (!response.ok) throw new Error(`Response error: !ok`);
     return response.json();
    })
    .catch(error => {
      console.error("Ошибка загрузки данных:", error);
      throw error;
    });
}

// Добавление задачи
export const addTask = (taskData) => {
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (!response.ok) throw new Error(`Response error: !ok`);
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении задачи:', error);
      throw error;
    });
};

// Удаление задачи
export const deleteTask = (taskId) => {
  return fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
  }).catch((error) => {
    console.error('Ошибка при удалении задачи:', error);
    throw error;
  });
};

// Управление чекбоксом(статус задачи)
export const checkboxTask = (id, taskStatus) => {
  return fetch(`${BASE_URL}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(taskStatus),
    })
    .then(response => {
      if (!response.ok) throw new Error(`Response error: !ok`);
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при изменения статуса задачи:', error);
      throw error;
    });
}

// Сохранение задачи(ред) и отправка на сервер методом put
export const saveEditingTask = (editIdTask, putTaskData) => {
  return fetch(`https://easydev.club/api/v1/todos/${editIdTask}`,
    {
      method: 'PUT',
      body: JSON.stringify(putTaskData),
    })
    .then(response => {
      if (!response.ok) throw new Error(`Response error: !ok`);
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании задачи:', error);
      throw error;
    });
}
