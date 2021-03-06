import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders : [],
        loading : false
    }

    componentDidMount() {
        axios.get('/order.json').then(
            (res)=>{

                const fetchedOrders = [];
                for(let key in res.data)
                {
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({loading:false,orders:fetchedOrders});
                console.log(fetchedOrders);
            }
        ).catch( err => {
            this.setState({loading:false});
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order=>(
                    <Order
                        ingredients={order.ingredients}
                        key={order.id}
                        price={+order.totalPrice}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);
