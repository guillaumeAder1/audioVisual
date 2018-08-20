import React from 'react'

const Button = (props) => {
    let style = "0px solid red"

    const isClicked = () => {
        style = '1px solid red'

        props.action()
    }
    return (
        <button style={{ style }} className="button is-small" onClick={isClicked}><i className={props.icon}></i></button>
    );
}

export default Button;