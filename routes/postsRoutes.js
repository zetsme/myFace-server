import express from 'express';
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  likePost,
} from '../controllers/postsController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
