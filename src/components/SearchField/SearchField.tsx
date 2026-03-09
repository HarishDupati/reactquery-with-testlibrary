import { useQuery } from "@tanstack/react-query";
import { Input } from "../Input/Input";
import { fetchByKeyword } from "../../api/products";
import { useState, type ChangeEvent } from "react";

export default function SearchField({onSearchChange}) {
  const [keyword, setKeyword] = useState<string>('')
  // const {data, isLoading, isError, error} = useQuery({
  //   queryKey: ['search', 'product', keyword],
  //   queryFn: () => fetchByKeyword(keyword),
  //   // enabled: !!keyword
  // })
  // console.log('isLoading: ', isLoading);
  // console.log('data: ', data);

  const changeHandler = (e: ChangeEvent) => {
    setKeyword(e.target.value);
    onSearchChange(e.target.value)
  }

  return (
    <div>
      <Input value={keyword} changeHandler={changeHandler} />
    </div>
  )
}
