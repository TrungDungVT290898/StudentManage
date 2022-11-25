import { ListResponse } from '../models/common';
import axiosClient from './axiosClient';
import { City } from '../models';
const cityAPI = {
    getAll(): Promise<ListResponse<City>> {
        const url = '/cities';
        return axiosClient.get(url, {
            params: {
                _page: 1,
                _limit: 50,
            },
        });
    },
};
export default cityAPI;
