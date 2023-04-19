import Api from '../../configuration/ServiceApi';

const register = (data) => Api.post(`/create/customer`, data, { withCredentials: true });
const get = (data) => Api.get(`get/customer`, { withCredentials: true });

export default { register, get }