import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const TasksReducer = (state: TaskType[], action: allACType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      // let filteredTasks = tasks.filter(t => t.id !== id);
      return state.filter(el => el.id !== action.payload.id)
    }
    case 'ADD-TASK':{
      let newTask = {id: v1(), title: action.payload.title, isDone: false};
      // let newTasks = [newTask, ...tasks];

      return
    }
    // default: return console.log('everything failed!')
    default:
      return [newTask, ...state]
  }
}

type allACType = removeTaskACType | addTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: id,
      todoListId: todoListId
    }
  } as const
}

type addTaskACType=ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {title, todoListId}
  } as const
}