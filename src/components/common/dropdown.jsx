import React, { Component } from 'react';

const Dropdown = (props) => {
    const { onChange, items } = props;

    return (
        <div className="form-group selector">
            <label className="form-label label">
                PICK A LANGUAGE...
            </label>

            <select className="form-control ms-1 options"
                onChange={onChange}>
                {items.map(item => (
                    <option key={item.id}
                        value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;