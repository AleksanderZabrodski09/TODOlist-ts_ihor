import {TasksPropsType} from '../App';
import {addTaskAC, changeCheckBoxAC, editTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC} from './todoLists-reducer';

test('correct task should be removed', () => {
  const startState: TasksPropsType = {
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const endState = tasksReducer(startState, removeTaskAC('todoListID2', '2'))

  expect(endState).toEqual({
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
})


test('correct task should be added', () => {
  const startState: TasksPropsType = {
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  // let newTaskTitle = {id: '4', title: 'coffee', isDone: false}

  const endState = tasksReducer(startState, addTaskAC('todoListID2', 'coffee'))


  expect(endState['todoListID1'].length).toBe(3)
  expect(endState['todoListID2'].length).toBe(4)
  expect(endState['todoListID2'][0].id).toBeDefined()
  expect(endState['todoListID2'][0].title).toBe('coffee')
  expect(endState['todoListID2'][0].isDone).toBe(false)

})

test('status of specified task should be changed', () => {
  const startState = {
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const endState = tasksReducer(startState, changeCheckBoxAC('todoListID2', '2', false))


  expect(endState['todoListID2'][1].isDone).toBe(false)
  expect(endState['todoListID1'][1].isDone).toBe(true)
})

test('correct task should be its name', () => {
  const startState = {
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const endState = tasksReducer(startState, editTaskAC('todoListID2', '3', 'coffee'))


  expect(endState['todoListID2'][2].title).toBe('coffee')
  expect(endState['todoListID1'][2].title).toBe('React')
})

test('new array should be added when new todolist is added', () => {
  const startState = {
    'todoListID1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todoListID2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  // const action = addTodoListAC("new todolist");

  const endState = tasksReducer(startState, addTodoListAC("new todolist"))


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todoListID1" && k !== "todoListID2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
  const startState: TasksPropsType = {
    "todolistID1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistID2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = removeTodoListAC("todolistID2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistID2"]).not.toBeDefined();
});

