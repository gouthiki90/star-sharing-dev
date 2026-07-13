import { Body, Controller, Get } from "@nestjs/common";

@Controller("location")
export class LocationController {
  @Get("/")
  getLocation(): string {
    return "Location data received";
  }
}
