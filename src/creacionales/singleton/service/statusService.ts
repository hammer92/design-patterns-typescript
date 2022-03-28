import { StatusModelA } from "../models/statusModelA";
import StatusModelB from "../models/statusModelB";

export class StatusService {
  public changueStatus(): void {
    //cambios de estado en el modelo A
    StatusModelA.Instance.request++;
    StatusModelA.Instance.status = "StatusModelA";
    //cambios de estado en el modelo B
    StatusModelB.request++;
    StatusModelB.status = "StatusModelB";
  }
}
