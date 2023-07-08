import {Row} from 'antd'
import styled from 'styled-components'



export const WrapperButton = styled.button`
    background-color: var(--green_main);
    color: var(--white);
    padding: 12px 15px;
    outline: none;
    border: 1px solid gainsboro;
    border-radius: 8px;
    cursor: pointer;
    margin: 5px;

    $ :hover{
        box-shadow: 1px 1px 4px #6cc65a;
    }
`
export const WrapperWhiteText = styled.p`
    color: var(--white)
`

export const WrapperIndexText = styled.p`
    color: var(--white);
    font-size: larger;
    font-weight: 700;
    margin: 0 5px;
`
export const WrapperFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
