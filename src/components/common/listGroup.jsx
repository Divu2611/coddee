import React, { Component } from 'react';

const ListGroup = (props) => {
    const { items } = props;

    return (
        <ul className="dropdown-menu">
            {
                items.map(
                    item => <li key={item.id} className='dropdown-item'>
                        {item.name}
                    </li>
                )
            }
        </ul>
    );
}

export default ListGroup;