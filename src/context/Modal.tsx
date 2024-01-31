import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}
export default function Modal({ children, onClose }: Props) {
  return (
    <div className="fixed top-0 bottom-0 z-max bg-overlay w-screen h-screen flex items-center justify-center">
      <div
        className="absolute top-0 bottom-0 w-screen h-screen"
        onClick={onClose}
      ></div>
      <div className="z-max">{children}</div>
    </div>
  );
}
