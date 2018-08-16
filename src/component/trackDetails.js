import React from 'react'

const TrackDetails = (props) => {


    return (
        <div> time: {props.current} /{props.total} </div>
    );
}

export default TrackDetails;