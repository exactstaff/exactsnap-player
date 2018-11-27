import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stories.exactstaff.com/api'
});

export default instance;