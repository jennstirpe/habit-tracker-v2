import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        padding: 1rem;
        font-family: ${({theme}) => theme.fonts.mainText};
        height: 100vh;
        width: 100vw;
        min-width: 22rem;
        background: ${({theme}) => theme.colors.bgMain};
        color: ${({theme}) => theme.colors.textMain};
        display: flex;
        flex-direction: column;
        align-items: center;
        
        p, span, button, a {
            font-weight: ${({theme}) => theme.fonts.weights.body};
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: ${({theme}) => theme.fonts.headerText};
            font-weight: ${({theme}) => theme.fonts.weights.headers};
        }
    }
`;

export default GlobalStyles;