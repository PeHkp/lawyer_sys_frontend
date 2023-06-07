import Api from '../../configuration/ServiceApi';

// const get = (data) => Api.get(`/get/lawsuit`);

const getLawsuit = (data) => Api.get(`/report/lawsuit`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});

const getLoan = (data) => Api.get(`/report/loan`, {
    headers: {
        authorization: sessionStorage.getItem('token')
    }
});
export default { getLoan, getLawsuit }