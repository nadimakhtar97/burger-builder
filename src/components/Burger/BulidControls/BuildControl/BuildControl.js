import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More} onClick={props.added}>more</button>
            <button className={classes.Less} onClick={props.removed} disabled={props.disable}>less</button>
        </div>
    );
};

export default buildControl;
