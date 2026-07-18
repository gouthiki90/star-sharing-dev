import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { LocationService } from "./location.service";
import { LocationDto } from "./dto/location.dto";
import { Utils } from "../lib/utils/common.utils";

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationDto, Utils],
})
export class LocationModule {}
