export class Task {
  constructor(
    public id: string,
    public title: string,
    public goalNum: number,
    public doneNum: number,
    public isDone: boolean,
    public deadline: Date
  ) {}
}
