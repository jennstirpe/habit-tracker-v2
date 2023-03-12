import styled from "styled-components";

export const StyledEditHabitForm = styled.div`
    box-shadow: 0 0 1.5rem ${({theme}) => theme.colors.boxShadow}50;
    border-radius: .5rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 22.5rem;
    background: ${({theme}) => theme.colors.bgSecondary};

    .edit-details {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;


        .edit-details-group {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: .75rem;
        }

        .qty-edit-label {
            input {
                margin-left: .5rem;
            }
        }

        .edit-color {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 50%;
            margin: 0 .5rem;

            &:hover {
                cursor: pointer;
                opacity: .75;
            }
        }
    }

    .edit-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: .5rem;
        border-top: 1px solid ${({theme}) => theme.colors.accentMain}50;
        
        .cancel, .update {
            transition: all 150ms linear;
            letter-spacing: 1px;
        }

        .cancel {
            background: none;
            border: none;
            text-transform: uppercase;
            font-size: .85rem;
            padding: .5rem;
            color: ${({theme}) => theme.colors.textMain}85;

            &:hover {
                cursor: pointer;
                color: ${({theme}) => theme.colors.accentMain}50;
            }
        }

        .update {
            background: ${({theme}) => theme.colors.accentMain}25;
            border: none;
            border-radius: .5rem;
            color: ${({theme}) => theme.colors.textMain}85;
            font-size: 1rem;
            padding: .75rem;

            &:hover {
                cursor: pointer;
                background: ${({theme}) => theme.colors.accentMain}95;
                color: #fff;
                box-shadow: 0 0 1.5rem ${({theme}) => theme.colors.bgMain}50;
            }
        }

        .delete {
            height: 2rem;
            width: 2rem;
            border: none;
            background: ${({theme}) => theme.colors.bgSecondary};
            margin-right: auto;

            svg {
                height: 1.35rem;
                stroke: ${({theme}) => theme.colors.textMain}75;
                transition: all 250ms linear;
            }

            &:hover {
                cursor: pointer;

                svg {
                    stroke: ${({theme}) => theme.colors.danger};
                }
            }
        }

    }

    @media (min-width: 768px) { 
        flex-direction: row;
        width: 35rem;
    }
    
`;