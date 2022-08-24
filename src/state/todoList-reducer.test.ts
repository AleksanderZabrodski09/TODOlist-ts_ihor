import {FilterValuesType, TodoListPropsType} from '../App';
import {v1} from 'uuid';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './todoList-reducer';

test.skip('correct todoList should be remove', () => {


  let todoListID1 = v1();
  let todoListID2 = v1();

  const startState: Array<TodoListPropsType> = [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ]

  // const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST', todoListID: todoListID1})
  const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))


  expect(endState.length).toBe(1)
  expect(endState[0].todoListID).toBe(todoListID2)
})



test.skip('correct todolist should be added', () => {
  let todoListID1 = v1();
  let todoListID2 = v1();

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodoListPropsType> = [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ]

  const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})


test('correct todolist should change its name', () => {
  let todoListID1 = v1();
  let todoListID2 = v1();

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodoListPropsType> = [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ]

  // const action = {
  //   type: 'CHANGE-TODOLIST-TITLE',
  //   id: todoListID2,
  //   title: newTodolistTitle
  // }

  // const endState = todoListsReducer(startState, {
  //   type: 'CHANGE-TODOLIST-TITLE',
  //   todoListID: todoListID2,
  //   title: newTodolistTitle
  // })
  const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID2,newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let todoListID1 = v1();
  let todoListID2 = v1();


  let newFilter: FilterValuesType = 'completed'

  const startState: Array<TodoListPropsType> = [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ]



  const endState = todoListsReducer(startState, changeTodoListFilterAC(todoListID2,newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
