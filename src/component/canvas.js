import React from 'react'

class Canvas extends React.Component {

    constructor(props) {
        super();

    }
    draw(buff) {
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
    render() {
        this.props.buffer && this.draw(this.props.buffer)
        return (
            <canvas height="150px" ref={el => this.canvasContainer = el} />

        )
    }
}

export default Canvas