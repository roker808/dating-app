import { delayMs } from "../core/utils";
import { IDialog } from "./IDialog";

const dialogsKey = 'MSG_D';

class MessagingService {
  async getDialogs(recipient: string) {
    const dialogsRaw = window.localStorage.getItem(dialogsKey);

    await delayMs(1000, undefined);

    if (!dialogsRaw) {
      window.localStorage.setItem(dialogsKey, JSON.stringify([]));
      return [];
    }

    const dialogsAll = JSON.parse(dialogsRaw) as IDialog[];
    return dialogsAll
      .filter(x => x.for === recipient)
      .sort((a, b) => b.messages[b.messages.length - 1].timestamp.getDate() - a.messages[a.messages.length - 1].timestamp.getDate());
  }
}

export const messagingService = new MessagingService();