import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';



type CheckBox={
  checked:boolean
  callBack:(eValue:boolean)=>void
}


export const CheckBox = (props:CheckBox) => {
  const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
  props.callBack(e.currentTarget.checked)
  }

  return (
    // <input type="checkbox"
    //        checked={props.checked}
    //        onChange={onChangeHandler}
    // />
  <Checkbox
    checked={props.checked}
    onChange={onChangeHandler}
    size='small'
    color='success'
  />
  );
};

