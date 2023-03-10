import { useState } from "react";

import GlobalStyles from "./components/styled/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './themes.js';

import Header from "./components/Header";

function App() {

// SET THEME
const [colorTheme, setColorTheme] = useState('light');

  function toggleTheme() {
    if (colorTheme === "dark") {
      setColorTheme('light');
    } else if (colorTheme === 'light') {
      setColorTheme('dark');
    }
  }



  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

    </>
    </ThemeProvider>
  );
}

export default App;
