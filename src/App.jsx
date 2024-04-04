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
const XIcon = ({ className }) => {
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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
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
      startDate: startDate?.$d,
      endDate: endDate?.$d,
      selectedClient,
      RFQ,
      packages,
    });
  };
  return (
    <div className="m-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <BackIcon className="w-4 cursor-pointer md:w-5" />
          <h1 className="text-xl font-semibold md:text-2xl">
            Create Workorder
          </h1>
        </div>

        <Button
          onClick={() => {
            setOpenDrawer(true);
          }}
          className="!bg-sky-400 md:w-20"
          variant="contained"
        >
          Save
        </Button>
      </div>
      <div className="py-5">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab className="md:w-60" label="Overview" {...a11yProps(0)} />
              <Tab className="md:w-60" label="Other" {...a11yProps(1)} />
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
            <div className="flex flex-col p-5 space-y-8 rounded-md w-80">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-xl">Workorder</h1>
                <button
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                >
                  <XIcon className="w-5" />
                </button>
              </div>
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
                label={`Date of completion`}
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
