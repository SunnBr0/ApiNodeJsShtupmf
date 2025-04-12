import { PrismaClient } from "@prisma/client";
import { Status } from "../service/statusAppeal";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const statusCancelAppeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cancelReason } = req.body;

  try {
    const appeal = await prisma.appeal.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!appeal) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }
    if (appeal.status === Status.COMPLETED) {
      return res.status(404).json({ error: "Нельзя отменить обращение, которое находится в статусе 'завершено'" });
    }
    // Обновляем статус
    await prisma.appeal.update({
      where: { id: Number(id) },
      data: { status: Status.CANCELED, cancelReason: cancelReason },
    });
    return res.status(200).json({
      message: "Статус обновлен на 'Отменено'",
    });
  } catch (error) {
    console.error("Ошибка при отмене обращения:", error);
    res.status(500).json({ error: "Ошибка при обновлении обращения" });
  }
};
