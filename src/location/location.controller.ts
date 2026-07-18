import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";
import { LocationService } from "./location.service";
import { ErrorHandler } from "../common/error-handler";

@UseFilters(ErrorHandler)
@Controller("location")
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Post()
  getLocation(@Body() locationDto: LocationDto) {
    return this.locationService.getLocation(locationDto);
  }
}
