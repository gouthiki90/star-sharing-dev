import { Module } from "@nestjs/common";
import { GazesController } from "./gaze.controller";
import { GazeService } from "./gaze.service";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Utils } from "../lib/utils/common.utils";
import { LocationDto } from "./dto/location.dto";

@Module({
  imports: [AuthModule],
  controllers: [GazesController],
  providers: [GazeService, LocationDto, Utils, JwtAuthGuard],
})
export class GazeModule {}
