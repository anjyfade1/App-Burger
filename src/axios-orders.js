import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c90c0-default-rtdb.firebaseio.com/'
});

//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;