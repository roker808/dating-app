import React from "react";
import { Helmet } from 'react-helmet';
import { IAppState } from "../redux/app/appSlice";
import { connect } from "react-redux";

interface IPageTitleProps {
  appName: string;
  pageName?: string
}

class PageTitleComponent extends React.PureComponent<IPageTitleProps> {
  render() {
    const { pageName, appName } = this.props;
    return (
      <Helmet>
        <title>{appName}{ pageName && ( ' | ' + pageName ) }</title>
      </Helmet>
    );
  }
}

function mapStateToProps(state: { app: IAppState }) {
  return { appName: state.app.appName };
}

export const PageTitle = connect(mapStateToProps)(PageTitleComponent);