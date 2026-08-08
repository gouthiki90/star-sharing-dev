import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Utils } from "../lib/utils/common.utils";
import { AuthService } from "../auth/auth.service";
import { MakeTime, Horizon, Constellation, Observer } from "astronomy-engine";

@Injectable()
export class GazeService {
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
      /** 1. 일단 db 먼저 넣기 */
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

      /** 2. 별자리 찾는 계산 로직 넣기 */

      /** 마지막으로 토큰 생성 후, 결과값이랑 같이 보내기 */

      /** db insert 후 토큰값 생성 */
      const userToken = this.authService.createAccessToken(id);

      console.log({ userToken });

      this.getConstellation(data);

      return { success: true, userToken };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  private getConstellation(locationDto: LocationDto) {
    const { latitude, longitude, local_time } = locationDto;
    try {
      // 1️⃣ 시간을 Astronomy Engine 시간 규격으로 변환
      const time = MakeTime(this.utils.parseDateForm(local_time));

      console.log("Astronomy Engine Time:", time);

      // 2️⃣ 내 관측 위치 설정 (위도, 경도, 고도m)
      const observer = new Observer(latitude ?? 0, longitude ?? 0, 0);

      console.log("Observer Location:", observer);

      // 3️⃣ '내 머리 바로 위'(고도 90도) 좌표의 적경(RA)과 적위(Dec) 구하기
      // Horizon(time, observer, altitude, azimuth)
      const zenithEquator = Horizon(time, observer, 90, 0, "normal");

      // 4️⃣ 해당 하늘 좌표가 속한 별자리 탐색 (IAU 88개 별자리 기준)
      const result = Constellation(zenithEquator.ra, zenithEquator.dec);

      console.log("별자리 결과:", result);
      // return result;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
