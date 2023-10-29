import { loginValidation, registerValidation } from './validations/authValidation.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

import express from 'express'
import mongoose from 'mongoose'
import { postValidation } from './validations/postValidation.js'

const PORT = process.env.PORT || 4444

mongoose
  .connect('mongodb+srv://admin:qwerty123@cluster0.twkhgql.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log('DB ERROR', error))

const app = express()
app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postValidation, PostController.create)
// app.patch('/posts', PostController.update)
// app.delete('/posts', PostController.delete)


app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }

  console.log(`SERVER STARTED ON PORT ${PORT}`)
})