import {FilterValuesType, TaskStateType, TodoListsType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from './todoLists-reducer';

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
const initialState:TaskStateType={
  [todoListId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ],
  [todoListId2]: [
    {id: v1(), title: "Book", isDone: true},
    {id: v1(), title: "Pen", isDone: false}
  ],

}


export const tasksReducer = (state: TaskStateType= initialState, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {

      //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== TaskId)})

      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.idTask)}

    }
    case 'ADD-TASK': {
      let newTask = {id: "3", title: action.title, isDone: false}

      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      //setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, isDone: value} : el)})

      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.idTask ? {
          ...t,
          isDone: action.payload.value
        } : t)
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
      // delete tasksObj[todoListId];
      //     setTasks({...tasksObj})
      delete state[action.id]
      return  {...state}

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




