/* eslint-disable indent */
import blogService from '../services/blogs';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data];
    case 'GET_BLOGS':
      return action.data;
    case 'LIKE_BLOG':
      return [
        ...state.filter((blog) =>
          blog.id !== action.data.id ? blog : action.data
        ),
      ];
    case 'DELETE_BLOG':
      return [...state.filter((blog) => blog.id !== action.data)];
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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blog.likes++;
    const updatedBlog = await blogService.update(blog.id, blog);
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export default blogReducer;
