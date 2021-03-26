import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';


const burgerIngredient = props => {
    let ingredient = null;

    switch (props.type) {
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = <div className={classes.BreadTop}></div>;
            break;
        case('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        default:
            ingredient = null;

    }

    return ingredient;
};

burgerIngredient.propTypes = {

    type : PropTypes.string.required

};

export default burgerIngredient;
