import React from "react";

export default function Footer (props) {
    return (
        <div className={'footer'} style={{ display : props.isLoaded ? 'block' : 'none' }}>
            <button
                disabled={props.start < 1}
                onClick={props.prev}>
                prev</button>
            <button
                onClick={props.more}>
                more</button>
        </div>
    )
}
