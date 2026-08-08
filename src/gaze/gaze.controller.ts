import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { ErrorHandler } from "../common/error-handler";
import { LocationDto } from "./dto/location.dto";
import { GazeService } from "./gaze.service";

@UseFilters(ErrorHandler)
@Controller("gazes")
export class GazesController {
  constructor(private readonly gazeService: GazeService) {}

  @Post()
  getLocation(@Body() locationDto: LocationDto) {
    return this.gazeService.getLocation(locationDto);
  }

  /** 일단 서드파티 테스트 */
  // @Post()
  // getStarFromUserLocation() {}
}
