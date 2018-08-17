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
    componentDidMount() {
        this.setState(
            { value: this.props.default },
            () => this.props.callback(this.state.value)
        );
    }
    render() {
        return (
            // <div className="columns">
            //     <div className="column">
            //         <div className=" has-text-centered">
            //             <input type="range" orient="vertical" value={this.state.value} min="0" max="2" step="0.1" onChange={this.getSliderVal} />
            //         </div>
            //     </div>
            //     <div className="column">
            //         <p className="bd-notification">1</p>
            //     </div>
            // </div>

            <div className="tile is-parent">
                <article className="tile is-child box">
                    <p className="title">{this.props.title}</p>
                    <p className="subtitle">{this.state.value + this.props.template}</p>
                    <div className=" has-text-centered">
                        <input
                            type="range"
                            orient="vertical"
                            value={this.state.value}
                            min={this.props.min}
                            max={this.props.max}
                            step={this.props.step}
                            onChange={this.getSliderVal} />
                    </div>
                </article>
            </div>
            // <div className="tile is-parent">
            //     <article className="tile is-child box">
            //         <p className="title">Two</p>
            //         <p className="subtitle">Subtitle</p>
            //     </article>
            // </div>


        );
    }
}


export default Fader