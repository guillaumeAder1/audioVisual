import React from 'react';
import config from './config'


class Fileloader extends React.Component {

    constructor() {
        super()
        this.state = {
            file: null,
            samples: null,
            root: null
        }
        this.fileSelected = this.fileSelected.bind(this)
        // this.selectSample = this.selectSample.bind(this)
    }

    componentDidMount() {
        this.setState({
            samples: config.files,
            root: config.root
        })
    }

    fileSelected(src) {
        this.setState({
            file: src
        }, () => {
            this.props.callback(this.state.file);
        });
    }

    selectSample(src) {
        let request = new XMLHttpRequest();
        request.open('GET', this.state.root + src, true);
        request.responseType = 'arraybuffer';
        request.onload = (e) => {
            this.fileSelected({ isbuff: true, buff: request.response })
        }
        request.send()
    }

    render() {
        return (
            <div className="file is-small">
                <label className="file-label">
                    <input
                        ref={node => this.node = node}
                        className="file-input"
                        type="file"
                        onChange={e => this.fileSelected(e.target.files[0])} />
                    <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Choose a file…
                        </span>
                    </span>
                </label>
            </div>

        );
    }
}

export default Fileloader;