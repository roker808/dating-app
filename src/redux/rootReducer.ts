import { peopleReducer   } from './people/peopleSlice';
import { appReducer } from './app/appSlice';
import { signInReducer } from './signin/signInSlice';
import { personReducer } from './person/personSlice';
import { dialogsReducer } from './dialogs/dialogsSlice';
import { messagesReducer } from './messages/messagesSlice';

const rootReducer = {
  app: appReducer,
  signIn: signInReducer,
  people: peopleReducer,
  person: personReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer
};

export default rootReducer;
