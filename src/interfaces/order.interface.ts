export interface Order {
  list: Array<string>,
  address: string
}


export class IOrder implements Order {
  constructor(
    public list,
    public address
  ) { }
}
