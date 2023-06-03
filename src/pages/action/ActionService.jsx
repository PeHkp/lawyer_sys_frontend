import Api from '../../configuration/ServiceApi';

// const register = (data) => Api.post(`/create/lawsuit`, data);
// const get = (data) => Api.get(`/get/lawsuit`);

// const getCustomer = () => Api.get(`get/customer`);
// const getLawyer = () => Api.get(`/get/lawyer`);
const register = (data) => Api.post(`/create/lawsuit`, data, {headers :{
        authorization: sessionStorage.getItem('token')
    } });
const get = (data) => Api.get(`/get/lawsuit`, {headers :{
        authorization: sessionStorage.getItem('token')
    } });

const getCustomer = (data) => Api.get(`get/customer`, {headers :{
        authorization: sessionStorage.getItem('token')
    } });
const getLawyer = () => Api.get(`/get/lawyer`, {headers :{
        authorization: sessionStorage.getItem('token')
    } });


export default { register, get, getCustomer, getLawyer }