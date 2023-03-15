import { StyledColorInputOption } from "../styled/form/ColorInputOption.styled"

export default function ColorInputOption({ value }) {
  return (
    <StyledColorInputOption>
        <input type="radio" name="color" value={value} className="color-option-input"></input>
        <span className="color-selected"></span>
    </StyledColorInputOption>
  )
}
