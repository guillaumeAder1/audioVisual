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
            <div className="container">



                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">Two</p>
                            <p className="subtitle">Subtitle</p>
                            <div className=" has-text-centered">
                                <input type="range" orient="vertical" value={this.state.value} min="0" max="2" step="0.1" onChange={this.getSliderVal} />
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title">Two</p>
                            <p className="subtitle">Subtitle</p>
                        </article>
                    </div>
                    {/* <div className="tile is-parent">
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
                    </div> */}
                </div>

            </div>

        );
    }
}


export default Fader