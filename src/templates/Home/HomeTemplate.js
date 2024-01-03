import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "../../components/Headers/HomeHeader/HomeHeader";
import HomeFooter from "../../components/Footers/HomeFooter";

export default function HomeTemplate(props) {
  return (
    <Fragment>
      <HomeHeader />
      <Outlet />
      <HomeFooter />
    </Fragment>
  );
}
