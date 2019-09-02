import React from 'react';

export default props => {
    return <input type="text" className="display form-control mb-3" disabled="disabled" value={props.value}/>
}