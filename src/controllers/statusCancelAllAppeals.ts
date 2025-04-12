import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const statusCancelAllAppeals = async (req: Request, res: Response) => {

  try {
    const { count } = await prisma.appeal.updateMany({
      where: {
        status: "В работе",
      },
      data: {
        status: "Отменено",
      },
    });

    if (count === 0) {
      return res
        .status(404)
        .json({ message: "Нет обращений со статусом 'В работе'" });
    }

    res.status(200).json({ message: `Все обращения в статусе 'В работе' отменились ` });
  } catch (error) {
    console.error("Ошибка при отмене обращений:", error);
    res.status(500).json({ error: "Ошибка при отмене обращений" });
  }
};
