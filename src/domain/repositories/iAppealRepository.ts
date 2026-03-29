import { Appeal } from "@prisma/client";

export interface IAppealRepository {
  findByTopicAndText(topic: string, text: string): Promise<Appeal | null>;
  create(data: { topic: string; text: string; status: string }): Promise<void>;

  findById(id: number): Promise<Appeal | null>;

  findMany(params: {
    createdAtFrom?: Date;
    createdAtTo?: Date;
    createdAtToExclusive?: Date;
  }): Promise<Appeal[]>;

  updateStatus(id:number,status:string):Promise<void>
}
