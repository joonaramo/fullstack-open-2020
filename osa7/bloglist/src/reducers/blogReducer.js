/* eslint-disable indent */
import blogService from '../services/blogs';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data];
    case 'GET_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'GET_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    });
  };
};

export default blogReducer;
