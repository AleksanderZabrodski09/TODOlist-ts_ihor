import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todoLists-reducer';
import {combineReducers,
  legacy_createStore} from 'redux';
import {TasksPropsType} from '../AppWithRedux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

// {
//   state:{
//     tasks:{}
//     todoLists:[]
//   }
//   getState()
//   dispatch()
//   subscribe()
// }