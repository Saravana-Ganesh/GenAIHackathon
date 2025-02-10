import { Patient } from "src/app/patientDetailModule/model/patient";

export class Appointments {
  title: string = "";
  description: string = "";
  physician: string = "";
  date?: Date;
  fromTime: string = "";
  toTime: string = "";
  history: string = "";
  reason: string = "";
  patient: string;
  id: number;
  deleteFlag: any;
  createdOn: any;
  createdBy: any;
  physicians: any;
  patients: any;
  newData!: any;
  oldData!: any;
  emp_id: any = "";
  stauts:any= "";
  status: any;
}
