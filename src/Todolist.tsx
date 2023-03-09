import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Task} from './Task';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  filter: string
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
  // console.log('Todolist is called')
  const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoListId])
  const dispatch = useDispatch()

  // console.log({tasksObj})

  // const changeCheckBox = (todoListId: string, idTask: string, eValue: boolean) => {
  //   dispatch(changeTaskStatusAC(todoListId, idTask, eValue))
  // }
  // const changeTaskTitle = (todoListId: string, idTask: string, newTitle: string) => {
  //   dispatch(changeTaskTitleAC(todoListId, idTask, newTitle))
  // }
  // const addTask = (todoListId: string, title: string) => {
  //
  // }
  // function removeTask(todoListId: string, idTask: string) {
  //   // const action=removeTaskAC(todoListId,idTask);
  //   // dispatchToTasksReducer(action);
  //   dispatch(removeTaskAC(todoListId, idTask));
  // }

  const addTask = useCallback((title: string) => dispatch(addTaskAC(props.todoListId, title)), [props.todoListId])

  const onClickRemoveTaskHandler = useCallback((tID: string, ) => dispatch(removeTaskAC(tID, props.todoListId)), [dispatch]);

  const onChangeTitleHandler = useCallback(( idTask: string, newValue: string) => dispatch(changeTaskTitleAC(props.todoListId, idTask, newValue)), [dispatch])

  const onChangeCheckBoxHandler = useCallback(( idTask: string, eValue: boolean) => dispatch(changeTaskStatusAC(props.todoListId, idTask, eValue)), [dispatch])


  const onAllClickHandler = useCallback(() => {
    props.changeFilter(props.todoListId, "all")
  }, [props.todoListId, props.changeFilter]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter(props.todoListId, "active")
  }, [props.todoListId, props.changeFilter]);
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter(props.todoListId, "completed")
  }, [props.todoListId, props.changeFilter]);


  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
  }
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.todoListId, newTitle)
  }

  let tasksForTodolist = tasksObj;
  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
  }

  return <div>
    <h3>
      <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
      <IconButton onClick={removeTodoListHandler}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>

    <ul>
      {
        tasksForTodolist.map((t) => {
            // console.log('Task')
          return  <Task
            key={t.id}
            removeTask={onClickRemoveTaskHandler}
            changeTaskStatus={onChangeCheckBoxHandler}
            changeTaskTitle={onChangeTitleHandler}
            task={t}
            // todoListId={props.todoListId}
          />
        }

          // <li key={t.id} className={t.isDone ? 'isDone' : ''}>
          //   <CheckBox
          //     checked={t.isDone}
          //     callback={(eValue) => onChangeCheckBoxHandler(props.todoListId, t.id, eValue)}
          //   />
          //   <EditableSpan title={t.title}
          //                 onChange={(newValue) => onChangeTitleHandler(props.todoListId, t.id, newValue)}/>
          //   <IconButton onClick={() => onClickRemoveTaskHandler(props.todoListId, t.id)} size="small">
          //     <Delete fontSize="small"/>
          //   </IconButton>
          // </li>
        )
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
        All
      </Button>
      <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
              onClick={onActiveClickHandler}>
        Active
      </Button>
      <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
              onClick={onCompletedClickHandler}>
        Completed
      </Button>
    </div>
  </div>
});


