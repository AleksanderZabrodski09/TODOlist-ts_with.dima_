import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TaskStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todoLists-reducer';

let startState: TaskStateType

beforeEach(()=>{
  startState = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };
})



test('correct task should be deleted from correct array', () => {


  const action = removeTaskAC("todolistId2", "2");

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false }
    ]
  });

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every(t=>t.id!="2")).toBeTruthy();
  // expect(endState["todolistId1"][0].id).toBe("1")
  // expect(endState["todolistId2"][1].id).toBe("3")

});
test('correct task should be added to correct array', () => {


  const action = addTaskAC("todolistId2", "juce");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {


  const endState = tasksReducer(startState, changeTaskStatusAC("todolistId2", "2", false))

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);

});

test('title of specified task should be changed', () => {



  const endState = tasksReducer(startState, changeTaskTitleAC("todolistId2", "3", 'coffee'))

  expect(endState["todolistId2"][2].title).toBe('coffee');
  expect(endState["todolistId1"][2].title).toBe("React");

});


test('new array should be added when new todolist is added', () => {


  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});


test.skip('property with todolistId should be deleted', () => {




  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
