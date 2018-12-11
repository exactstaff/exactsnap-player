import axios from 'axios';

const instance = axios.create({
    baseURL: 'exactsnap://'
});

export default instance;