function OtherPanel({ value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div className="flex w-full">
          <h1 className="text-6xl">Hello World!</h1>
        </div>
      )}
    </div>
  );
}

export default OtherPanel;
