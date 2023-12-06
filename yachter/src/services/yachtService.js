import * as request from '../lib/request'
const baseUrl = 'http://localhost:3030/data/yachts';

export const getAll = async () => {
    const result = await request.get(baseUrl);
    return Object.values(result);
};

export const getAllByYachtOwnerId = async (yachtOwnerId) => {
    const query = new URLSearchParams({
        where: `_ownerId="${yachtOwnerId}"`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const getOne = async (yachtId) => {
    const result = await request.get(`${baseUrl}/${yachtId}`);
    return result;
};

export const create = async (yachtData) => {
    const result = await request.post(baseUrl, yachtData);

    return result;
};

export const update = async (yachtId, yachtData) => {
    const result = await request.patch(`http://localhost:3030/data/yachts/${yachtId}`, yachtData);

    return result;
};

export const remove = async (yachtId) => request.remove(`${baseUrl}/${yachtId}`);