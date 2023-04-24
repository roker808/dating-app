import React from "react";
import { ProfileCard } from "./ProfileCard";
import { IPeopleState, peopleActions } from "../../redux/people/peopleSlice";
import { connect } from "react-redux";
import { IProfile } from "../../services/Profile";
import { Action } from "@reduxjs/toolkit";
import { Page } from "../Page/Page";

import './PeoplePage.scss';
import { Spinner } from "../Spinner";

interface IPeoplePageParams {
  profiles?: IProfile[];
  fetchProfiles: () => void
}


class PeoplePageComponent extends React.PureComponent<IPeoplePageParams> {
  render() {
    return (
      <Page title="People" className="people-page">
        <div className="cards">
          {
            !this.props.profiles && (
              <Spinner/>
            ) || (
              this.props.profiles!.map(p => <ProfileCard key={p.id} profile={p}/>)
            )
          }
        </div>
      </Page>
    );
  }

  componentDidMount(): void {
    this.props.fetchProfiles();
  }
}

const mapStateToProps = (state: {people: IPeopleState }) => ({ profiles: state.people.profiles });

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({ fetchProfiles: () => dispatch(peopleActions.fetchProfiles()) });

export const PeoplePage = connect(mapStateToProps, mapDispatchToProps)(PeoplePageComponent)