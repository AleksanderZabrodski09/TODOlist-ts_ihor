import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
  title: string
  callBack:(newTitle:string)=>void
}
export const EditableSpan = (props: EditableSpanType) => {


  const [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState(props.title)

  const changeEditHandler=()=>{
    setEditMode(!editMode)
  }

  const addTask = () => {
    if (newTitle.trim() !== '') {
      props.callBack(newTitle.trim());
      // setNewTitle("");
    }
  }

  const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    setNewTitle(e.currentTarget.value)
    addTask()
  }

  return (
    editMode
      ? <input onChange={onChangeHandler} autoFocus onBlur={changeEditHandler} value={newTitle}/>
      : <span onDoubleClick={changeEditHandler} >{props.title}</span>

  );
};

