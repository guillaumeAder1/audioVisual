import React from 'react';
import Fileloader from './fileloader'
import Main from './main'

class Container extends React.Component {
    constructor() {
        super()
        this.state = {
            audioFile: null
        }

        this.audioSelected = this.audioSelected.bind(this);
        this.sendAudio = this.sendAudio.bind(this);
    }

    sendAudio(file) {

    }


    audioSelected(file) {
        this.setState({
            audioFile: file
        }, () => {
            console.log(this.state);
        })

    }

    render() {
        const audio = this.state.audioFile || false;
        return (
            <div className="container">
                <h1>Select an Audio File</h1>
                <Main audioFile={audio} />
                {/* <Fileloader callback={this.audioSelected} /> */}
            </div>
        );
    }
}

export default Container;
