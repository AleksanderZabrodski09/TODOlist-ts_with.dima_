import {
  AddTodolistAC, ChangeTodoListFilterAC,
  ChangeTodoListFilterActionType,
  ChangeTodoListTitleAC,
  RemoveTodolistAC,
  todoListsReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../App';

test('correct todoList should be removed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListsType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  // const endState = todoListsReducer(startState, {
  //   type: 'REMOVE-TODOLIST',
  //   id: todoListId1
  // })
  const endState = todoListsReducer(startState,RemoveTodolistAC(todoListId1) )

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});


test('correct todoList should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New todoList";

  const startState: Array<TodoListsType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  // const endState = todoListsReducer(startState, {
  //   type: 'ADD-TODOLIST',
  //   title: newTodoListTitle})
  const endState = todoListsReducer(startState, AddTodolistAC(newTodoListTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todoList should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTitle = "New TodoList";

  const startState: Array<TodoListsType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]

  const action = ChangeTodoListTitleAC(todoListId2,newTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListsType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
  ]

  const action = ChangeTodoListFilterAC(todoListId2,newFilter);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
