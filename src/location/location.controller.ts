import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";
import { LocationService } from "./location.service";
import { ErrorHandler } from "../common/error-handler";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseFilters(ErrorHandler)
@Controller("location")
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Post()
  getLocation(@Body() locationDto: LocationDto) {
    return this.locationService.getLocation(locationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  forGuardTest() {
    return "sent req";
  }
}
