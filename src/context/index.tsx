import { ReactNode, createContext, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import { productFilter } from "../types/productType";

type Props = {
  children: ReactNode;
};
type contextProps = {
  showModal: boolean;
  productFilter?: productFilter[];
  closeModal: () => void;
  setModal: (element: JSX.Element) => void;
  handleActiveProductFilter: (
    ValueFilter: productFilter,
    indexValue: number
  ) => void;
  setProductFilter: (value: any) => void;
};
export const ModalContext = createContext<contextProps>({
  showModal: false,
  closeModal: () => {},
  setModal: (element: JSX.Element) => {},
  handleActiveProductFilter: (
    ValueFilter: productFilter,
    indexValue: number
  ) => [],
  setProductFilter: () => undefined,
});

export default function ModalContextNode({ children }: any) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>(<></>);
  const [productFilter, setProductFilter] = useState<productFilter[]>();

  const id =
    typeof window === "object" && document.getElementById("modal-root");
  const setModal = (element: JSX.Element) => {
    setShowModal(true);
    setContentModal(element);
  };
  const closeModal = () => {
    setShowModal(false);
    setContentModal(<></>);
  };

  const handleActiveProductFilter = (
    ValueFilter: productFilter,
    indexValue: number
  ) => {
    const value = ValueFilter.list[indexValue];
    if (productFilter) {
      const indexValue = productFilter.findIndex(
        (it) => it.id === ValueFilter.id
      );
      if (indexValue >= 0) {
        const checkValue = productFilter[indexValue].list.findIndex(
          (it) => it?.value === value?.value
        );
        const prFilterIndex = productFilter[indexValue];
        if (checkValue >= 0) {
          if (productFilter[indexValue].list.length === 1) {
            const newValueFilter = productFilter.filter(
              (pr) => pr.id !== ValueFilter.id
            );
            setProductFilter(newValueFilter);
            return;
          }
          prFilterIndex.list = prFilterIndex.list.filter(
            (vl) => vl.value !== value.value
          );
        } else {
          prFilterIndex.list.push(value);
        }
        const newProductFilter = productFilter.map((pr) => {
          if (pr.id == ValueFilter.id) {
            return prFilterIndex;
          }
          return pr;
        });
        setProductFilter(newProductFilter);
      } else {
        const newValueFilter = { ...ValueFilter };
        newValueFilter.list = [value];
        setProductFilter([...productFilter, newValueFilter]);
      }
    } else {
      const newValueFilter = { ...ValueFilter };
      newValueFilter.list = [value];
      setProductFilter([newValueFilter]);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        productFilter,
        closeModal,
        setModal,
        handleActiveProductFilter,
        setProductFilter,
      }}
    >
      {children}
      {showModal &&
        id &&
        createPortal(<Modal onClose={closeModal}>{contentModal}</Modal>, id!)}
    </ModalContext.Provider>
  );
}
