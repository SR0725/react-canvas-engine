import React from 'react';

const useOnUnmounted = (callback: () => void) => {
  React.useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};

export default useOnUnmounted;
