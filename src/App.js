import React from 'react';
import './App.scss';

const sound = {
  Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  
};

class App extends React.Component {
  render(){
    return (
      <div className="container">
          <h1>Drum machine :)</h1>
          <DrumMachine />
      </div>
    );
  }

}

class DrumMachine extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      played : "",
      power: false
    }

    this.displaySound = this.displaySound.bind(this)
    this.switchOnOff = this.switchOnOff.bind(this);
    this.handleClick = this.handleClick.bind(this)

  }

  switchOnOff(){
    if (this.state.power === true){
      this.setState(prevState => ({
        power: false
      }))
     
      
      console.log(this.state.power)
    }else{
      this.setState(prevState => ({
        power: true
      }))
      console.log(this.state.power)
    }
  }

  displaySound(name){
    if(this.state.power === true){
      this.setState({ played : name})
    }else{
      this.setState({ played : ''})
    }
    
  }

  handleClick(event){
    this.switchOnOff();
  }

  render(){
    var disabled = this.state.power
    console.log(this.state.power)
    if(this.state.power === true){
      return (
        <div id="drum-machine" className="drum-machine">
          <div id="power" className="power" onClick={this.switchOnOff}>ON / OFF</div>
          <div id="drum-pad" className="drum-pad">
           
            <DrumPad onKey="Q" disabled={disabled}  audio={sound.Q} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="W"  disabled={disabled}  audio={sound.W} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="E"  disabled={disabled}  audio={sound.E} onKeyPressed={this.displaySound}/>
  
            <DrumPad onKey="A"  disabled={disabled}  audio={sound.A} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="S"  disabled={disabled}  audio={sound.S} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="D"  disabled={disabled}  audio={sound.D} onKeyPressed={this.displaySound}/>
  
            <DrumPad onKey="Z"  disabled={disabled}  audio={sound.Z} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="X"  disabled={disabled}  audio={sound.X} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="C"  disabled={disabled}  audio={sound.D} onKeyPressed={this.displaySound}/>
          </div>
          <div id="display" className="display"><h3>Played: {this.state.played}</h3></div>
        </div>
      )
    }else{
      return(
      <div id="drum-machine" className="drum-machine">
          <div id="power" className="power" onClick={this.switchOnOff} className={`switch ${this.state.power ? 'true' : ''}`}>ON / OFF</div>
          <div id="drum-pad" className="drum-pad">
           
            <DrumPad onKey="Q" ref="btn" audio={sound.Q} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="W" ref="btn" audio={sound.W} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="E" ref="btn" audio={sound.E} onKeyPressed={this.displaySound}/>
  
            <DrumPad onKey="A" ref="btn" audio={sound.A} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="S" ref="btn" audio={sound.S} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="D" ref="btn" audio={sound.D} onKeyPressed={this.displaySound}/>
  
            <DrumPad onKey="Z" ref="btn" audio={sound.Z} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="X" ref="btn" audio={sound.X} onKeyPressed={this.displaySound}/>
            <DrumPad onKey="C" ref="btn" audio={sound.D} onKeyPressed={this.displaySound}/>
          </div>
          <div id="display" className="display"><h3>Played: {this.state.played}</h3></div>
        </div>
      )
    }
    
  }
}

class DrumPad extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pressed: false
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this)

  }

  
  letPressed(){
    this.setState(prevState => ({
      pressed: true
    }))

    const _this = this;
    setTimeout(function (){
      _this.setState(prevState => ({
        pressed: false
      }))
    }, 100);
    
    
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event){
      if(String.fromCharCode(event.keyCode) === this.props.onKey.toUpperCase()){
        this.handleClick();
        this.letPressed();
      } 
  }

  handleClick = (e) => {
   
    if(this.props.disabled === true ){
      this.props.onKeyPressed(this.props.onKey);
      this.audioElement.currentTime = 0; 
      this.audioElement.play();
      this.letPressed();
    }
  }

 disabled(){
     
  }


  render(){
    return(
      <div id={this.props.onKey} onClick={this.handleClick} className={`pad ${this.state.pressed ? 'key-pressed' : ''}`}>
           <span>{this.props.onKey}</span>
           <audio
           className="clip"
           id={this.props.onKey}
           src={this.props.audio}
           ref={theReference => this.audioElement = theReference}
           >
          Ups! Your browser doesn't supper audio tags.
           </audio>
      </div>
    )
  }
}

export default App;
