import React from 'react'

const TextField = ({
    name,
    placeholder,
    value,
    refInput,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input 
                name={name}
                type={type}
                className="form-control form-control-lg bg-white text-dark"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={refInput}
                disabled={disabled}
            />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

export default TextField