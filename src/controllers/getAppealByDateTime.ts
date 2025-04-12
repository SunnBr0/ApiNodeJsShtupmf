import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAppealByDateTime = async (req: Request, res: Response) => {
  const { date, from, to } = req.query;

  try {
    let where = {};

    if (date) {
      const targetDate = new Date(date as string);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where = {
        createdAt: {
          gte: targetDate,
          lt: nextDay,
        },
      };
    }

    if (from && to) {
      const fromDate = new Date(from as string);
      const toDate = new Date(to as string);

      where = {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      };
    }

    const appeals = await prisma.appeal.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(appeals);
  } catch (error) {
    console.error("Ошибка при получении обращений:", error);
    res.status(500).json({ error: "Ошибка при получении обращений" });
  }
};
