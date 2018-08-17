import React from 'react'

const Button = (props) => {
    let border = "0px solid red"
    const isClicked = () => {

        props.action()
    }
    return (
        <button className="button is-small" onClick={isClicked}><i className={props.icon}></i></button>
    );
}

export default Button;