import { useEffect, useRef } from "react";

export const useSyncedScroll = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (!left || !right) return;

    let isLeftScrolling = false;
    let isRightScrolling = false;
    let timeOut: ReturnType<typeof setTimeout>;
    let lastLeftScroll = 0;
    let lastRightScroll = 0;

    const customDebounce = (tracker: "left" | "right") => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        if (tracker === "left") {
          isLeftScrolling = false;
          lastLeftScroll = left.scrollTop;
        } else {
          isRightScrolling = false;
          lastRightScroll = right.scrollTop;
        }
      }, 100);
    };

    const onLeftScroll = (e: Event) => {
      if (!isRightScrolling) {
        isLeftScrolling = true;
        customDebounce("left");

        const leftEl = e.target as HTMLDivElement;
        const delta = leftEl.scrollTop - lastLeftScroll;
        right.scrollTop += delta;
        lastLeftScroll = leftEl.scrollTop;
      }
    };

    const onRightScroll = (e: Event) => {
      if (!isLeftScrolling) {
        isRightScrolling = true;
        customDebounce("right");

        const rightEl = e.target as HTMLDivElement;
        const delta = rightEl.scrollTop - lastRightScroll;
        left.scrollTop += delta;
        lastRightScroll = rightEl.scrollTop;
      }
    };

    left.addEventListener("scroll", onLeftScroll);
    right.addEventListener("scroll", onRightScroll);

    return () => {
      left.removeEventListener("scroll", onLeftScroll);
      right.removeEventListener("scroll", onRightScroll);
      clearTimeout(timeOut);
    };
  }, []);

  return { leftRef, rightRef };
};
