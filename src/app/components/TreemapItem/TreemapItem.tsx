import React, {useMemo, useState} from 'react';
import styles from './treemapItem.module.css';
import useCheckScreenSize from "@/app/hooks/useCheckScreenSize";

interface TreemapItemProps {
  name: string;
  width: number;
  value: number;
  title?: string;
}

const TreemapItem: React.FC<TreemapItemProps> = (props) => {
  const {name, width, value, title} = props;
  const screenSize = useCheckScreenSize();
  const newValue = value * 100

  // Determine color based on value
  const color = newValue < 0 ? 'red' : 'green';

  const height = useMemo(() => {
    switch (screenSize.deviceType) {
      case 'mobile':
        return 150;
      case 'tablet':
        return 175;
      case 'desktop':
        return 200;
      default:
        return 200;
    }
  }, [screenSize]);


  return (
      <div
          className={styles.treemapItem}
          style={{
            width: `${width}%`,
            height: height,
            backgroundColor: color,
          }}
          title={title}
      >
        <div style={{fontSize: 20}}>{name}</div>
        <div style={{fontSize: 16}}>{parseFloat(newValue.toFixed(2))}%</div>
      </div>
  );
};

export default TreemapItem;
