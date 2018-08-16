import React, { Fragment } from 'react';
import TrackDetails from './trackDetails'
import Fader from './fader'
import Canvas from './canvas'
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
            sliderVal: 1,
            buffer: false
        }
        this.interval = false;
        this.isplaying = false;

        this.init = this.init.bind(this);
        this.analyzeAudio = this.analyzeAudio.bind(this)
        this.play = this.play.bind(this)
        this.trackTime = this.trackTime.bind(this)
        this.reset = this.reset.bind(this)
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
        // create canvas from buffer data
        fileReader.addEventListener("load", (e) => {
            this.analyzeAudio(fileReader.result, true);
        }, false);
        // get the track src to feed the AudioElement
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
            this.setState({
                duration: decoded.duration,
                buffer: decoded
            });
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

    reset() {
        this.setState({ curtime: 0 });
        this.isplaying = false;
        clearInterval(this.interval)
        this.interval = false; // important to reset the interval to false
    }

    componentWillReceiveProps(props) {
        if (props.audioFile && props.audioFile != this.props.audioFile) {
            this.init(props.audioFile);
            this.reset()
        }
    }

    componentDidMount() {
        this.audio.addEventListener('ended', this.reset)
    }


    render() {

        return (
            <div >
                <audio ref={el => this.audio = el} />
                <Canvas buffer={this.state.buffer} />
                <TrackDetails total={this.state.duration} current={this.state.curtime} />
                <br />
                <button onClick={this.play}>play</button>
                {this.audio && <Fader callback={(val) => this.audio.playbackRate = val} />}
            </div>
        );
    }
}


export default Spectrum;