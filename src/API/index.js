import axios from 'axios';

 const api = axios.create({
    baseURL: 'http://assignment.bunq.com',
  });


  export default api