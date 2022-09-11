import { TaskStateType} from '../AppWithRedux';
import {AddTodoListActionType, RemoveTodoListActionType} from './todoLists-reducer';
import {v1} from 'uuid';

// type ActionType = {
//   type: string
//   [key: string]: any
// }

export type ActionsType =
  RemoveTaskACType
  | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodoListActionType | RemoveTodoListActionType

type RemoveTaskACType = {
  type: 'REMOVE-TASK'
  todoListId: string
  idTask: string
}
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = {
  type: 'CHANGE-TASK-TITLE', payload: {
    todoListId: string
    idTask: string,
    title: string
  }
}
const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.idTask)}

    }
    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      // const stateCopy = {...state}
      // let tasks=stateCopy[action.payload.todoListId];
      // stateCopy[action.payload.todoListId]=tasks.map(t => t.id === action.payload.idTask ? {
      //       ...t,
      //       isDone: action.payload.value
      //     } : t)
      // return stateCopy
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.idTask ? {...t, isDone: action.payload.value} : t)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.idTask ? {
          ...t,
          title: action.payload.title
        } : t)
      }
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.todoListId]: []}
    }
    case 'REMOVE-TODOLIST': {

      delete state[action.id]
      return {...state}

    }

    default:
      return state
    // throw new Error("I don't understand this type")
  }

}

export const removeTaskAC = (todoListId: string, idTask: string): RemoveTaskACType => {
  return {
    type: 'REMOVE-TASK',
    todoListId,
    idTask
  } as const
}


export const addTaskAC = (todoListId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    todoListId,
    title
  } as const
}


export const changeTaskStatusAC = (todoListId: string, idTask: string, value: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {todoListId, idTask, value}
  } as const
}


export const changeTaskTitleAC = (todoListId: string, idTask: string, title: string): changeTaskTitleACType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {todoListId, idTask, title}
  } as const
}
// export const addTodolistAC = (todoListId: string, idTask: string, title: string): changeTaskTitleACType => {
//   return {
//     type: 'CHANGE-TASK-TITLE',
//     payload: {todoListId, idTask, title}
//   } as const
// }




