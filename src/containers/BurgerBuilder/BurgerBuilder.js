import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BulidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICE = {
    salad: 0.2,
    meat: 2,
    cheese: 1,
    bacon: 0.5
}

class BurgerBuilder extends Component {


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("YOU CONTINUE!");


        const queryParams = [];

        for (let i in this.state.ingredients) {

            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push(
            {
                pathname:'/checkout',
                search:'?' + queryString
            }
        )
    }

    updatePurchasableState = (ingredients) => {

        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});


    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        const updatedState = {
            ingredients: updatedIngredient, totalPrice: updatedPrice
        }
        this.setState({...updatedState});
        this.updatePurchasableState(updatedIngredient);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0)
            return 0;
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        const updatedState = {
            ingredients: updatedIngredient, totalPrice: updatedPrice
        }
        this.setState({...updatedState});
        this.updatePurchasableState(updatedIngredient);

    }


    render() {

        const disableInfo = {
            ...this.state.ingredients
        }

        for (let type in disableInfo)
            disableInfo[type] = disableInfo[type] <= 0

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
        />

        if(this.state.loading)
            orderSummary = <Spinner/>

        return (
            <Aux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disable={disableInfo}
                    currentPrice={this.state.totalPrice}
                    purchasable={this.updatePurchasableState}
                    ordered={this.purchasingHandler}

                />
            </Aux>
        );
    }

}


export default withErrorHandler(BurgerBuilder,axios);
