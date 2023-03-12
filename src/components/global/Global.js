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


        .global-close-btn {
            font-size: 1.25rem;
            color: ${({theme}) => theme.colors.accentMain};
            background: none;
            border: none;
            transition: all 200ms linear;

            &:hover {
                cursor: pointer;
                color: ${({theme}) => theme.colors.accentMain}50;
            }
        }

        .global-submit-btn {
            margin-top: .75rem;
            font-size: 1.25rem;
            padding: .75rem;
            border-radius: .5rem;
            border: 2px solid ${({theme}) => theme.colors.textMain}25;
            background: ${({theme}) => theme.colors.accentMain}25;
            color: ${({theme}) => theme.colors.textMain}85;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 150ms linear;

            &:hover {
                cursor: pointer;
                background: ${({theme}) => theme.colors.accentMain}95;
                color: #fff;
                box-shadow: 0 0 1.5rem ${({theme}) => theme.colors.bgMain}50;
            }
        }

        .global-edit-btn {
            margin-left: auto;
            height: 2.5rem;
            width: 2.5rem;
            background: none;
            border: none;
                    
            svg {
                height: 1.4rem;
                width: 1.4rem;

                path {
                    fill: ${({theme}) => theme.colors.textMain}50;
                    transition: all 200ms linear;
                }
            }

            &:hover {
                cursor: pointer;

                svg {
                    path {
                        fill: ${({theme}) => theme.colors.accentMain};
                    }
                }
            }
        }
    }
`;

export default GlobalStyles;