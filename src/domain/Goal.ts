export class Goal {
  constructor(
    public id: string,
    public title: string,
    public goalNum: number,
    public doneNum: number,
    public isDone: boolean,
    public deadline: Date,
    public records: Record[]
  ) {}

  getRestDate(): number {
    return Math.ceil(
      (this.deadline.getTime() - new Date().getTime()) / 86400000
    );
  }

  getPase(): number {
    const pase = Math.ceil((this.goalNum - this.doneNum) / this.getRestDate());
    console.log(pase);
    return pase > 0 ? pase : 0;
  }
}

export class Record {
  constructor(public description: string) {}
}
