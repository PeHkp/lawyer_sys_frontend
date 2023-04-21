import Api from '../../configuration/ServiceApi';

const register = (data) => Api.post(`/create/customer`, data, { withCredentials: true });
const get = (data) => Api.get(`get/customer`, { withCredentials: true });
// const register = (data) => Api.post(`/create/customer`, data);
// const get = () => Api.get(`get/customer`);

export default { register, get }