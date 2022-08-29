
import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TaskStateType, TodoListsType} from '../AppWithRedux';




// type AppRootState={
//   todoLists:Array<TodoListsType>
//   tasks:TaskStateType
// }

type AppRootState=ReturnType<typeof rootReducer>

const rootReducer=combineReducers({
  todoLists:todoListsReducer,
  tasks:tasksReducer
})


export const store=createStore(rootReducer)

// @ts-ignore
window.store=strore