import { useEffect, useState } from "react";
import Table from "./UI/table/Table";

const Main = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("mock_stores.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableData = data.slice(0, 12);

  function handlePriceChange(e, storeIndex, monthIndex) {
    const { value } = e.target;
    const newData = [...tableData];
    newData[storeIndex].months[monthIndex].value = value;
    setData(newData);
  }

  function calculateStoreTotal(storeData) {
    let total = 0;
    for (let i = 0; i < 12; i++) {
      const monthValue = parseFloat(storeData.months[i].value);
      if (!isNaN(monthValue)) {
        total += monthValue;
      }
    }
    return total.toFixed(2);
  }

  function calculateOverallTotal() {
    let total = 0;
    tableData.forEach((storeData) => {
      total += parseFloat(calculateStoreTotal(storeData));
    });
    return total.toFixed(2);
  }

  function calculateColumnTotal(monthIndex) {
    let total = 0;
    tableData.forEach((storeData) => {
      const monthValue = parseFloat(storeData.months[monthIndex].value);
      if (!isNaN(monthValue)) {
        total += monthValue;
      }
    });
    return total.toFixed(2);
  }

  return (
    <div className="main">
      <div className="container">
        <Table
          handlePriceChange={handlePriceChange}
          calculateColumnTotal={calculateColumnTotal}
          calculateOverallTotal={calculateOverallTotal}
          calculateStoreTotal={calculateStoreTotal}
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default Main;
