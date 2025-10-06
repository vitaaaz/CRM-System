import {Status, TodoRequest} from "../types/todo";
import api from './axiosInstance'
import {AuthData, Token, UserRegistration} from "@/types/authorization";

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

// ниже запросы для авторизации и регистрации

//регистрация нового пользователя
export const signUp = (signUpReqBody: UserRegistration) => {
  return api.post('/auth/signup', signUpReqBody)
}

//авторизация(аутенфикация)
export const signIn = (signInReqBody: AuthData) => {
  return api.post('/auth/signin', signInReqBody)
}

export const getTokens = (token : any) => {
  return api.post('/auth/refresh', token)
}

export const logout = () => {
  return api.post('/user/logout')
}

export const userProfile =() => {
  return api.get('/user/profile')
}



