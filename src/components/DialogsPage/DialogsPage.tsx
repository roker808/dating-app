import React from "react";

import { Page } from "../Page/Page";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dialogsActions } from "../../redux/dialogs/dialogsSlice";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";

import './DialogsPage.scss';
import { profilesService } from "../../services/ProfilesService";

export const DialogsPage = () => {

  const { profileId, dialogs } = useAppSelector(state => ({ profileId: state.app.profileId!, dialogs: state.dialogs.dialogs }));

  const dispatch = useAppDispatch();
  const fetchDialogs = () => dispatch(dialogsActions.fetchDialogs(profileId));

  return (
    <Page title="Dialogs" className="dialogs-page" onMount={fetchDialogs}>
      { !dialogs && <Spinner/> }
      { dialogs && !dialogs.length && (
        (<div className="text-center">You have no any dialog. Go to a <Link to="/people">people</Link> and start talk.</div>)
      ) || undefined }
      {
        dialogs && !!dialogs.length && (
          <ul className="dialogs-list">
            {dialogs.map(d => (
                <li key={d.with}>
                  <Link to={`/dialogs/${d.with}`}>
                    <div className="dialog container">
                      <div className="row">
                        <div className="thumb col-2">
                          <img src={profilesService.findProfileUri(d.with)} className="img-fluid" />
                        </div>
                        <div className="col-10">
                          <div>
                            <b>
                              {profilesService.findProfileName(d.with)}
                            </b>
                          </div>
                          <div>{d.messages[d.messages.length - 1].message}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
            ))}
          </ul>
        )
      }
    </Page>
  );
};