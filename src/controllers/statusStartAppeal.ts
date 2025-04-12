import { PrismaClient } from "@prisma/client";
import { Status } from "../service/statusAppeal";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const statusStartAppeal = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appeal = await prisma.appeal.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!appeal) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }

    // Обновляем статус
    await prisma.appeal.update({
      where: { id: Number(id) },
      data: { status: Status.IN_PROGRESS },
    });

    return res.status(200).json({
      message: "Статус обновлен на 'в работе'",
    });
  } catch (error) {
    console.error("Ошибка при обновлении обращения:", error);
    res.status(500).json({ error: "Ошибка при обновлении обращения" });
  }
};
