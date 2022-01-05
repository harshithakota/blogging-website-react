import {
  CREATE_BLOG,
  RETRIEVE_BLOGS,
  RETRIEVE_BLOGS_BY_ID,
  RETRIEVE_BLOGS_BY_TAG,
  UPDATE_BLOG,
  DELETE_BLOG,
  DELETE_ALL_BLOGS,
} from "../actions/types";

const initialState = [];

function blogReducer(blogs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BLOG:
      return [...blogs, payload];

    case RETRIEVE_BLOGS:
      return payload;

    case RETRIEVE_BLOGS_BY_ID:
      return payload;
    //console.log(payload);
  //      return blogs.filter(({ id }) => id === payload.id);


  case RETRIEVE_BLOGS_BY_TAG:
    return payload;


    case UPDATE_BLOG:
      return blogs.map((blog) => {
        if (blog.id === payload.id) {
          return {
            ...blog,
            ...payload,
          };
        } else {
          return blog;
        }
      });

    case DELETE_BLOG:
      return blogs.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_BLOGS:
      return [];

    default:
      return blogs;
  }
};

export default blogReducer;
