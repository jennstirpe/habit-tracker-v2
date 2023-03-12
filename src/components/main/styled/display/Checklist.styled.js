import styled from "styled-components";

export const StyledChecklist = styled.section`
    border-radius: 1rem;
    background: ${({theme}) => theme.colors.bgSecondary};
    margin: 2rem;
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;

    .checklist-habit {
        border: none;
        font-size: 1rem;
        border-radius: 1.5rem;
        padding: 1rem 1.5rem;
        margin: .5rem;
        color: #fff;
        transition: all 150ms linear;

        &:hover {
            cursor: pointer;
            opacity: .85;
        }
    }

    .checklist-streak-btn {
        border: none;
        background: none;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        padding: .5rem;
        text-transform: uppercase;
        color: ${({theme}) => theme.colors.accentMain}50;
        transition: all 150ms linear;

        &:hover {
            cursor: pointer;
            color: ${({theme}) => theme.colors.accentMain};
        }
    }

    .checklist-qty-form {
        background: ${({theme}) => theme.colors.bgSecondary};
        border-radius: .5rem;
        box-shadow: 0 0 2rem ${({theme}) => theme.colors.boxShadow}50;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: -1rem;

        .checklist-qty-form-header {
            font-size: 2rem;
            margin: 1rem 0;
            text-transform: uppercase;
        }

        .checklist-qty-form-label {
            padding: 1rem;
            border-radius: .5rem;
            margin-bottom: 1rem;

            input {
                width: 9rem;
                margin-right: 1rem;
            }
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number]{
        -moz-appearance: textfield;
    }
`;