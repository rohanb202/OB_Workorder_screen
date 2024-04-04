import { useState } from "react";

// import Folder from "./Folder";
import DataTable from "./DataTable";

// import Table from "./Table";

function MainTabPanel({ value, index, packages, setPackages }) {
  // console.log(MainData);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {/* {value === index && (
        <div>
          <div></div>
          {data.map((item) => (
            <Folder data={item} />
          ))}
        </div>
      )} */}
      {/* <Table /> */}
      <DataTable packages={packages} setPackages={setPackages} />
    </div>
  );
}

export default MainTabPanel;
