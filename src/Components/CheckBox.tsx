import React, {ChangeEvent} from 'react';
import {Checkbox} from '@material-ui/core';


type CheckBoxType = {
  checked: boolean
  callback: (eValue:boolean) => void
}


export const CheckBox = (props: CheckBoxType) => {

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    props.callback(e.currentTarget.checked)
  }
  return (
    <Checkbox
      // type="checkbox"
      size="small"
      checked={props.checked}
      onChange={onChangeHandler}
    />
  );
};

