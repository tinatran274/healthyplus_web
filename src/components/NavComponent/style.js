import styled from 'styled-components'

export const WrapperLink = styled.a`
    float: left;
    display: block;
    font-weight: 500;
    color: var(--green_main);
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
`
export const WrapperDropButton = styled.div`
    font-size: 15px;
    border: none;
    outline: none;
    color: var(--green_main);
    padding: 14px 16px;
    font-weight: 500;
    background-color: inherit;
    font-family: inherit;
`
export const WrapperDropContent = styled.div`
    display: none;
    align-self: center;
    width: 170px;
    position: absolute;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);   
`
