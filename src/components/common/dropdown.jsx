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
                    <option value="none"/>
                {items.map(item => (
                    <option key={item.id}
                        value={item.code}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;