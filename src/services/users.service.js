import httpService from './http.service';
import localStorageService from './localStorage.service';

const usersEndPoint = 'user/';

const usersService = {
  fetchAll: async () => {
    const { data } = await httpService.get(usersEndPoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      usersEndPoint + payload._id,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      usersEndPoint + localStorageService.getUserIdToken()
    );
    console.log(data.content);
    return data;
  },
  updateUser: async (payload) => {
    const { data } = await httpService.patch(
      usersEndPoint + payload._id,
      payload
    );
    return data;
  }
};

export default usersService;
