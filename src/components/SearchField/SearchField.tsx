import { Input } from "../Input/Input";
import { useState, type ChangeEvent } from "react";
import type { ISearchField } from "./types";



export default function SearchField({onSearchChange}: ISearchField) {
  const [keyword, setKeyword] = useState<string>('')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    onSearchChange(e.target.value)
  }

  return (
    <div>
      <Input value={keyword} changeHandler={changeHandler} />
    </div>
  )
}
