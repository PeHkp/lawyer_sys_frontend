import Api from '../../configuration/ServiceApi';

const login = (data) => Api.post(`/login`, data, { withCredentials: true });

export default { login }