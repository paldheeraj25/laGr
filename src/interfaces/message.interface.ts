export interface Message {
  from: string,
  message: string
}


export class IMessage implements Message {
  constructor(
    public from,
    public message
  ) { }
}
