export interface IMessage {
  id: Number;
  name: string;
  asNamespace: string;
  asClass: string;
  confident: boolean;
}

export interface IMessages {
  outgoing: IMessage[];
  incoming: IMessage[];
}

export interface IReceivedData {
  lastCheckedAt: string;
  messages: IMessages;
}