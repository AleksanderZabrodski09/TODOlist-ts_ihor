import {FilterValuesType, TasksPropsType, TodoListPropsType} from '../App';
import {v1} from 'uuid';

const initialState: Array<TodoListPropsType> =[]


export const todoListsReducer = (state=initialState, action: todoListsReducerType):Array<TodoListPropsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.todoListID !== action.payload.todoListID)
    }
    case 'ADD-TODOLIST': {
      // let newTodoListID=v1();
      let newTodoListID = action.payload.todoListID
      let newTodoList: TodoListPropsType = {todoListID: newTodoListID, title: action.payload.newTodolistTitle, filter: 'all'};
      return [...state, newTodoList]
    }
    case 'CHANGE-TODOLIST-TITLE':{
      return state.map(tl=>tl.todoListID===action.payload.todoListID ? {...tl, title: action.payload.newTodolistTitle}:tl)
    }
    case 'CHANGE-TODOLIST-FILTER':{
      return state.map(tl=>tl.todoListID===action.payload.todoListID? {...tl, filter: action.payload.newFilter}:tl)
    }

    default:
      // throw new Error('I don\'t understand this type')
      return state
  }
}


// type RemoveTodoListActionType = {
//   type: 'REMOVE-TODOLIST'
//   id: string
// }
// export const RemoveTodolistAC = (todoListId: string): RemoveTodoListActionType => {
//   return {
//     type: 'REMOVE-TODOLIST', id: todoListId
//   }
// }

export type todoListsReducerType = removeTodoListACType | addTodoListACType|changeTodoListTitleACType | changeTodoListFilterACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type changeTodoListTitleACType=ReturnType<typeof changeTodoListTitleAC>
export type changeTodoListFilterACType=ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todoListID: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todoListID}
  }as const
}

export const addTodoListAC = (newTodolistTitle: string) => {

  return {
    type: 'ADD-TODOLIST',
    payload: {newTodolistTitle, todoListID:v1()}
  }as const
}



export const changeTodoListTitleAC=(todoListID:string, newTodolistTitle: string)=>{
  return{
    type: 'CHANGE-TODOLIST-TITLE',
    payload:{todoListID, newTodolistTitle}
  }as const
}
export const changeTodoListFilterAC=(todoListID:string, newFilter: FilterValuesType)=>{
  return{
    type: 'CHANGE-TODOLIST-FILTER',
    payload:{todoListID, newFilter}
  }as const
}
