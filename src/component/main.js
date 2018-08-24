import React, { Fragment } from 'react';
import TrackDetails from './trackdetails'
import Fader from './fader'
import Canvas from './canvas'
import Fileloader from './fileloader'
import Button from './button'
//https://stackoverflow.com/questions/22073716/create-a-waveform-of-the-full-track-with-web-audio-api
//https://wavesurfer-js.org/examples/
// REVERBE LIB = https://github.com/mmckegg/soundbank-reverb/blob/master/index.js
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            curtime: 0,
            duration: 0,
            isplaying: false,
            curfile: null,
            sliderVal: 1,
            buffer: false,
            audioFile: null,
            context: null,
            gainNode: null,
            loop: false
        }
        this.interval = false;
        this.isplaying = false;
        //
        this.init = this.init.bind(this);
        this.analyzeAudio = this.analyzeAudio.bind(this)
        this.play = this.play.bind(this)
        this.loop = this.loop.bind(this)
        this.trackTime = this.trackTime.bind(this)
        this.reset = this.reset.bind(this)
        this.audioSelected = this.audioSelected.bind(this);


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
     */
    analyzeAudio(buffer) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        context.decodeAudioData(buffer, (decoded) => {
            this.source = context.createBufferSource();
            const gainNode = context.createGain();
            this.source.buffer = this.buffer = decoded;
            this.source.connect(gainNode);
            gainNode.gain.value = 0.1;
            gainNode.connect(context.destination)

            this.setState({
                duration: decoded.duration,
                buffer: decoded,
                context: context,
                gainNode: gainNode
            });
        }, (err) => console.log(err));
    }

    /**
     * 
     */
    setupAudio(decoded){
        

    }

    trackTime() {
        console.log(this.audio.currentTime)
        this.setState({ curtime: this.audio.currentTime })
    }

    loop() {
        if (this.state.loop) {
            this.source.loop = false
        } else {
            this.source.loop = true
        }
        this.setState({ loop: !this.state.loop })

    }
    play() {
        if (this.isplaying) {
            this.source.stop(0)
            this.source = this.state.context.createBufferSource(); // so we need to create a new one
            this.source.buffer = this.buffer;
            this.source.connect(this.state.gainNode);

            // source.loop = true;
            // this.context.suspend().then(() => {
            //     this.source.stop()
            // })
            // this.audio.pause()
        } else {
            // this.audio.play();
            this.source.start(0)
            // this.context.resume().then(() => {
            //     this.source.start()
            // })
        }
        this.isplaying = !this.isplaying;
        if (!this.interval) { this.interval = setInterval(() => this.trackTime(), 100) }
    }

    audioSelected(file) {
        this.setState({
            audioFile: file
        }, () => {
            console.log(this.state);
            this.fileReceived(file)
        })

    }

    reset() {
        this.setState({ curtime: 0 });
        this.isplaying = false;
        clearInterval(this.interval)
        this.interval = false; // important to reset the interval to false
    }


    fileReceived(file) {
        this.init(file);
        this.reset()
    }

    componentDidMount() {
        this.audio.addEventListener('ended', this.reset)
    }


    render() {
        return (
            <Fragment>
                <Section>
                    <div className="column is-2">
                        <TrackDetails total={this.state.duration} current={this.state.curtime} />
                        <Fileloader callback={this.audioSelected} />
                        <Section>
                            <Button action={this.play} icon="fas fa-play" />
                            <Button icon="fas fa-pause" />
                            <Button action={this.loop} icon="fas fa-undo-alt" />
                            <Button icon="fas fa-volume-up" />
                        </Section>

                    </div>
                    <div className="column is-10">
                        <Canvas buffer={this.state.buffer} />
                    </div>
                </Section>

                <audio ref={el => this.audio = el} />

                {this.source &&
                    <Section>
                        <Fader
                            title="sample rate"
                            template={(val) => Math.round(val * 100) + "%"}
                            callback={(val) => this.source.playbackRate.value = val}
                            min="0" max="2" step="0.1" default="1"
                        />
                        <Fader
                            title="sound volume"
                            template={val => val}
                            callback={(val) => this.state.gainNode.gain.value = val}
                            min="0" max="1" step="0.1" default="0.1"
                        />
                    </Section>
                }
            </Fragment>
        );
    }
}


const Section = (props) => {
    return (

        <div className="section">
            <div className="columns">
                {props.children}
            </div>
        </div>
    )
}

export default Main;