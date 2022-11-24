const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments');
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title and url are required' });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  // Populate the user in the savedBlog (so it doesn't show only the id)
  await Blog.populate(savedBlog, {
    path: 'user',
    select: { username: 1, name: 1 },
  });

  response.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments/', async (request, response) => {
  const comment = new Comment({ message: request.body.message });
  const newComment = await comment.save();

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: newComment.id } },
    { new: true, upsert: true },
  );

  if (blog) {
    response.json(newComment);
  } else {
    response.status(400);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (updatedBlog.user.toString() === decodedToken.id) {
    response.json(updatedBlog);
  } else {
    response.status(401).end();
  }
});

module.exports = blogsRouter;
