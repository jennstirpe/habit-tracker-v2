import styled from "styled-components";

export const StyledStreaks = styled.section`
    margin: 2rem 0;
    padding: 2rem;
    background: darkGray;
    border-radius: .5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;

    .streak-container {
        width: 10rem;
        margin: 1rem .5rem;
        background: ${({theme}) => theme.colors.bgMain}75;
        border-radius: .5rem;
        box-shadow: 0 0 1.5rem ${({theme}) => theme.colors.boxShadow}25;

        .streak-name {
            text-align: center;
            border-bottom: 1px solid ${({theme}) => theme.colors.textMain}75;
            padding: .5rem;
        }

        .streak-amts {
            display: flex;
            justify-content: space-between;
            padding: .5rem 1rem;

            .streak {
                display: flex;
                flex-direction: column;
                align-items: center;

                .streak-amt {
                    font-size: 1.5rem;
                    font-weight: 700;
                    width: 3rem;
                    text-align: center;
                }

                .streak-type {
                    margin-top: .25rem;
                    font-size: .75rem;
                    border-top: 1px solid ${({theme}) => theme.colors.textMain}50;
                    width: 3rem;
                    text-align: center;
                }
            }

        }
    }
`;