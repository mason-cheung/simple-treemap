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
  const sortedData = [...data].sort((a, b) => b.weight - a.weight);

  const itemsPerRow = Math.ceil(sortedData.length / rowNumber);

  const rows = [];
  for (let i = 0; i < rowNumber; i++) {
    rows.push(sortedData.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
  }

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
          const totalRowWeight = row.reduce((sum, item) => sum + item.weight, 0);

          return (
              <div key={rowIndex} className={styles.treemapRow}>
                {row.map((item, index) => {
                  const width = (item.weight / totalRowWeight) * 100;
                  const tooltip = `Name: ${item.name}\nValue: ${item.value}\nWeight: ${item.weight}`;

                  return (
                      <TreemapItem
                          key={index}
                          name={item.name}
                          width={width}
                          value={item.value}
                          title={tooltip}
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



