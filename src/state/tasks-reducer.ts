import {TasksPropsType} from '../App';
import {v1} from 'uuid';
import {addTodoListACType, removeTodoListACType} from './todoLists-reducer';


const initialState: TasksPropsType ={}


export const tasksReducer = (state=initialState, action: tasksReducerType): TasksPropsType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      //setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== TaskId)})
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(t => t.id !== action.payload.taskID)
      }
    }
    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
      return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
      }
    }
    case 'CHANGE-TASK-BOX': {
      return {...state,
        [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.value} : t)
      }
    }
    case 'EDIT-TASK':{
      return {...state,
        [action.payload.todoListID]: state[action.payload.todoListID].map(t => t.id === action.payload.taskID ? {...t, title: action.payload.title} : t)
      }
    }
    case 'ADD-TODOLIST':{
      // let newTodoListID=v1();
      let newTodoListID=action.payload.todoListID;
      return {...state,
        [newTodoListID]:[]
      }
    }
    case 'REMOVE-TODOLIST':{
      delete state[action.payload.todoListID]
      return {...state}
    }
    // 2 method---
    // case 'REMOVE-TODOLIST':{
    //   let {[action.payload.todoListID]:[],...rest} = {...state}
    //   return rest
    // }
    default:
      // throw new Error('I don\'t understand this type')
      return state
  }
}


type tasksReducerType = removeTaskACType | addTaskACType | changeCheckBoxACType|editTaskACType|addTodoListACType|removeTodoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeCheckBoxACType = ReturnType<typeof changeCheckBoxAC>
type editTaskACType = ReturnType<typeof editTaskAC>


export const removeTaskAC = (todoListID: string, taskID: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todoListID, taskID
    }
  } as const
}

export const addTaskAC = (todoListID: string, newTaskTitle: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todoListID, newTaskTitle
    }
  } as const
}
export const changeCheckBoxAC = (todoListID: string, taskID: string, value: boolean) => {
  return {
    type: 'CHANGE-TASK-BOX',
    payload: {
      todoListID, taskID, value
    }
  } as const
}

export const editTaskAC=(todoListID: string, taskID: string, title: string)=>{
  return{
    type:'EDIT-TASK',
    payload:{
      todoListID,taskID,title
    }
  }as const
}

