import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

// type ActionType = {
//   type: string
//   [key: string]: any
// }


export type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  todoListId:string
  title: string

}
export type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}
export type ActionsType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType


export let todoListId1 = v1();
export let todoListId2 = v1();
const initialState: Array<TodoListsType>= [
  {id: todoListId1, title: "What to learn", filter: 'all'},
  {id: todoListId2, title: "What to buy", filter: 'all'},
]

export const todoListsReducer = (state: Array<TodoListsType>= initialState, action: ActionsType): Array<TodoListsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: action.todoListId,
        title: action.title,
        filter: "all"
      }]
    }

    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
      // const todoList = state.find(tl => tl.id === action.id);
      // if (todoList) {
      //   todoList.title = action.title;
      // }
      // return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      // const todoList = state.find(tl => tl.id === action.id);
      // if (todoList) {
      //   todoList.filter = action.filter;
      // }
      // return [...state]AddTodoListActionType
    }
    default:
      return state
      // throw new Error("I don't understand this type")
  }

}

export const removeTodolistAC = (todoListId: string): RemoveTodoListActionType => {
  return {
    type: 'REMOVE-TODOLIST', id: todoListId
  }
}
export const addTodolistAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD-TODOLIST', todoListId: v1(), title}
}
export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter}
}


