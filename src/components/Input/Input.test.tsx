import { fireEvent, render, screen } from "@testing-library/react"
import { Input } from "./Input"

describe("Input field tests", () => {
  test("Input - check if field is present", () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  
  test("Input - can enter text in the field", () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, {
      target: {value: 'asdasd'}
    })
    expect(inputElement).toHaveValue('asdasd')
  })
}) 