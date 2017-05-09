import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestAPIClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        getDEfaultDate: () => client.request({
            method: 'GET',
            url: '/topic'
        }),
        deleteTopic: ({ id }) => client.request({
            method: 'DELETE',
            url: `/topic/${id}`
        }),
        updateTopic: ({ id, data }) => client.request({
            method: 'PUT',
            url: `/topic/${id}`,
            data
        }),
        createTopic: ({ id, data }) => client.request({
            method: 'POST',
            url: `/topic/${id}`,
            data
        }),
        getDefaultDate: ({date}) => client.request({
            method: 'POST',
            url: '/reservation',
            data: {date}
        }),
        addReserve: (reservation) => client.request({
            method: 'POST',
            url: '/addReservation',
            data: reservation
        }),
        confirmReserve: (confirmation) => client.request({
            method: 'POST',
            url: '/confirmReservation',
            data: confirmation
        })
    };
};