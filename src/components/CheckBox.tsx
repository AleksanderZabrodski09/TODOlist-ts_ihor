import React, {ChangeEvent} from 'react';

type CheckBoxType={
  checked:boolean
  callback:(eValue:boolean)=>void
}
// const onChangeHandler= (e: ChangeEvent<HTMLInputElement>) => {
//   changeCheckBoxHandler(t.id, e.currentTarget.checked)
// }
export const CheckBox = (props:CheckBoxType) => {

const onChangeHandler= (e: ChangeEvent<HTMLInputElement>) => {
  props.callback(e.currentTarget.checked)
}

  return (
    <input
      type="checkbox"
      checked={props.checked}
      onChange={onChangeHandler}/>
  );
};

