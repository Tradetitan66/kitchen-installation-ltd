import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type EnquiryContextValue = {
  isOpen: boolean;
  openEnquiry: () => void;
  closeEnquiry: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquiry = useCallback(() => setIsOpen(true), []);
  const closeEnquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openEnquiry, closeEnquiry }),
    [isOpen, openEnquiry, closeEnquiry],
  );

  return (
    <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}