import React from 'react';
import Timer from './Timer/Timer';
import TimerPropsInput from './TimerPropsInput/TimerPropsInput';
import './App.scss';

class App extends React.Component{
  state = {
    time : 10000,
    autorun : false,
    step : 1000,
    timerState : '',
    timer : ''
  };

  renderTimer = e => this.setState( prevState => prevState.timer ? {timer: ''} : {timer: <Timer 
      onTimerCreate={this.onTimerCreate}
      onTimeEnd={this.onTimeEnd}
      onTimeStart={this.onTimeStart}
      onTimePause={this.onTimePause}
      onTimerDeleted={this.onTimerDeleted}
      time={this.state.time}
      isRun={this.state.autorun}
      step={this.state.step}
  />});

  renderBtnName = () => this.state.timer ? 'Delete timer' : 'Create timer';

  onTimerCreate = () => this.setState({timerState : <h3>Timer was created</h3>});  

  onTimeEnd = () => {
    setTimeout(this.renderTimer,5000)

    return this.setState({timerState : <h3>Time is out</h3>})
  };

  onTimeStart = () => this.setState({timerState : <h3>Timer running</h3>});

  onTimePause = () => this.setState({timerState : <h3>Timer stopped</h3>});

  onTimerDeleted = () => this.setState({timerState : <h3>Timer was deleted</h3>});
  
  setTime = e => this.setState({time : (e.target.value >= 0) ? e.target.value : 0});

  autorunToogle = e => this.setState(prevState => {
    return {autorun : !prevState.autorun };
  }); 

  selectStep = e => this.setState({step: e.target.value});
  
  render(){
    return (
    <div className="container">
      <TimerPropsInput 
        onClickBtn={this.timerToogle}
        onChangeInput={this.setTime} 
        onChangeCheck={this.autorunToogle}
        selectStep={this.selectStep}
        time={this.state.time}
        step={this.state.step}
      />
      <button className="btn" onClick={this.renderTimer}>
        {this.renderBtnName()}
      </button>
      {this.state.timerState}
      {this.state.timer}
    </div>
    );
  };
};

export default App;