import styled from "styled-components";

export const StyledColorInput = styled.div`
    border-radius: 1rem;
    box-shadow: 0 0 1rem ${({theme}) => theme.colors.boxShadow}50;
    width: 17rem;
    height: 17rem;
    background: ${({theme}) => theme.colors.bgMain};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 5;
    padding-top: 1.5rem;
    
    .color-select-close {
        position: absolute;
        left: .5rem;
        top: .25rem;
        font-size: 2rem;
        color: ${({theme}) => theme.colors.textMain};
        background: ${({theme}) => theme.colors.bgMain};
        border: none;
        transition: all 200ms linear;

        &:hover {
            cursor: pointer;
            color: ${({theme}) => theme.colors.accentMain}50;
        }
    }

    .color-options {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: 12rem;
        width: 12rem;

        .color-option {
            height: 2.25rem;
            width: 2.25rem;
            border-radius: 50%;
            margin: .2rem .1rem;
            position: relative;
            background: black;

            &:hover {
                cursor: pointer;
                opacity: .8;
            }

            .color-selected {
                display: none;
                width: 2.25rem;
                height: 2.25rem;
                border-radius: 50%;
                border: 3px solid ${({theme}) => theme.colors.textMain};
                position: absolute;
                left: 0;
            }

            .color-option-input {
                opacity: 0;
                pointer-events: none;
            }

            .color-option-input:checked + .color-selected {
                display: inline-block;
            }

            &:nth-of-type(1) {
                background: #d00000;
            }
            &:nth-of-type(2) {
                background: #e85d04;
            }
            &:nth-of-type(3) {
                background: #ffaa00;
            }
            &:nth-of-type(4) {
                background: #ffd300;
            }
            &:nth-of-type(5) {
                background: #a1ff0a;
            }
            &:nth-of-type(6) {
                background: #38b000;
            }
            &:nth-of-type(7) {
                background: #0a9396;
            }
            &:nth-of-type(8) {
                background: #90e0ef;
            }
            &:nth-of-type(9) {
                background: #147df5;
            }
            &:nth-of-type(10) {
                background: #580aff;
            }
            &:nth-of-type(11) {
                background: #9336fd;
            }
            &:nth-of-type(12) {
                background: #9381ff;
            }
            &:nth-of-type(13) {
                background: #d883ff;
            }
            &:nth-of-type(14) {
                background: #b5179e;
            }
            &:nth-of-type(15) {
                background: #f72585;
            }
            &:nth-of-type(16) {
                background: #ff758f;
            }
            
        }
    }    

    .color-submit {
        width: 90%;
        padding: .5rem 0;
        margin-top: 1rem;
        font-size: 1rem;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-radius: 1rem;
        color: ${({theme}) => theme.colors.textMain};
        background: ${({theme}) => theme.colors.bgSecondary};
        border: none;
        transition: all 200ms linear;

        &:hover {
            cursor: pointer;
            background: ${({theme}) => theme.colors.accentMain}70;
            color: #fff;
        }
        
    }
`;