import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
//

// GET /api/posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (posts) {
    res.json(posts);
  } else {
    res.status(404);
    throw new Error('Posts not found');
  }
});

// POST /api/posts auth(req.user)
export const createPost = asyncHandler(async (req, res) => {
  const post = req.body;
  const user = req.user;
  const newPost = await Post.create({ ...post, author: user.name, userId: user._id });
  if (newPost) {
    res.status(201).json(newPost);
  } else {
    res.status(400);
    throw new Error('Invalid post Data');
  }
});

// DELETE /api/posts/:id auth(req.user)
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    await post.remove();
    res.status(200).json({ message: 'Post deleted' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// PATCH /api/posts/:id auth(req.user)
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    const postData = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not Found');
  }
});

// PATCH likePost /api/posts/:id/likePost auth(req.user);
export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    if (!post.likes.includes(req.user._id)) {
      // like post
      post.likes.push(req.user._id);
    } else {
      // remove like from post
      post.likes = post.likes.filter((likeId) => likeId !== String(req.user._id));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not Found');
  }
});
