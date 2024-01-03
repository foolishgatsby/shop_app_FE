import React from "react";

export default function Card() {
  return (
    <div class="card text-center">
      <img
        class="card-img-top"
        src={require("../../assets/img/product01.png.webp")}
        alt="Title"
      />
      <div class="card-body productBody">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Body</p>
      </div>
    </div>
  );
}
