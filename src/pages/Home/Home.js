import React, { Fragment } from "react";
import NavBar from "../../components/Navigation/NavBar";
import Collection from "../../components/Collection/Collection";
import NewProduct from "../../components/NewProduct/NewProduct";
import HotDeal from "../../components/HotDeal/HotDeal";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

export default function Home(props) {
  return (
    <Fragment>
      <NavBar />
      <Collection />
      <NewProduct />
      <HotDeal />
      <NewsLetter />
    </Fragment>
  );
}
