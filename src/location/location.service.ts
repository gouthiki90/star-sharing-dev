import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UseFilters,
} from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";
import { ErrorHandler } from "../common/error-handler";
import { PrismaService } from "../prisma/prisma.service";
import { Utils } from "../lib/utils/common.utils";

@UseFilters(ErrorHandler)
@Injectable()
export class LocationService {
  constructor(
    private locationDto: LocationDto,
    private prisma: PrismaService,
    private utils: Utils
  ) {}
  async getLocation(data: LocationDto) {
    if (!data) throw new InternalServerErrorException("none data");

    /** id 생성 */
    const id = this.utils.getId("location");
    const { latitude, longitude, local_time } = data;

    try {
      await this.prisma.location.create({
        data: {
          id,
          latitude: latitude ?? 0,
          longitude: longitude ?? 0,
          local_time: this.utils.parseDateForm(local_time),
          create_date: new Date(),
          update_date: new Date(),
        },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
