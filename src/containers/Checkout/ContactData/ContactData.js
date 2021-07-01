import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {

    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'STREET'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PIN CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CITY'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'STATE'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'COUNTRY'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'EMAIL'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: '',
                valid:true
            }

        },
        formIsValid: false,
        loading: false,


    }


    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.minLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = () => {
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(formData);
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: formData
        }

        axios.post('/order.json', order).then(() => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
            .catch((err) => {
                this.setState({loading: false})
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);

        const updatedOrderForm = {...this.state.orderForm};

        const updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.toched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm)
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


    }

    render() {

        let formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => (this.inputChangedHandler(event, formElement.id))}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    // disabled={!this.state.formIsValid}
                >ORDER</Button>
            </form>
        )

        if (this.state.loading)
            form = <Spinner/>
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
