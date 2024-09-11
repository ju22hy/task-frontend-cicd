import React from "react";
import Navbar from "../Navbar";
import ItemPanel from "../ItemPanel";

const index = () => {
  return (
    <div className="page_section">
      <Navbar menuIdx={3} />
      <ItemPanel
        pageTitle="Completed Items"
        filterCompleted="all"
        filterImportant={true}
      />
    </div>
  );
};

export default index;
