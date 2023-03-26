import Api from '../../configuration/ServiceApi';
import axios from "axios";

// const getAddres = (cep) => Api.get(`viacep.com.br/ws/${cep}/json/`);
const getAddres = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

export default { getAddres }