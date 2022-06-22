import React from 'react'

const FloatingLabelTextInput = ({ label, type, value, onChangeHandler }) => {
  return (
    
    <div id="float-label">
      <input
        className='form-control form-control-lg bg-transparent text-dark'
        type={type}
        value={value}
        onChange={onChangeHandler}
      />
      <label htmlFor="text" className={value !== '' ? 'Active' : ''}>{label}</label>
      <br />
    </div>
    
  )
}

export default FloatingLabelTextInput