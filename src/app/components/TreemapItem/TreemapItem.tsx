import React, {useMemo} from 'react';
import styles from './treemapItem.module.css';
import useCheckScreenSize from "@/app/hooks/useCheckScreenSize";

interface TreemapItemProps {
  name: string;
  width: number;
  value: number;
}

const TreemapItem: React.FC<TreemapItemProps> = ({name, width, value}) => {
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
      <rect
          className={styles.treemapItem}
          style={{
            width: `${width}%`,
            height: height,
            backgroundColor: color,
          }}
      >
        <div>{name}</div>
        <div>{parseFloat(newValue.toFixed(2))}%</div>
      </rect>
  );
};

export default TreemapItem;
