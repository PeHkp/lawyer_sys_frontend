import Api from '../../configuration/ServiceApi';

// const register = (data) => Api.post(`/create/lawsuit`, data);
// const get = (data) => Api.get(`/get/lawsuit`);

// const getCustomer = () => Api.get(`get/customer`);
// const getLawyer = () => Api.get(`/get/lawyer`);
const register = (data) => Api.post(`/create/lawsuit`, data, { withCredentials: true });
const get = (data) => Api.get(`/get/lawsuit`, { withCredentials: true });

const getCustomer = (data) => Api.get(`get/customer`, { withCredentials: true });
const getLawyer = () => Api.get(`/get/lawyer`, { withCredentials: true });


export default { register, get, getCustomer, getLawyer }