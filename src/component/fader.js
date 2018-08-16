import React from 'react';


class Fader extends React.Component {
    constructor(props) {
        super();
        this.getSliderVal = this.getSliderVal.bind(this)
        this.state = {
            value: 1
        }
    }
    getSliderVal(e) {
        const value = e.target.value
        this.setState({ value: value })
        this.props.callback(value)
        console.log(value)
    }
    render() {
        return (
            <div className="card">
                <div clasNames="content">
                    <input type="range" orient="vertical" value={this.state.value} min="0" max="2" step="0.1" onChange={this.getSliderVal} />
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-text">Cancel</button>
                        </div>
                    </div>
                </div>



                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <input type="range" orient="vertical" value={this.state.value} min="0" max="2" step="0.1" onChange={this.getSliderVal} />

                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">Two</p>
                            <p className="subtitle">Subtitle</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">Three</p>
                            <p className="subtitle">Subtitle</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">Four</p>
                            <p className="subtitle">Subtitle</p>
                        </article>
                    </div>
                </div>

            </div>

        );
    }
}


export default Fader