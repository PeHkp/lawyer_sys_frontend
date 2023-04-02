import Api from '../../configuration/ServiceApi';

const login = (data) => Api.post(`/check/user`, data);

export default { login }