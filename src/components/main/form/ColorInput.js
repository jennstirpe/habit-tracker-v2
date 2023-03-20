import { useState } from "react"
import CloseBtn from "../../global/CloseBtn";
import { StyledColorInput } from "./../styled/form/ColorInput.styled"
import ColorInputOption from "./ColorInputOption";

export default function ColorInput({ closeColorInput, setSelectedColor }) {

    const [color, setColor] = useState("");

// set color state
    function setColorChoice(e) {
        const color = e.target.value;
        setColor(color);
    }

    function handleSetSelectedColor(e) {
        e.preventDefault()
        setSelectedColor(color)
    }


  return (
    <StyledColorInput>
        <CloseBtn closeFunction={closeColorInput} ariaLabel="Close color selector" />

        <div onChange={setColorChoice} className="color-options">
            <ColorInputOption value={"#d00000"} />
            <ColorInputOption value={"#e85d04"} />
            <ColorInputOption value={"#ffaa00"} />
            <ColorInputOption value={"#ffd300"} />
            <ColorInputOption value={"#a1ff0a"} />
            <ColorInputOption value={"#38b000"} />
            <ColorInputOption value={"#0a9396"} />
            <ColorInputOption value={"#90e0ef"} />
            <ColorInputOption value={"#147df5"} />
            <ColorInputOption value={"#580aff"} />
            <ColorInputOption value={"#9336fd"} />
            <ColorInputOption value={"#9381ff"} />
            <ColorInputOption value={"#d883ff"} />
            <ColorInputOption value={"#b5179e"} />
            <ColorInputOption value={"#f72585"} />
            <ColorInputOption value={"#ff758f"} />
        </div>

        <button onClick={handleSetSelectedColor} className="global-submit-btn">Select</button>

    </StyledColorInput>
  )
}
