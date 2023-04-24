import classNames from "classnames";
import React, { PureComponent } from "react";

import './Page.scss';
import { PageTitle } from "../PageTitle";

interface IPageProps {
  title?: string;
  children: any;
  className?: string;
  contentClassName?: string;
  onMount?: () => void 
}

export class Page extends PureComponent<IPageProps> {
  render() {
    const { children, title, className, contentClassName } = this.props;

      return (
        <>
          <PageTitle pageName={title}/>
          <div className={classNames('page', className)}>
            {title && <h2 className='title'>{title}</h2>}
            <div className={classNames('page-content', contentClassName)}>
              {children}
            </div>
          </div>
        </>
      );
  }

  componentDidMount() {
      this.props.onMount && this.props.onMount!();
  }
}

// export const Page: React.FC<IPageProps> = ({ children, title, className, contentClassName }) => (
//   <>
//     <PageTitle pageName={title}/>
//     <div className={classNames('page', className)}>
//       {title && <h2 className='title'>{title}</h2>}
//       <div className={classNames('page-content', contentClassName)}>
//         {children}
//       </div>
//     </div>
//   </>
// );