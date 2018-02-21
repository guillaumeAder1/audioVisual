import React from 'react';

class Fileloader extends React.Component {

    constructor() {
        super()
        this.state = {
            file: null
        }

        this.fileSelected = this.fileSelected.bind(this)
    }

    fileSelected(event) {
        this.setState({
            file: event.target.files[0]
        }, () => {
            this.props.callback(this.state.file);
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileSelected} />
            </div>
        );
    }
}

export default Fileloader;