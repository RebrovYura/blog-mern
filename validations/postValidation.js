import { body } from "express-validator";

export const postValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }),
  body('text', 'Введите текст статьи').isLength({ min: 10 }),
  body('tags', 'Укажите имя').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]