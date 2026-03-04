import { render } from "@testing-library/react"
import Button from "./Button"

describe('Button tests', () => {
  test('button - snapshot test', () => {
    const {asFragment} = render(<Button onClick={() => {}} label="test button" />)
    expect(asFragment()).toMatchSnapshot();
  })
})