import React from "react";
import refresh from "./refresh.png";

export default function Header(props) {
    return (
        <header className="header">
            <h1>HackerNews</h1>
            <button className={'refresh'} onClick={props.fetch}>
                <img src={refresh} className={'refresh'} />
            </button>
        </header>
    )
}
