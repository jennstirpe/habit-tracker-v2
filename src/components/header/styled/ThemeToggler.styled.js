import styled from "styled-components";

export const StyledToggler = styled.div`
    position: absolute;
    right: 1rem;
    top: 0rem;
    
    #theme-toggler {
        height: 1.25rem;
        width: 2.5rem;
        border-radius: 1rem;
        border: 1px solid ${({theme}) => theme.colors.accentMain};
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;

        &:hover {
            cursor: pointer;
        }

        #sun, #moon {
            height: .7rem;
            margin: 0 .25rem;
            color: ${({theme}) => theme.colors.accentMain};
        }

        #toggle {
            height: 1.1rem;
            width: 1.1rem;
            border-radius: 50%;
            position: absolute;
            left: 0;
            background: ${({theme}) => theme.colors.accentMain};
            border: 1px solid white;
            transition: transform 250ms linear;
        }

        .light {
            transform: translateX(1.25rem);
        }

        .dark {
            transform: translateX(0);
        }
    }
`;