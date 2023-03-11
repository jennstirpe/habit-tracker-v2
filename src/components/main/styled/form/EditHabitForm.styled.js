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

    .close-edit-btn {
        position: absolute;
        right: .5rem;
        top: .25rem;
        font-size: 1.5rem;
        color: ${({theme}) => theme.colors.textMain};
        background: ${({theme}) => theme.colors.bgSecondary};
        border: none;
        transition: all 200ms linear;

        &:hover {
            cursor: pointer;
            color: ${({theme}) => theme.colors.accentMain}50;
        }
    }

    .edit-details {
        padding: 1rem;

        .edit-name, .edit-quantity input {
            padding: .5rem;
            font-size: 1rem;
            border-radius: .5rem;
            border: 1px solid ${({theme}) => theme.colors.textMain}75;
            font-family: ${({theme}) => theme.fonts.mainText};
            color: ${({theme}) => theme.colors.textMain};
            background: ${({theme}) => theme.colors.bgSecondary};
            transition: all 150ms linear;

            &::placeholder {
                font-family: ${({theme}) => theme.fonts.mainText};
            }

            &:hover {
                cursor: pointer;
                background: ${({theme}) => theme.colors.bgMain};
            }

            &:focus {
                outline: none;
                border: 2px solid ${({theme}) => theme.colors.accentMain};
                background: ${({theme}) => theme.colors.accentMain}10;
            }
        }

        .edit-details-group {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding: .75rem;
        }

        .edit-color {
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 50%;

            &:hover {
                cursor: pointer;
                opacity: .75;
            }
        }

        .edit-quantity {
            padding: .5rem;
            display: flex;
            justify-content: center;
            border-radius: .5rem;

            label {
                color: ${({theme}) => theme.colors.textMain}75;
                
                input {
                    margin-left: .5rem;
                    width: 5rem;
                }
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

            &:hover {
                cursor: pointer;
                color: ${({theme}) => theme.colors.accentMain}50;
            }
        }

        .update {
            background: ${({theme}) => theme.colors.accentMain}25;
            border:none;
            border-radius: .5rem;
            color: ${({theme}) => theme.colors.textMain}50;
            font-size: 1rem;
            padding: .75rem;

            &:hover {
                cursor: pointer;
                background: ${({theme}) => theme.colors.accentMain}50;
                color: #fff;
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
                transition: all 150ms linear;
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