import {TasksPropsType, TodoListPropsType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {addTodoListAC, todoListsReducer} from './todoLists-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksPropsType = {};
  const startTodolistsState: Array<TodoListPropsType> = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].todoListID;

  expect(idFromTasks).toBe(action.payload.todoListID);
  expect(idFromTodolists).toBe(action.payload.todoListID);
});
