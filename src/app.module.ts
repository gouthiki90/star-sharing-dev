import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { GazeModule } from "./star/gaze.module";

@Module({
  imports: [PrismaModule, GazeModule],
})
export class AppModule {}
