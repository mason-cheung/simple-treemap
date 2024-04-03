import React from 'react';
import styles from './Treemap.module.css';
import TreemapItem from "@/app/components/TreemapItem/TreemapItem";

interface TreemapDataItem {
  name: string;
  value: number;
  weight: number;
}

interface TreemapProps {
  data: TreemapDataItem[];
  rowNumber: number;
}

const Treemap: React.FC<TreemapProps> = ({data, rowNumber}) => {
  // Sort data in descending order based on weight
  const sortedData = [...data].sort((a, b) => b.weight - a.weight);

  const itemsPerRow = Math.ceil(sortedData.length / rowNumber);

  // Split data into rows
  const rows = [];
  for (let i = 0; i < rowNumber; i++) {
    rows.push(sortedData.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
  }

  // Calculate total weight for all items
  const totalWeight = sortedData.reduce((sum, item) => sum + item.weight, 0);

  if (data.length === 0) {
    return (
        <div className={styles.emptyDataContainer}>
          <div className={styles.noDataMessage}>No data available</div>
        </div>
    )
  }

  return (
      <div className={styles.treemapContainer}>
        {rows.map((row, rowIndex) => {
          // Calculate total weight for this row
          const totalRowWeight = row.reduce((sum, item) => sum + item.weight, 0);

          return (
              <div key={rowIndex} className={styles.treemapRow}>
                {row.map((item, index) => {
                  // Calculate width based on item's weight relative to total weight
                  const width = (item.weight / totalRowWeight) * 100;

                  return (
                      <TreemapItem
                          key={index}
                          name={item.name}
                          width={width}
                          value={item.value}
                      />
                  );
                })}
              </div>
          );
        })}
      </div>
  );
};

export default Treemap;



