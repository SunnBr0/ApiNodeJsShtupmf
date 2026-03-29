import { Appeal, PrismaClient } from "@prisma/client";
import { IAppealRepository } from "../../domain/repositories/iAppealRepository";

const prisma = new PrismaClient();

export class PrismaAppealRepository implements IAppealRepository {
  async findByTopicAndText(
    topic: string,
    text: string,
  ): Promise<Appeal | null> {
    return await prisma.appeal.findFirst({ where: { topic, text } });
  }
  async create(data: {
    topic: string;
    text: string;
    status: string;
  }): Promise<void> {
    await prisma.appeal.create({ data });
  }

  async findById(id: number): Promise<Appeal | null> {
    return prisma.appeal.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await prisma.appeal.update({
      where: { id },
      data: { status },
    });
  }

  async findMany(params: {
    createdAtFrom?: Date;
    createdAtTo?: Date;
    createdAtToExclusive?: Date;
  }): Promise<Appeal[]> {
    const { createdAtFrom, createdAtTo, createdAtToExclusive } = params;

    const createdAt: {
      gte?: Date;
      lte?: Date;
      lt?: Date;
    } = {};

    if (createdAtFrom) createdAt.gte = createdAtFrom;
    if (createdAtTo) createdAt.lte = createdAtTo;
    if (createdAtToExclusive) createdAt.lt = createdAtToExclusive;

    return prisma.appeal.findMany({
      where: Object.keys(createdAt).length ? { createdAt } : {},
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
