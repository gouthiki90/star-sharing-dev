import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/client/client";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    /** 싱글톤 객체 생성 */
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }
}
