import React from 'react';

const TimerPropsInput = (props) => {
  return(
    <div className="props-panel">
      <div className="checkbox">
        <label>Auto run </label>
        <input type="checkbox" 
          className="control__autorun"
          id="auto-run" 
          onChange ={props.onChangeCheck}  />          
      </div>

      <div>
        <input type="number" 
          className="control__time" 
          id="time"
          value = {props.time} 
          onChange ={props.onChangeInput}
        />
        <span>ms</span>
      </div>
      
      <select value={props.step} onChange={props.selectStep}>
        <option value="1000">1sec</option>
        <option value="100">100ms</option>
        <option value="2000">2sec</option>
        <option value="10000">10sec</option>
      </select>

    </div>
  );
}

export default TimerPropsInput; 