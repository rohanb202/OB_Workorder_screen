import { useState } from "react";
import Drawer from "@mui/material/Drawer";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

// import PropTypes from "prop-types";\
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainTabPanel from "./components/MainTabPanel";
import OtherPanel from "./components/OtherPanel";
import DataTable from "./components/DataTable";
import Button from "@mui/material/Button";

import BasicDatePicker from "./components/DatePicker";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const client = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D",
    label: "D",
  },
];
function App() {
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState("A");
  const [RFQ, setRFQ] = useState("");
  const [packages, setPackages] = useState({});
  const BackIcon = ({ className }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    );
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const submissionHandler = () => {
    // console.log(startDate);
    console.log({
      startDate: startDate.$d,
      endDate: endDate.$d,
      selectedClient,
      RFQ,
      packages,
    });
  };
  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <BackIcon className="w-5 cursor-pointer" />
          <h1 className="text-2xl font-semibold">Create Workorder</h1>
        </div>

        <Button
          onClick={() => {
            setOpenDrawer(true);
          }}
          className="!bg-sky-400 w-20"
          variant="contained"
        >
          Save
        </Button>
      </div>
      <div className="py-5">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab className="w-60" label="Overview" {...a11yProps(0)} />
              <Tab className="w-60" label="Other" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <MainTabPanel
            value={value}
            index={0}
            packages={packages}
            setPackages={setPackages}
          />
          <OtherPanel value={value} index={1} />
          <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(false);
            }}
          >
            <div className="w-80 rounded-md p-5 flex flex-col space-y-8">
              <h1 className="text-xl font-semibold">Workorder</h1>
              <TextField
                value={selectedClient}
                onChange={(e) => {
                  setSelectedClient(e.target.value);
                }}
                id="client-selection"
                select
                label="Client"
              >
                {client.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <BasicDatePicker
                value={startDate}
                setValue={setStartDate}
                label={`Date of commencement`}
              />
              <BasicDatePicker
                value={endDate}
                setValue={setEndDate}
                label={`Date of complition`}
              />
              <TextField
                value={RFQ}
                onChange={(e) => {
                  setRFQ(e.target.value);
                }}
                label="RFQ Code"
              />
              <Button
                onClick={() => {
                  setOpenDrawer(false);
                  submissionHandler();
                }}
                className="!bg-sky-400 w-20"
                variant="contained"
              >
                Done
              </Button>
            </div>
          </Drawer>
        </Box>
      </div>
    </div>
  );
}

export default App;
