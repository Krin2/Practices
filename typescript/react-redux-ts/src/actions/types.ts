import { FetchTodosActions, DeleteTodoAction } from "./todo";

export enum ActionTypes {
  fetchTodos,
  deleteTodo
}

export type Action = FetchTodosActions | DeleteTodoAction;