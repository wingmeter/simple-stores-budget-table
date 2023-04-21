import PropTypes from "prop-types";

import styles from "./Table.module.css";
import { months } from "../../../utils/constants";

export default function Table({
  tableData,
  handlePriceChange,
  calculateStoreTotal,
  calculateColumnTotal,
  calculateOverallTotal,
}) {
  if (!tableData.length) {
    return <div>Loading data...</div>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Store</th>
          {months.map((month) => (
            <th key={month}>{month}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {tableData?.map((storeData, storeIndex) => (
          <tr key={storeIndex}>
            <td>{storeData.store.name}</td>
            {storeData.months?.map((price, monthIndex) => (
              <td key={monthIndex}>
                <input
                  type="number"
                  value={price.value || ""}
                  onChange={(e) => handlePriceChange(e, storeIndex, monthIndex)}
                />
              </td>
            ))}
            <td>${calculateStoreTotal(storeData)}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          {[...Array(12).keys()]?.map((monthIndex) => (
            <td key={monthIndex}>${calculateColumnTotal(monthIndex)}</td>
          ))}
          <td className={styles.totalOfTotals}>${calculateOverallTotal()}</td>
        </tr>
      </tbody>
    </table>
  );
}

Table.propTypes = {
  handlePriceChange: PropTypes.func,
  calculateStoreTotal: PropTypes.func,
  calculateColumnTotal: PropTypes.func,
  calculateOverallTotal: PropTypes.func,
  tableData: PropTypes.array,
};
