import { useState } from "react";
import SearchField from "../../components/SearchField/SearchField";
import ProductContainer from "../ProductContainer";

export default function ProductsPage() {
    const [keyword, setKeyword] = useState<string>('')
  
  const searchChangeHandler = (value: string) => {
    setKeyword(value)
  }
  return (
    <div>
      <SearchField onSearchChange={searchChangeHandler} />
      <ProductContainer keyword={keyword}/>
    </div>
  )
}
