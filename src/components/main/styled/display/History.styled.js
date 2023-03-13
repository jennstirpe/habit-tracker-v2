import styled from "styled-components";

export const StyledHistory = styled.ul`
    list-style: none;

    .history-record {
        border: 1px solid ${({theme}) => theme.colors.textSecondary};
        background: ${({theme}) => theme.colors.bgSecondary}75;
        border-radius: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        margin: .5rem 0;

        &:first-of-type {
            border: 2px solid ${({theme}) => theme.colors.textMain}25;
            padding: 1.5rem;
            box-shadow: 0 0 1.25rem ${({theme}) => theme.colors.boxShadow}50;
            margin-bottom: 1rem;

            .history-record-date {
                font-size: 1.25rem;
                letter-spacing: 2px;
            }

            .history-record-display-bar {
                .display-bar-box {
                    height: 2.25rem;
                    width: 2.4rem;                    
                }
            }
        }

        .history-record-date {
            letter-spacing: 1px;
        }

        .history-record-display-bar {
            list-style: none;
            display: flex;

            .display-bar-box {
                height: 2rem;
                width: 2.15rem;
                border-top: 1px solid ${({theme}) => theme.colors.textMain}75;
                border-bottom: 1px solid ${({theme}) => theme.colors.textMain}75;
                border-right: 1px solid ${({theme}) => theme.colors.textMain}75;
                border-left: none;
                position: relative;

                &:first-of-type {
                    border-top-left-radius: .25rem;
                    border-bottom-left-radius: .25rem;
                    border-left: 1px solid ${({theme}) => theme.colors.textMain}75;
                }

                &:last-of-type {
                    border-top-right-radius: .25rem;
                    border-bottom-right-radius: .25rem;
                }

                &:hover {
                    cursor: pointer; 

                    .display-bar-label {
                        display: flex;
                    }
                }

                .display-bar-label {
                    display: none;
                    position: absolute;
                    width: 5rem;
                    left: -1.25rem;
                    bottom: 3rem;
                    flex-direction: column;
                    padding: .75rem .75rem 1.4rem .75rem;
                    background: ${({theme}) => theme.colors.bgSecondary};
                    border-radius: .25rem;
                    box-shadow: 0 0 1.5rem ${({theme}) => theme.colors.boxShadow}50;
                    z-index: 15;

                    &::before {
                        content: "";
                        height: 2rem;
                        width: 2rem;
                        background: ${({theme}) => theme.colors.bgSecondary};
                        position: absolute;
                        bottom: -.75rem;
                        left: 0;
                        right: 0;
                        margin: 0 auto;
                        transform: rotate(45deg);
                        z-index: 0;
                    }

                    .label-name {
                        text-align: center;
                        margin-bottom: .25rem;
                        font-size: clamp(.75rem, 1vw, 1rem);
                        overflow-wrap: break-word;
                    }

                    .label-amt-current {
                        padding: .4rem 0;
                        text-align: center;
                        font-weight: 700;
                    }  

                    .label-amt-goal {
                        color: ${({theme}) => theme.colors.textMain}75;
                        font-size: .75rem;
                        text-align: center;
                    }    
                }

                .qty {
                    .label-name {
                        border-bottom: 1px solid ${({theme}) => theme.colors.textMain}50;
                        padding-bottom: .25rem;
                    }
                }
            }
        }
    }

`;