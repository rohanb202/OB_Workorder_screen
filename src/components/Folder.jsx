import { useState } from "react";

function Folder({ data }) {
  //   console.log(data);
  const [expand, setExpand] = useState(false);
  return (
    <div className="border relative">
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="col-span-1">
          <h2
            className={`font-bold cursor-pointer gap-1 ${
              data.isFolder && expand ? "relative left-10" : ""
            }`}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {data.name}
          </h2>
        </div>
        <div className="col-span-1">
          <p>Rate: {data.rate_per_sqft}</p>
        </div>
        <div className="col-span-1">
          <p>Total: {data.total_expenditure}</p>
        </div>
      </div>
      {data.isFolder && expand && (
        <div>
          {data.contents.map((item, index) => (
            <Folder key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
  //   if (data?.isFolder) {
  //     return (
  //       <div className="grid grid-col-3">
  //         <div
  //           className="col-start-1"
  //           onClick={() => {
  //             setExpand(!expand);
  //           }}
  //         >
  //           {data?.name}
  //         </div>

  //         <div className={`${expand ? "block" : "hidden"} pl-2 col-start-1`}>
  //           {data.contents.map((item) => {
  //             return <Folder data={item}>Folder {item?.name}</Folder>;
  //           })}
  //         </div>
  //         <div className="col-start-2">{data?.rate_per_sqft}</div>
  //         <div className="col-start-3">{data?.rate_per_sqft}</div>
  //       </div>
  //     );
  //   } else {
  //     return <div>File {data?.name}</div>;
  //   }
}

export default Folder;
