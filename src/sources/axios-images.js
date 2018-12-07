import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.66.145:3001/api/posts'
});

export default instance;