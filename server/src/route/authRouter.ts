import axios from "axios";
import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import * as https from 'https'
import { v4 } from 'uuid'
import * as fs from 'fs'
const router = Router();


router.post('/login', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  });
  if (!user || user.blocked) {
    res.status(400).json({
      error: 'No such user'
    });
    return;
  }
  (req.session as any).user = user;
  req.session.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(user);
});

router.post('/register', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);

  try {
    let imageUrl = req.body.imageUrl;
    if (!imageUrl) {
      https.get(`https://eu.ui-avatars.com/api/?background=random&name=${req.body.firstName}+${req.body.lastName}`, (res) => {
        imageUrl = '/img/' + v4();
        res.pipe(fs.createWriteStream('../..' + imageUrl))
      })
    }
    const user = await userRepository.save({
      ...req.body,
      imageUrl: 'https://localhost:8000' + imageUrl,
      admin: false,
      blocked: false
    });
    (req.session as any).user = user;
    req.session.save(e => {
      if (e) {
        console.log(e);
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).send('User already exists');
  }
})

export default router;