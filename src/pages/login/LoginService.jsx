import Api from '../../configuration/ServiceApi';

const login = (data) => Api.post(`/login`, data, { withCredentials: true });
// const login = (data) => Api.post(`/login`, data);

export default { login }