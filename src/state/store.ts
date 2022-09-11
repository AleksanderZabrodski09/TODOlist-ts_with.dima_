
import {combineReducers, compose, legacy_createStore} from 'redux';
import {todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


// type AppRootState={
//   todoLists:Array<TodoListsType>
//   tasks:TaskStateType
// }

export type AppRootState=ReturnType<typeof rootReducer>

const rootReducer=combineReducers({
  todoLists:todoListsReducer,
  tasks:tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store=legacy_createStore(rootReducer,composeEnhancers())

// @ts-ignore
window.store=store