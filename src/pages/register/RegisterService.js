import Api from '../../configuration/ServiceApi';
import axios from "axios";

const register = (data) => Api.post(`/create/user`, data);
const getAddres = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

export default { getAddres, register }