import React from 'react';
import logo from './logo.svg';
import './App.css';

const sound = [
  {
  Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
}, 
{
  W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
}, 
{
  E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
}, 
{
  A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
}, 
{
  S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, 
{
  D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, 
{
  Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
},
{ 
  X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, 
{
  C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }

   

  }

 

  render(){
    return (
      <div className="App">
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
      played = ""
    }

    this.displaySound = this.displaySound.bind(this)
  }

  displaySound(name){
    this.setState({ played : name})
  }

  render(){
    return (
      <div id="drum-machine">
        <div id="drum-pad">
          <DrumPad onkey="Q" audio={sound.Q} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="W" audio={sound.W} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="E" audio={sound.E} onKeyPressed={this.displaySound}/>

          <DrumPad onkey="A" audio={sound.A} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="S" audio={sound.S} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="D" audio={sound.D} onKeyPressed={this.displaySound}/>

          <DrumPad onkey="Z" audio={sound.Z} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="X" audio={sound.X} onKeyPressed={this.displaySound}/>
          <DrumPad onkey="C" audio={sound.D} onKeyPressed={this.displaySound}/>
        </div>
      </div>
    )
  }
}

class DrumPad extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pressed: false
    }
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

  handleKeyPress(event){
      if(String.fromCharCode(event.keyCode) === this.props.onKey.toUpperCase()){
        this.handleClick();
        this.letPressed();
      } 
  }

  handleClick(e){
    this.props.onKeyPressed(this.props.onKey);
    this.audioElement.currentTime = 0; 
    this.audioElement.play();
  }


  render(){
    return(
      <div id={this.props.onKey} onClick={this.handleClick}>
           <span>{this.props.onKey}</span>
           <audio
           className="clip"
           id={this.props.onKey}
           src={this.props.audio}>
          Ups! Your browser doesn't supper audio tags.
           </audio>
      </div>
    )
  }
}

export default App;
