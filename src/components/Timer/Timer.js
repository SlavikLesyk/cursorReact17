import React from 'react';

class Timer extends React.Component{
  state= {
    time: this.props.time,
    startTime: this.props.time,
    isRun: this.props.isRun
  }

  tick = () =>{
    if(this.state.isRun && this.state.time > 0){
      clearInterval(this.timer);

      this.timer = setInterval(() => this.setState (prevState => (prevState.time > 0) ? {time: (prevState.time - this.props.step)} : clearInterval(this.timer))
      , this.props.step);
      
    } else {
      clearInterval(this.timer);
    }
  } 

  renderTime = (time, className) => (this.state.time < 0) ?
  <div>
    <span>00:</span>
    <span>00</span>
    <span>{(this.props.step < 1000) ? ':0' : ''}</span>
  </div>
  :
  <div>
    <span>{(Math.floor(time / (1000 * 60)) < 10) ? '0' + Math.floor(time / (1000 * 60)) : Math.floor(time / (1000 * 60))}:</span>
    <span>{(Math.floor((time % (1000 * 60)) / 1000) < 10) ? "0" + Math.floor((time % (1000 * 60)) / 1000) : Math.floor((time % (1000 * 60)) / 1000)}</span>
    <span>{(this.props.step < 1000) ? ':' + Math.floor(time % 1000 / 100) : ''}</span>
  </div>
  
  renderBtn = () => {
    this.tick();
    return (this.state.isRun) ? <span>Stop</span> : <span>Start</span> 
  } 

  renderProgressBar = () =>{
    return (
      <div className="progress-bar" style={{width: this.state.time / this.state.startTime * 100 + "%"}}></div>
    );
  }

  btnToogle = () =>this.setState({isRun: !this.state.isRun});

  componentDidMount(){
    this.props.onTimerCreate();
  }

  componentDidUpdate(){
    (this.state.isRun) ? this.props.onTimeStart() : this.props.onTimePause();
      
    if(this.state.time <= 0) {
      this.props.onTimeEnd();
    }
  }

  componentWillUnmount(){
    this.props.onTimerDeleted();
  }

  render(){
    return(
      <div className="timer-wrap">
        {this.renderTime(this.state.time, 'timer')}
        <button 
          className="btn"
          id="timer-btn" 
          onClick={() => {
            this.btnToogle();
          }}>
          {this.renderBtn()}
        </button>
        {this.renderProgressBar()}
      </div>    
    );
  }
}

export default Timer;