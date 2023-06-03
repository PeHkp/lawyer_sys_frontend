import Api from '../../configuration/ServiceApi';

const register = (data) => Api.post(`/create/customer`, data, {headers :{
        authorization: sessionStorage.getItem('token')
    }} );
const get = (data) => Api.get(`get/customer`, {headers :{
        authorization: sessionStorage.getItem('token')
    } });

export default { register, get }