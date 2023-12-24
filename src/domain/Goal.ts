import { Story } from "./Story";
import { Record } from "./Record";
import { Timestamp } from "firebase/firestore";

export class Goal {
  constructor(
    public id: string,
    public title: string,
    public goalNum: number,
    public doneNum: number,
    public deadline: Date,
    public records: Record[],
    public story: Story,
    public lastDate: Date,
    public mode: string,
    public isProcessing: boolean
  ) {}

  getRestDate(): number {
    // deadline が Timestamp の場合、Date に変換
    const deadlineDate =
      this.deadline instanceof Timestamp
        ? this.deadline.toDate()
        : this.deadline;

    return Math.ceil(
      (deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  getPase(): number {
    const restDays = this.getRestDate();
    const pase =
      restDays > 0 ? Math.ceil((this.goalNum - this.doneNum) / restDays) : 0;
    return pase;
  }

  getStandardPase(): number {
    const restDays = this.getRestDate();
    const pase = restDays > 0 ? Math.ceil(this.goalNum / restDays) : 0.001;
    return pase;
  }
}
