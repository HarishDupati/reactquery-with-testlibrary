import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { Input } from "./Input"

// Test wrapper component that manages state
const InputTestWrapper = () => {
  const [value, setValue] = useState("")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  return <Input value={value} changeHandler={handleChange} />
}

describe("Input field tests", () => {
  test("Input - check if field is present", () => {
    render(<Input value="" changeHandler={() => {}}/>)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  
  test("Input - can enter text in the field", () => {
    render(<InputTestWrapper />)
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'asdasd'}
    })
    expect(inputElement).toHaveValue('asdasd')
  })
}) 