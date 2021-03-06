import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Cheese", type: "cheese"},
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Meat", type: "meat"}
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>CURRENT PRICE: <strong>{props.currentPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl =>
                <BuildControl
                    label={ctrl.label}
                    key={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disable={props.disable[ctrl.type]}
                />)}
                <button  className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;
