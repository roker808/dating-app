import React from "react";

import { Page } from "../Page/Page";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dialogsActions } from "../../redux/dialogs/dialogsSlice";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";

export const DialogsPage = () => {

  const { profileId, dialogs } = useAppSelector(state => ({ profileId: state.app.profileId!, dialogs: state.dialogs.dialogs }));

  const dispatch = useAppDispatch();
  const fetchDialogs = () => dispatch(dialogsActions.fetchDialogs(profileId));


  return (
    <Page title="Dialogs" className="dialogs-page" onMount={fetchDialogs}>
      { dialogs || <Spinner/> }
      { dialogs && !dialogs.length && (
        (<div className="text-center">You have no any dialog. Go to a <Link to="/people">people</Link> and start talk.</div>)
      ) || undefined }
      {
        dialogs && !!dialogs.length && (
          <ul className="dialogs-list">
            {dialogs.map(d => (
                <li key={d.with}>
                  <Link to={`/dialogs/${d.with}`}></Link>
                </li>
            ))}
          </ul>
        )
      }
    </Page>
  );
};