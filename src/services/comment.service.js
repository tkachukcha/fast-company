import httpService from './http.service';

const commentsEndPoint = 'comments/';

const commentsService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentsEndPoint + payload._id,
      payload
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentsEndPoint, {
      params: { orderBy: '"pageId"', equalTo: `"${pageId}"` }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentsEndPoint + commentId);
    return data;
  }
};

export default commentsService;
