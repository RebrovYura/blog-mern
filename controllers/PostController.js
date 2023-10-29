import PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try {
    const document = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })

    const post = await document.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось создать статью'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()
    return res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id
    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: { viewsCount: 1 }
    },
      {
        returnDocument: 'after'
      },
      (error, document) => {
        if (error) {
          console.log(error)
          return res.status(500).json({
            message: 'Не удалось получить статью'
          })
        }
        if (!document) {
          return res.status(404).json({
            message: 'Статья не найдена'
          })
        }
        res.json(document)
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}