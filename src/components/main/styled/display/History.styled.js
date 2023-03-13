import styled from "styled-components";

export const StyledHistory = styled.ul`
    list-style: none;

    .history-record {
        border: 1px solid ${({theme}) => theme.colors.textSecondary};
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
                border: 1px solid ${({theme}) => theme.colors.textMain}50;

                &:first-of-type {
                    border-top-left-radius: .25rem;
                    border-bottom-left-radius: .25rem;
                }

                &:last-of-type {
                    border-top-right-radius: .25rem;
                    border-bottom-right-radius: .25rem;
                }
            }
        }

    }

    
`;