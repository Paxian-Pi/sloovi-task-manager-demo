import React, { useState } from 'react'
import TimePicker from 'react-time-picker'

const TimeSelector = () => {
    const [startTime, onTimeChange] = useState('10:00');
    
    return (
      <div>
        <TimePicker onChange={onTimeChange} value={startTime} />
      </div>
    )
}

export default TimeSelector