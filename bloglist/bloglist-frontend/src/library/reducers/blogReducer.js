import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import { notify } from './notificationReducer';
import { refreshUser } from './userReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      const blog = action.payload;
      return state.concat(blog);
    },
    setBlogs: (state, action) => {
      const blogs = action.payload;
      return blogs;
    },
    editBlog: (state, action) => {
      const editedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== editedBlog.id ? blog : editedBlog,
      );
    },
    commentBlog: (state, action) => {
      const blogID = action.payload.blogId;
      const newComment = action.payload.newComment;

      return state.map((blog) =>
        blog.id === blogID
          ? { ...blog, comments: [...blog.comments, newComment] }
          : blog,
      );
    },
    likeBlog: (state, action) => {
      const blogID = action.payload.id;
      const blogToLike = state.find((blog) => blog.id === blogID);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state.map((blog) => (blog.id !== blogID ? blog : likedBlog));
    },
    removeBlog: (state, action) => {
      const blogIdToRemove = action.payload;
      return state.filter((blog) => blog.id !== blogIdToRemove);
    },
  },
});

export const {
  addBlog,
  removeBlog,
  editBlog,
  setBlogs,
  likeBlog,
  commentBlog,
} = blogSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newObject);
      await dispatch(addBlog(blog));
      dispatch(
        notify(`"${blog.title}" was created successfully!`, 'success', 5),
      );
      dispatch(refreshUser(blog.user.id));
    } catch (error) {
      dispatch(
        notify(
          `There was an error when trying to create the blog. Error: ${
            error.message || 'unknown error'
          }`,
          'error',
          7.5,
        ),
      );
    }
  };
};

export const updateBlog = (editedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(editedBlog.id, editedBlog);
      dispatch(editBlog(updatedBlog));
      dispatch(notify(`The blog was updated`, 'success', 5));
    } catch (error) {
      const errorMessage =
        error.message || 'There was an error trying to edit this blog';
      dispatch(notify(`${errorMessage}`, 'error', 5));
    }
  };
};

export const voteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog);
      dispatch(likeBlog(updatedBlog));
      dispatch(notify(`"${blog.title}" liked!`, 'success', 5));
    } catch (error) {
      const errorMessage =
        error.message || 'There was an error trying to like this blog';
      dispatch(notify(`${errorMessage}`, 'error', 5));
    }
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, comment);
    dispatch(commentBlog({ newComment, blogId }));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(blog.id);
        await dispatch(removeBlog(blog.id));
        dispatch(notify(`"${blog.title}" deleted`, 'success', 5));
        // TODO: See this
        dispatch(refreshUser(blog.user.id));
      } catch (error) {
        dispatch(
          notify(
            `There was an error when trying to delete the blog. Error: ${
              error.message || 'Unknown error'
            }`,
            'error',
            7.5,
          ),
        );
      }
    }
  };
};

export default blogSlice.reducer;
