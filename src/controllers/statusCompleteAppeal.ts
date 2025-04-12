import { PrismaClient } from "@prisma/client";
import { Status } from "../service/statusAppeal";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const statusCompleteAppeal = async (req: Request, res: Response) => {
  const { resolutionText } = req.body;
  const { id } = req.params;
  // Проверка, что тема и текст переданы
  try {
    // Находим обращение по теме и тексту
    const appeal = await prisma.appeal.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Если обращение не найдено, возвращаем ошибку 404
    if (!appeal) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }

    if (appeal.status === Status.CANCELED) {
      return res.status(400).json({
        error:
          "Нельзя завершить обращение, которое находится в статусе 'отменено'",
      });
    }
    // Обновляем статус обращения на "В работе"
    await prisma.appeal.update({
      where: {
        id: appeal.id, // Обновляем обращение по ID
      },
      data: {
        status: Status.COMPLETED, // Устанавливаем статус "В работе"
        resolutionText: resolutionText,
      },
    });
    res.status(200).json({ message: "Статус обновлен на 'завершено'" });
    // Отправляем обновленное обращение
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при завершении обращения" });
  }
};
