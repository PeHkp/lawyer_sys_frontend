import Api from '../../configuration/ServiceApi';

// const get = (data) => Api.get(`/get/lawsuit`);

const getLoan = (data) => Api.get(`/get/loan`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});
export default { getLoan }