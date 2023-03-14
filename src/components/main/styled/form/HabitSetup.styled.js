import styled from "styled-components";

export const StyledHabitSetup = styled.section`
    background: ${({theme}) => theme.colors.bgSecondary};
    box-shadow: 0 0 2rem ${({theme}) => theme.colors.boxShadow}50;
    width: 22rem;
    height: auto;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    margin: auto;

    .habit-setup-heading {
        margin: 1rem;
        text-transform: uppercase;
    }

// NEW HABIT FORM STYLES
    .new-habit-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        background: ${({theme}) => theme.colors.accentMain}10;

        .habit-specs {
            margin: .75rem 0;
            width: 11rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .habit-color {
                height: 2rem;
                width: 2rem;
                border-radius: 50%;
                border: 2px solid ${({theme}) => theme.colors.textMain};

                &:hover {
                    cursor: pointer;
                    opacity: .75;
                }
            }
        }

        .habit-quantity-values {
            display: flex;
            flex-direction: column;
            border: 1px solid ${({theme}) => theme.colors.textMain}75;
            padding: .5rem;
            border-radius: .5rem;
            background: ${({theme}) => theme.colors.bgSecondary}75;

            .habit-quantity-label {
                display: flex;
                flex-direction: column;
                margin-bottom: .25rem;
                letter-spacing: 1px;

                input {
                    margin-top: .5rem;
                }
            }
        }
    }

    // TEMP HABITS LIST STYLES

    .temp-habits {
        width: 100%;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;

        .temp-habits-list {
            list-style: none;
            

            .temp-habits-list-item {
                display: flex;
                align-items: center;
                margin: .4rem 0;
                padding: .25rem;
                border-radius: .5rem;

                .temp-list-item-color {
                    height: 1rem;
                    width: 1rem;
                    border-radius: 50%;
                    margin: 0 .75rem;
                }

                .temp-list-item-name {
                    letter-spacing: 1px;
                }

                .temp-list-item-details {
                    color: ${({theme}) => theme.colors.textMain}65;
                    font-size: .75rem;
                    background: ${({theme}) => theme.colors.bgMain};
                    padding: .25rem .5rem;
                    border-radius: 1rem;
                    margin-left: .75rem;
                }
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

    

    @media (min-width: 768px) {
        width: 45rem;


// NEW HABIT FORM STYLES
        .new-habit-form {
            flex-direction: row;
            justify-content: center;
            padding: 1rem;

            .habit-specs {
                margin: 0rem .5rem;

                .habit-color {
                    height: 2.25rem;
                    width: 2.25rem;
                }
            }

            .habit-quantity-values {
                margin-right: .75rem;
            }

            .habit-submit-btn {
                height: 3rem;
                width: 5.75rem;
                margin-bottom: .5rem;
            }
        }

// TEMP HABITS LIST STYLES 
        .temp-habits {
            padding: 1.5rem 3rem;
        }
    }
`;