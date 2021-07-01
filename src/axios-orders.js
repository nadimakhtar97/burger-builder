import axios from 'axios';


const instance = axios.create(
    {
        baseURL:"https://react-my-burger-c63ac.firebaseio.com/"
    }
)

export default instance;
