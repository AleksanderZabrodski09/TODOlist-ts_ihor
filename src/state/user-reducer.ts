import React from 'react';


type StateType = {
  age: number
  childrenCount: number
  name: string
}

type ActionType = {
  type: string
  [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      // let newState={...state}
      // newState.age= state.age + 1
      // return newState
      return {...state, age: state.age + 1}

    case 'INCREMENT-CHILDREN-COUNT':
      return {...state, childrenCount: state.childrenCount + 1}
    //   state.childrenCount = state.childrenCount + 1
   case 'INCREMENT-NAME':
      return {...state, name: action.newName}


    default:
      throw new Error('I don\'t understand this type')
  }
}

