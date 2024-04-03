import {useEffect, useState} from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ScreenSizeState {
  deviceType: DeviceType;
}

const useCheckScreenSize = (): ScreenSizeState => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {deviceType};
};

export default useCheckScreenSize;
