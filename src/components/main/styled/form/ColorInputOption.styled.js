import styled from "styled-components";

export const StyledColorInputOption = styled.label`
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 50%;
    margin: .2rem .1rem;
    position: relative;
    transition: all 150ms linear;

    &:hover {
        cursor: pointer;
        opacity: .65;
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
            
`;