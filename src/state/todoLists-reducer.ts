import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

// type ActionType = {
//   type: string
//   [key: string]: any
// }


type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
type ChangeTodoListTitleActionType = {
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

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: v1(),
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
      return  state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
      // const todoList = state.find(tl => tl.id === action.id);
      // if (todoList) {
      //   todoList.filter = action.filter;
      // }
      return [...state]
    }
    default:
      throw new Error("I don't understand this type")
  }

}


