import React from "react";

import { Page } from "../Page/Page";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate, useParams } from "react-router-dom";
import { messagesActions } from "../../redux/messages/messagesSlice";
import { defThumb } from "../../constants";

import './MessengerPage.scss';
import classNames from "classnames";

export const MessengerPage = () => {

  const { other } = useParams();
  const { messages, myId, otherProfile } = useAppSelector(state => ({
    messages: state.messages.messages,
    myId: state.app.profileId!,
    otherProfile: state.messages.otherProfilie
  }));

  if (other === myId) {
    return <Navigate to="/dialogs"/>
  }

  const dispatch = useAppDispatch();
  const fetchMessages = () => dispatch(messagesActions.fetchMessages([myId, other!]))
  const fetchOtherProfile = () => dispatch(messagesActions.fetchOtherProfile(other!));

  const init = () => { fetchMessages(); fetchOtherProfile(); };

  const msgTxt = useAppSelector(state => state.messages.newMessage);
  const msgTxtChanged = (evt: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(messagesActions.newMessageChanged(evt.target.value));

  const addNewMessage = () => dispatch(messagesActions.addNewMessage([myId, otherProfile!.id, msgTxt]));

  return (
    <Page title="Messages" className="messages-page" onMount={init}>
      {otherProfile && <div className="other-header container">
        <div className="row">
          <div className="col-1">
            <img src={otherProfile?.thumbnailUri ?? defThumb} className="img-fluid thumb" />
          </div>
          <div className="col-11">
             <div className="name"><span className="online"/> {otherProfile.name}</div>
          </div>
        </div>
      </div>}

      {
        messages && (
          <div className="messanger-ui">
            <div className="history">
              {
                messages && messages.map(m => (
                  <div key={`${m.senderId}${m.recipientId}${m.timestamp}`} className={classNames('message', m.senderId === myId ? 'me-sender' : 'other-sender')}>
                    <p className="text">{m.message}</p>
                  </div>
                ))
              }

            </div>
            <div className="controls">
              <textarea rows={2} className="form-control mb-3" value={msgTxt} onChange={msgTxtChanged}/>
              <button className="btn btn-primary" onClick={addNewMessage}>Send</button>
            </div>
          </div>
        )
      }
    </Page>
  );
};