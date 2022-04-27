import { Router } from "express";



const router = Router();

router.post('/logout', async (req, res) => {
  (req.session as any).user = undefined;
  req.session.destroy(e => {
    if (e) {
      console.log(e);
    }
  });
  res.sendStatus(204);
})
router.post('/check', async (req, res) => {
  const user = (req.session as any).user;
  res.json(user)
})


export default router;