import styled from "styled-components";

export const StyledHeader = styled.header`
    border-bottom: 1px solid ${({theme}) => theme.colors.accentMain}75;
    padding: .5rem;
    position: relative;

    h1 {
        font-size: 4.5rem;
        font-weight: 700;
        color: ${({theme}) => theme.colors.accentMain};
    }

    span {
        color: ${({theme}) => theme.colors.accentMain}90;
    }
`;