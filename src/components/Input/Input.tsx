import { useState, type ChangeEvent } from "react";

interface InputProps {
  value: string,
  changeHandler: (e: ChangeEvent) => void
}

export const Input = ({value, changeHandler}: InputProps) => {
  // const [value, setValue] = useState('')

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }
  return <div className="w-full mb-3">
    <input 
      type="text" 
      role="textbox" 
      value={value} 
      onChange={changeHandler}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-all duration-200 placeholder:text-gray-400"
      placeholder="Enter text..."
    />
  </div>;
};
