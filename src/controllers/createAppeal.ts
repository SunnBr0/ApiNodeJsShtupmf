import { PrismaClient } from "@prisma/client";
import { Status } from "../service/statusAppeal";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createAppeal = async (req: Request, res: Response) => {
  const { topic, text } = req.body;

  // Проверка, что тема и текст обращения переданы
  if (!topic || !text) {
    return res
      .status(400)
      .json({ error: "Тема или текст обращения не указаны" });
  }

  try {
    // Проверка на дубликат (по теме и тексту)
    const existingAppeal = await prisma.appeal.findFirst({
      where: {
        topic: topic,
        text: text,
      },
    });

    if (existingAppeal) {
      return res
        .status(409)
        .json({ error: "Обращение с такой темой и текстом уже существует" });
    }

    // Создание нового обращения
    await prisma.appeal.create({
      data: {
        topic,
        text,
        status: Status.NEW, // Устанавливаем статус как "Новое"
      },
    });

    // Отправляем ответ с созданным обращением
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании обращения" });
  }
};
