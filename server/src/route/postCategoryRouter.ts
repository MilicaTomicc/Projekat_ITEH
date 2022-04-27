import { Router } from "express";
import { appDataSource } from "../dataSource";
import { PostCategory } from "../entity/PostCategory";


const router = Router();

router.get('/', async (_req, res) => {
  res.json(await appDataSource.getRepository(PostCategory).find());
})

export default router;