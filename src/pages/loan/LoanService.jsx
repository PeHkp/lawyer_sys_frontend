import Api from '../../configuration/ServiceApi';

// const register = (data) => Api.post(`/create/lawsuit`, data);
// const get = (data) => Api.get(`/get/lawsuit`);

// const getCustomer = () => Api.get(`get/customer`);
// const getLawyer = () => Api.get(`/get/lawyer`);
const register = (data) => Api.post(`/create/loan`, data, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});
const get = (data) => Api.get(`/get/loan`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});

const getTrainner = () => Api.get(`/get/intern`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});
const getBook = () => Api.get(`/get/book`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});


export default { register, get, getTrainner, getBook }