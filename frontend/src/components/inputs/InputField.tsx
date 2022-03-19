import React, { ChangeEvent, useState } from "react";

export interface InputFieldProps {
    onChangeHandler?: Function,
    placeholder: string,
    name: string,
    type?: string,
    className?: string
}

const InputField: React.FC<InputFieldProps> = ({className = '', name = '', onChangeHandler = null, placeholder = '', type = 'text'}) => {

    const [value, setValue] = useState<string>('')

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if(onChangeHandler != null) {
            onChangeHandler()
        }
        setValue(e.currentTarget.value)
    }

    return (
        <input className={className} name={name} onChange={changeHandler} placeholder={placeholder} value={value} type={type} ></input>
    );
};

export default InputField;