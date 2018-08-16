import React from 'react'

const TrackDetails = (props) => {

    const getCurrentTime = (audio) => {
        if (audio) {

        }
        else {
            return 'NOHNON'
        }
    }

    return (
        <div> time: {Math.round(props.current)} /{Math.round(props.total)}secs </div>
    );
}

export default TrackDetails;