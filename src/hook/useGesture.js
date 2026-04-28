export const useGesture = (onDoubleTap) => {
  let lastTap = 0;
  
  const handleTouch = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      onDoubleTap();
    }
    lastTap = now;
  };

  return { onTouchStart: handleTouch };
};