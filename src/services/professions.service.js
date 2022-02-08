import httpService from './http.service';

const professionsEndPoint = 'profession/';

const professionsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(professionsEndPoint);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(professionsEndPoint + id);
    return data;
  }
};

export default professionsService;
