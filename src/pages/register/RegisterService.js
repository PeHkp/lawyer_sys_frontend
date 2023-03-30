import axios from "axios";

const getAddres = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

export default { getAddres }