import styled from "styled-components";

export const StyledColorInput = styled.div`
    border-radius: 1rem;
    box-shadow: 0 0 1rem ${({theme}) => theme.colors.boxShadow}50;
    width: 20rem;
    padding: 2rem 4rem;
    background: ${({theme}) => theme.colors.bgMain};
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -2rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 5;

    .color-options {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 1rem;
    }    

    @media (min-width: 768px) { 
        width: 30rem;
    }

`;