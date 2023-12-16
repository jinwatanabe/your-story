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
}

export class Record {
  constructor(public description: string) {}
}
