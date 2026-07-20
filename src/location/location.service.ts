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
import { AuthService } from "../auth/auth.service";

@UseFilters(ErrorHandler)
@Injectable()
export class LocationService {
  constructor(
    private locationDto: LocationDto,
    private readonly prisma: PrismaService,
    private readonly utils: Utils,
    private readonly authService: AuthService
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

      /** db insert 후 토큰값 생성 */
      const userToken = this.authService.createAccessToken(id);

      console.log({ userToken });

      return { success: true, userToken };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
