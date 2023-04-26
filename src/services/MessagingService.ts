import { delayMs } from "../core/utils";
import { IDialog } from "./IDialog";
import { IMessage } from "./IMessage";
import {boundMethod} from 'autobind-decorator'

const dialogsKey = 'MSG_D';

class MessagingService {

  @boundMethod
  async getDialogs(recipient: string) {
    await delayMs(1000, undefined);

    const dialogsAll = this.getDialogsInternal();
    return dialogsAll
      .filter(x => x.for === recipient)
      .sort((a, b) => b.messages[b.messages.length - 1].timestamp- a.messages[a.messages.length - 1].timestamp);
  }

  @boundMethod
  async getMessages(user: string, other: string) {
    const dialogs = await this.getDialogs(user);
    return dialogs.find(x => x.for === user && x.with === other)?.messages ?? [];
  }

  @boundMethod
  async add(sender: string, recipient: string, message: string) {
    const now = new Date();

    const msg: IMessage = {
      senderId: sender,
      recipientId: recipient,
      message: message,
      timestamp: now.getDate()
    };

    let dialogsAll = this.getDialogsInternal();

    dialogsAll = this.updateDialogInternal(dialogsAll, sender, recipient, msg);
    dialogsAll = this.updateDialogInternal(dialogsAll, recipient, sender, msg);
    
    this.setDialogsInternal(dialogsAll);

    await delayMs<undefined>(200, undefined);

    return msg;
  }

  

  private getDialogsInternal() {
    const dialogsRaw = window.localStorage.getItem(dialogsKey);

    if (!dialogsRaw) {
      window.localStorage.setItem(dialogsKey, JSON.stringify([]));
      return [];
    }

    return JSON.parse(dialogsRaw) as IDialog[];
  }

  private setDialogsInternal(dialogs: IDialog[]) {
    window.localStorage.setItem(dialogsKey, JSON.stringify(dialogs));
  }

  private updateDialogInternal(dialogs: IDialog[], sender: string, recipient: string, message: IMessage) {
    const dialogIndex = dialogs.findIndex(x => x.for === sender && x.with === recipient);
    let senderDialog = dialogIndex === -1 ? undefined : dialogs[dialogIndex];

    if (!senderDialog) {
      senderDialog = {
        for: sender,
        with: recipient,
        messages: []
      };
    } else {
      dialogs.splice(dialogIndex, 1);
    }

    senderDialog.messages.push(message);
    dialogs.splice(0, 0, senderDialog);

    return dialogs.sort((f, s) => -(f.messages[f.messages.length - 1].timestamp - s.messages[s.messages.length - 1].timestamp));
  }
}

export const messagingService = new MessagingService();