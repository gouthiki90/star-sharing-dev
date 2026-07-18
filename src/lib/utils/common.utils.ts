import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { parse } from "date-fns";

@Injectable()
export class Utils {
  /** id 생성 */
  getId = (modelName: string) => {
    return `${modelName}_${crypto.randomUUID().replace(/-/g, "")}`;
  };

  /** 날짜 파싱 */
  parseDateForm = (date?: string) => {
    if (!date)
      throw new InternalServerErrorException("IN parseDateForm: none data");
    /** local_time: '07/18/2026, 17:52:18' 형식을 timestamp로 변환 */
    return parse(date, "MM/dd/yyyy, HH:mm:ss", new Date());
  };
}
