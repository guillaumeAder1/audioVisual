import React from 'react';
import TrackDetails from './trackDetails'
import Fader from './fader'
//https://stackoverflow.com/questions/22073716/create-a-waveform-of-the-full-track-with-web-audio-api
//https://wavesurfer-js.org/examples/
class Spectrum extends React.Component {
    constructor() {
        super();

        this.state = {
            curtime: 0,
            duration: 0,
            isplaying: false,
            curfile: null,
            sliderVal: 1
        }
        this.isplaying = false;
        this.init = this.init.bind(this);
        this.analyzeAudio = this.analyzeAudio.bind(this)
        this.play = this.play.bind(this)
        this.trackTime = this.trackTime.bind(this)
        this.reset = this.reset.bind(this)
        this.getSliderVal = this.getSliderVal.bind(this)

        this.interval = false;

    }

    init(audiofile) {
        //arrayBuffer
        const fileReader = new FileReader();
        // music
        const fileReader2 = new FileReader();

        if (audiofile) {
            if (this.props.audioFile.isbuff) {
                this.analyzeAudio(this.props.audioFile.buff, false)
            } else {
                fileReader.readAsArrayBuffer(audiofile);
                fileReader2.readAsDataURL(audiofile);
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
        this.context = context
        context.decodeAudioData(buffer, (decoded) => {
            this.source.buffer = decoded;
            this.source.connect(context.destination);
            this.setState({ duration: decoded.duration });
            this.displayBuffer(decoded);
        }, (err) => console.log(err));
    }
    trackTime() {
        console.log(this.audio.currentTime)
        this.setState({ curtime: this.audio.currentTime })
    }
    play() {

        if (this.isplaying) {
            //this.source.stop(0)
            // this.context.suspend().then(() => {
            //     this.source.stop()
            // })
            this.audio.pause()
        } else {
            this.audio.play();
            //this.source.start(0)
            // this.context.resume().then(() => {
            //     this.source.start()
            // })
        }
        this.isplaying = !this.isplaying;
        if (!this.interval) { this.interval = setInterval(() => this.trackTime(), 100) }
    }
    displayBuffer(buff) {
        this.canvas = this.canvasContainer.getContext('2d');
        const canvasHeight = this.canvasContainer.clientHeight;
        this.canvasContainer.style.width = '100%';
        this.canvasContainer.width = this.canvasContainer.offsetWidth;
        const canvasWidth = this.canvasContainer.offsetWidth;
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

    componentWillReceiveProps(props) {
        if (props.audioFile && props.audioFile != this.props.audioFile) {
            this.init(props.audioFile);
            this.reset()
        }
    }
    reset() {
        this.setState({ curtime: 0 });
        this.isplaying = false;
        clearInterval(this.interval)
        this.interval = false; // important to reset the interval
    }

    componentDidMount() {
        this.audio.addEventListener('ended', this.reset)
    }

    getSliderVal(e) {
        this.audio.playbackRate = e
        // console.log(e.target.value)
        // this.audio.playbackRate = e.target.value
        //this.setState({ sliderVal: e.target.value })
    }
    render() {

        return (
            <div>
                <audio ref={el => this.audio = el} />
                <canvas height="150px" ref={el => this.canvasContainer = el} />
                <TrackDetails total={this.state.duration} current={this.state.curtime} />
                <br />
                <button onClick={this.play}>play</button>
                {/* <input type="range" orient="vertical" value={this.state.sliderVal} min="0" max="2" step="0.1" onChange={this.getSliderVal} /> */}
                {this.audio && <Fader callback={(val) => this.audio.playbackRate = val} />}
            </div>
        );
    }
}


export default Spectrum;