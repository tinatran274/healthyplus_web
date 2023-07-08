import React, {useState} from "react";
import { Input } from 'antd';
import styles from './style.module.css'


const InputFormComponent = (props) => {
    const {placeholder = "Nhập ", ...rests} = props;
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return(
        <div>
            <Input className={styles.input} placeholder={placeholder} value={props.input} {...rests} onChange={handleOnchangeInput}/>
        </div>
    )
}
export default InputFormComponent