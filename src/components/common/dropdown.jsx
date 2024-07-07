import React, { Component } from 'react';
import ListGroup from './listGroup';

const Dropdown = (props) => {
    const { items } = props;

    return (
        <div className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Choose your language...
            </button>

            <ListGroup items={items} />
        </div>
    );
}

export default Dropdown;