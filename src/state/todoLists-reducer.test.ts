import {FilterValuesType, TodoListPropsType} from '../App';
import {v1} from 'uuid';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './todoLists-reducer';

let todoListID1 : string;
let todoListID2 : string;

let startState: Array<TodoListPropsType>

beforeEach(()=>{
   todoListID1 = v1();
   todoListID2 = v1();

 startState = [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ]
})

test.skip('correct todoList should be remove', () => {


  const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))


  expect(endState.length).toBe(1)
  expect(endState[0].todoListID).toBe(todoListID2)
})



test.skip('correct todolist should be added', () => {


  let newTodolistTitle = 'New Todolist'


  const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})


test.skip('correct todolist should change its name', () => {


  let newTodolistTitle = 'New Todolist'


  const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID2,newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test.skip('correct filter of todolist should be changed', () => {

  let newFilter: FilterValuesType = 'completed'


  const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListID2,newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
