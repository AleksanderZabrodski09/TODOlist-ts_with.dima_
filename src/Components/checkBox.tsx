import React, {ChangeEvent} from 'react';



type CheckBox={
  checked:boolean
  callBack:(eValue:boolean)=>void
}


export const CheckBox = (props:CheckBox) => {
  const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
  props.callBack(e.currentTarget.checked)
  }

  return (
    <input type="checkbox"
           checked={props.checked}
           onChange={onChangeHandler}
           // checked={t.isDone}
           // onChange={(e)=>{onChangeBoxHandler(t.id, e.currentTarget.checked)}}
    />
  );
};

