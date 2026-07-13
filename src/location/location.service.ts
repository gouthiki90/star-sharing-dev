import { Injectable } from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";

@Injectable()
export class LocationService {
  async getLocation(data: LocationDto) {}
}
