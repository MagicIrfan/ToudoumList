export class Task {
  constructor(
    public id: number,
    public userId:number,
    public name: string,
    public description:string,
    public finished: boolean,
  ) {}
}
