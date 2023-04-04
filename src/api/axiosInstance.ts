import Axios from 'axios';
import Cookies from 'js-cookie';

const urls = {
  test: `http://localhost:3000`,
  development: 'https://localhost:7242/api',
  production: 'https://localhost:7242/api',
};

console.log('object', Cookies.get('token'));
const axiosInstance = Axios.create({
  baseURL: urls.development,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

export default axiosInstance;
