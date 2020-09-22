import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TextField from 'material-ui/TextField';
import back from './img/back.png';
import start from './img/start.png';
import pause from './img/pause.png';
import next from './img/next-1.png';
import random from './img/random.png';
import rewind from './img/rewind.png';
import speaker from './img/speaker.png';
import fastf from './img/fast.png';
import replay from './img/replay.png';
import musNote from './img/musical-note.png';
import cover from './img/cover.jpg';
import aud from './img/aud1.mp3'

class Buttons extends React.Component {
	render() {
		var path = this.props.start?pause:start;
		return(
			<div>
				<div className="btn-align" id="l1">
					<input type="image" className="smallbtn" src={back} key="back" alt="no-pic" onClick={() => this.props.onClick(0)}/>
					<input type="image" className="largebtn" src={path} id="start" alt="no-pic" onClick={() => this.props.onClick(1)}/>
					<input type="image" className="smallbtn" src={next} id="next" alt="no-pic" onClick={() => this.props.onClick(2)}/>
				</div>
				<div class="btn-align" id="l2">
					<input type="image" className="smallbtn" src={random} id="shuffle" alt="no-pic" onClick={() => this.props.onClick(3)}/>
					<input type="image" className="smallbtn" src={rewind} id="rewind" alt="no-pic" onClick={() => this.props.onClick(4)}/>
					<input type="image" className="smallbtn" src={speaker} id="speaker" alt="no-pic" onClick={() => this.props.onClick(5)}/>
					<input type="image" className="smallbtn" src={fastf} id="fast-foward" alt="no-pic" onClick={() => this.props.onClick(6)}/>
					<input type="image" className="smallbtn" src={replay} id="replay" alt="no-pic" onClick={() => this.props.onClick(7)}/>
				</div>
			</div>
		);
	}
}

class Player extends React.Component {
  	constructor(props) {
	    super(props);
  		var thisAudio = new Audio(aud);
	    this.state = {
	      	musname: "Spectre",
	      	authname: "Alan Walker",
	      	op:"",
	      	start: false,
	      	aud: thisAudio,
	    };
  	}
	handleClick(i) {
		switch(i){
			case 0:
				this.setState({op: "back",});
				break;
			case 1:
				this.setState({op: this.state.start?"pause":"start",start: this.state.start?false:true});
	    		if(this.state.start){
	    			this.state.aud.pause();
	    		}
	    		else{
	        		this.state.aud.play();
	    		}
				break;
			case 2:
				this.setState({op: "next",});
				break;
			case 3:
				this.setState({op: "shuffle",});
				break;
			case 4:
				this.setState({op: "rewind",});
				break;
			case 5:
				this.setState({op: "speaker",});
				break;
			case 6:
				this.setState({op: "fast-foward",});
				break;
			case 7:
				this.setState({op: "replay",});
				break;
		}
	}

	setTime(chgTime) {
		this.state.aud.currentTime = chgTime;
	}

  	render() {
  		var start = this.state.start;
		return (
	      <div className="player">
	        <div>
	        	<img className="screen" src={cover} alt="no-pic"/>
	        </div>
			<div class="name">
				<img className="smallbtn" src={musNote} alt="no-pic"/>
				<div className="title">{this.state.musname}</div>
				<img className="smallbtn" src={musNote} alt="no-pic"/>
			</div>
			<div className="name sec">{this.state.authname}</div>
			<div className="name sec">{this.state.op}</div>
			<input type="range" min="0" max={this.state.aud.duration} value={this.state.aud.currentTime} class="slider" id="myRange" onchange={()=>this.setTime(this.value)}/>

	        <Buttons onClick={i => this.handleClick(i)} start={start}/>

	      </div>
	    );
  	}
}

// ========================================

ReactDOM.render(<Player />, document.getElementById("root"));

