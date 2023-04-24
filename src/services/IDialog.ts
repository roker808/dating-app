import { IMessage } from "./IMessage";

export interface IDialog {
  for: string;
  with: string;
  messages: IMessage[]
}

