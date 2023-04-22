import Api from '../../configuration/ServiceApi';

// const register = (data) => Api.post(`/create/lawyer`, data);
// const get = () => Api.get(`/get/lawyer`);
const register = (data) => Api.post(`/create/lawyer`, data, { withCredentials: true });
const get = () => Api.get(`/get/lawyer`, { withCredentials: true });

export default { register, get }