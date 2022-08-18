import React, {ChangeEvent, useState} from 'react';


type EditableSpanType = {
  value: string
  callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

  let [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState(props.value)

  const addTask =()=>{
    if(newTitle.trim()!==''){
      props.callBack(newTitle.trim());
    }
  }

  const activateEditMode = () => {
    setEditMode(true)
    // setNewTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    // props.callBack(newTitle)

  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    addTask()
  }

  return editMode
    ? <input value={props.value} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.value}</span>

};

