import React from 'react';
//https://stackoverflow.com/questions/22073716/create-a-waveform-of-the-full-track-with-web-audio-api
//https://wavesurfer-js.org/examples/
class Spectrum extends React.Component {
    constructor() {
        super();
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
            fileReader.readAsArrayBuffer(this.props.audioFile);
            fileReader2.readAsDataURL(this.props.audioFile);
        }
        fileReader.addEventListener("load", (e) => {
            this.analyzeAudio(fileReader.result);
        }, false);

        fileReader2.addEventListener("load", (e) => {
            this.audio.src = fileReader2.result;

        }, false);
    }

    analyzeAudio(buffer) {
        let context = new (window.AudioContext || window.webkitAudioContext)();
        context.decodeAudioData(buffer).then((decoded) => {
            this.displayBuffer(decoded);
        });
    }
    trackTime(e) {
        console.log(e.target.currentTime)
    }
    play() {
        this.audio.play();
    }
    displayBuffer(buff) {
        this.canvas = this.canvasContainer.getContext('2d');
        let canvasHeight = this.canvasContainer.clientHeight;
        let canvasWidth = this.canvasContainer.clientWidth;
        let drawLines = 500;
        let leftChannel = buff.getChannelData(0); // Float32Array describing left channel     
        let lineOpacity = canvasWidth / leftChannel.length;
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
            console.log(this.props.audioFile);

            this.init(this.props.audioFile);
        }
        return (
            <div>
                spectrum
                <audio onTimeUpdate={this.trackTime} ref={el => this.audio = el} />
                <canvas width="500px" height="150px" ref={el => this.canvasContainer = el} />
                <button onClick={this.play} >play</button>
            </div>
        );
    }
}


export default Spectrum;