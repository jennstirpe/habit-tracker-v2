import { StyledHeader } from "./styled/Header.styled";
import ThemeToggler from "./ThemeToggler";

export default function Header({ colorTheme, toggleTheme }) {

  return (
    <StyledHeader>
        <ThemeToggler toggleTheme={toggleTheme} colorTheme={colorTheme} />
        
        <h1>HabiTracker</h1>

    </StyledHeader>
  )
}
