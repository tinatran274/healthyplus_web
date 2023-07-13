import {Button} from 'antd'
import styled from 'styled-components'



export const WrapperPayButton = styled(Button)`
    width: auto;
    height: auto;
    padding: 10px 20px;
    background-color: var(--green_main);
    color: var(--white);

    & :hover{
        background-color: var(--green_main);
        color: var(--white);
    }
`
