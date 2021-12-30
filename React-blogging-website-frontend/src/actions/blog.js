import {
  CREATE_BLOG,
  RETRIEVE_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
  DELETE_ALL_BLOGS,
  RETRIEVE_BLOGS_BY_ID
} from "./types";

import BlogDataService from "../services/BlogService";

export const createBlog = (title, description) => async (dispatch) => {
  try {
  //  const res = await BlogDataService.create({ title, description });
  const res = {
    'id': Math.floor(Math.random()*100),
    'title':title,
    'description':description
  };

    dispatch({
      type: CREATE_BLOG,
      payload: res,
    });

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveBlogs = () => async (dispatch) => {
  try {
    const res = await BlogDataService.getAll();

    dispatch({
      type: RETRIEVE_BLOGS,
      payload: res.data,
      });
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = (id, data) => async (dispatch) => {
  try {
    const res = await BlogDataService.update(id, data);

    dispatch({
      type: UPDATE_BLOG,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await BlogDataService.remove(id);

    dispatch({
      type: DELETE_BLOG,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllBlogs = () => async (dispatch) => {
  try {
    const res = await BlogDataService.removeAll();

    dispatch({
      type: DELETE_ALL_BLOGS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findBlogsByTitle = (title) => async (dispatch) => {
  try {
    const res = await BlogDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_BLOGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
  export const findBlogsById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: RETRIEVE_BLOGS_BY_ID,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }

};
