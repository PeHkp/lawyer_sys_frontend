import Api from '../../configuration/ServiceApi';

// const register = (data) => Api.post(`/create/lawyer`, data);
// const get = () => Api.get(`/get/lawyer`);
const register = (data) => Api.post(`/create/intern`, data, {headers :{
        authorization: sessionStorage.getItem('token')
    } });
const get = () => Api.get(`/get/intern`, {headers :{
        authorization: sessionStorage.getItem('token')
    }});

export default { register, get }