import { Router } from "express";
import { FindOptionsWhere } from "typeorm";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import isAdminMiddleware from "../middleware/adminMiddleware";


const router = Router()

router.use(isAdminMiddleware)

router.get('/user', async (req, res) => {
  const email = req.query.email as string | undefined;
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 20;
  const where = {} as FindOptionsWhere<User>;
  if (email) {
    where.email = email;
  }

  const [data, count] = await appDataSource.getRepository(User).findAndCount({
    where,
    take: size,
    skip: page * size
  })
  res.json({
    content: data,
    totalElements: count,
    size: data.length,
    page: page
  })
})

router.patch('/user/:id/block', async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({ where: { id } });
  if (!user) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  await appDataSource.getRepository(User).update(id, {
    blocked: !user.id
  });
  res.sendStatus(204);
})
export default router;