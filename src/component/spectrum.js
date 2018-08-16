import React from 'react';
import TrackDetails from './trackDetails'
//https://stackoverflow.com/questions/22073716/create-a-waveform-of-the-full-track-with-web-audio-api
//https://wavesurfer-js.org/examples/
class Spectrum extends React.Component {
    constructor() {
        super();

        this.state = {
            curtime: 0,
            duration: 0
        }
        this.init = this.init.bind(this);
        this.analyzeAudio = this.analyzeAudio.bind(this)
        this.play = this.play.bind(this)
        this.trackTime = this.trackTime.bind(this)
    }

    init() {
        //arrayBuffer
        const fileReader = new FileReader();
        // music
        const fileReader2 = new FileReader();

        if (this.props.audioFile) {
            if (this.props.audioFile.isbuff) {
                this.analyzeAudio(this.props.audioFile.buff, false)
            } else {
                fileReader.readAsArrayBuffer(this.props.audioFile);
                fileReader2.readAsDataURL(this.props.audioFile);
            }
        }
        fileReader.addEventListener("load", (e) => {
            this.analyzeAudio(fileReader.result, true);
        }, false);

        fileReader2.addEventListener("load", (e) => {
            this.audio.src = fileReader2.result;
        }, false);
    }
    /**
     * buffer data
     * isFile - true if the file is loaded from the input file
     */
    analyzeAudio(buffer, isFile) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = context.createBufferSource();
        if (!isFile) {

        }
        context.decodeAudioData(buffer, (decoded) => {
            this.source.buffer = decoded;
            this.source.connect(context.destination);
            this.setState({ duration: decoded.duration });
            this.displayBuffer(decoded);
        }, (err) => console.log(err));
    }
    trackTime(e) {
        console.log(this.audio, this.source)
        // this.setState({ curtime: e.target.currentTime });
    }
    play() {
        this.audio.play();
        setInterval(() => this.trackTime(), 100)
    }
    displayBuffer(buff) {
        this.canvas = this.canvasContainer.getContext('2d');
        const canvasHeight = this.canvasContainer.clientHeight;
        const canvasWidth = this.canvasContainer.clientWidth;
        const drawLines = 500;
        const leftChannel = buff.getChannelData(0); // Float32Array describing left channel     
        const lineOpacity = canvasWidth / leftChannel.length;
        this.canvas.save();
        this.canvas.fillStyle = '#080808';
        this.canvas.fillRect(0, 0, canvasWidth, canvasHeight);
        this.canvas.strokeStyle = '#46a0ba';
        this.canvas.globalCompositeOperation = 'lighter';
        this.canvas.translate(0, canvasHeight / 2);
        //context.globalAlpha = 0.6 ; // lineOpacity ;
        this.canvas.lineWidth = 1;
        let totallength = leftChannel.length;
        let eachBlock = Math.floor(totallength / drawLines);
        let lineGap = (canvasWidth / drawLines);

        this.canvas.beginPath();
        for (let i = 0; i <= drawLines; i++) {
            let audioBuffKey = Math.floor(eachBlock * i);
            let x = i * lineGap;
            let y = leftChannel[audioBuffKey] * canvasHeight / 2;
            this.canvas.moveTo(x, y);
            this.canvas.lineTo(x, (y * -1));
        }
        this.canvas.stroke();
        this.canvas.restore();
    }
    render() {
        if (this.props.audioFile) {
            this.init(this.props.audioFile);
        }
        return (
            <div>
                <audio ref={el => this.audio = el} />
                <canvas width="500px" height="150px" ref={el => this.canvasContainer = el} />
                <TrackDetails total={this.state.duration} current={this.state.curtime} />
                <br />
                <button onClick={this.play}>play</button>
            </div>
        );
    }
}


export default Spectrum;