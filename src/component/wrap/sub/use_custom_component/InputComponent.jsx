import React from 'react';

export default function InputComponent(
    {
        maxLength,
        type,
        id,
        name,
        placeholder,
        onChange,
        value,
        autoComplete,
        onClick,
        checked,
        disabled
    }
) {
    return (
        <input 
            maxLength={maxLength}
            type={type} 
            id={id} 
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            autoComplete={autoComplete}
            onClick={onClick}
            checked={checked}
            disabled={disabled}
        />
    );
}