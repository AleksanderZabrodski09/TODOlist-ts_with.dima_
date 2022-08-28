import {addTodolistAC, todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TaskStateType, TodoListsType} from '../App';

test('ids should be equals', () => {
  const startTasksState: TaskStateType = {};
  const startTodoListsState: Array<TodoListsType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.todoListId);
  expect(idFromTodoLists).toBe(action.todoListId);
});
