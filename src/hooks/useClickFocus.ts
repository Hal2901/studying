import { useState, useEffect, useRef } from 'react';

const useClickFocus = (intialState: boolean = false) => {
  const [clickShow, setClickShow] = useState<boolean>(intialState);
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const handleClickInside = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setClickShow(false);
  };
  const handleHover = (e: any) => {
    if (ref1.current && ref1.current.contains(e.target)) {
      setClickShow((prev) => !prev);
    }
    if (
      ref2.current &&
      !ref2.current.contains(e.target) &&
      ref1.current &&
      ref1.current.contains(e.target)
    ) {
      return;
    } else if (ref2.current && !ref2.current.contains(e.target)) {
      setClickShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleHover);

    return () => {
      document.removeEventListener('click', handleHover);
    };
  }, [clickShow]);

  return {
    handleClickInside,
    clickShow,
    setClickShow,
    ref1,
    ref2,
  };
};

export default useClickFocus;
