import http from "../http-common";

const getAll = () => {
  return http.get("/bloglist");
};

const get = id => {
  return http.get(`/blogdetail/${id}`);
};

const create = data => {
  return http.post("/blogs", data);
};

const update = (id, data) => {
  return http.put(`/blogs/${id}`, data);
};

const remove = id => {
  return http.delete(`/blogs/${id}`);
};

const removeAll = () => {
  return http.delete(`/blogs`);
};

const findByTitle = title => {
  return http.get(`/blogs?title=${title}`);
};

const gettag = tag => {
  return http.get(`/searchtag/${tag}`);
};

const BlogService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  gettag
};

export default BlogService;
