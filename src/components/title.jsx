// Importing Components.
import React, { Component } from 'react';

// Importing CSS.
import "../styles/title.css";

const Title = () => {
    return (
        <React.Fragment>
            <div className="heading">
                <h1 className="title">
                    CODDEE
                </h1>

                <p className="tag">
                    An online code-editor to write and enjoy code, while sipping coffee, from any device, anywhere!
                </p>

                <p className="tag">
                    Happy Coddeeng!
                </p>
            </div>
        </React.Fragment>
    );
}

export default Title;