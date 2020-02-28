import React, { Component } from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';


type AllProps =  RouteComponentProps<{}>;

class Header extends Component<AllProps, {}> {
    render() {
        const {  location, history } = this.props;

        return (
            <div className="Head">
                <div className="Head__Container">
                    <div className="Head__Top">
                        <div className="Head__Breadcrumbs">
                            <span className="Head__Breadcrumb Head__Breadcrumb--Disabled">Account</span>
                            <span className="Head__Breadcrumb Head__Breadcrumb--Separator">
                                {/* <Icon svgPaths={IconChevronRight} /> */}
                            </span>
                            <div className="Head__Breadcrumb Head__Breadcrumb--Active">
                                {/* {getCurrentPageTitle(location.pathname)} */}
                            </div>
                        </div>
                    </div>
                    <div className="Head__Bottom">
                        <div className="Head__Tabs">
                          Moviefinder
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Header)