import { useState, useEffect } from "react";
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Eslatma: component mount bo‘lganida event listener o‘rnatamiz
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Dastlabki o‘lchamni olish
    handleResize();

    window.addEventListener("resize", handleResize);
    // Component unmount bo‘lganda listenerni tozalash
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
