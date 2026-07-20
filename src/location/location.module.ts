import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import { LocationDto } from "./dto/location.dto";
import { Utils } from "../lib/utils/common.utils";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Module({
  imports: [AuthModule],
  controllers: [LocationController],
  providers: [LocationService, LocationDto, Utils, JwtAuthGuard],
})
export class LocationModule {}
