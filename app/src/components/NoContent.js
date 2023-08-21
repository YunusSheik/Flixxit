import React from "react";
import "./listItemsMain/ListItemsMain.css";

export default function NoContent() {
  return (
    <div className="content-list">
      <span className="list-titles">Flixxit Movies</span>
      <div className="slides">
        <h4 className="no-content">No content available for selected genre.</h4>
      </div>
    </div>
  );
}
