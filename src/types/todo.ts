interface TodoRequest {
  title?: string;
  isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
}

// или так type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

type Status = "all" | "completed" | "inWork"

export type {
  TodoRequest,
  Todo,
  TodoInfo,
  MetaResponse,
  Status
}