import { useState } from "react";

export const Input = () => {
  const [value, setValue] = useState('')

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return <div>
    <input type="text" role="textbox" value={value} onChange={changeHandler}></input>

  </div>;
};
