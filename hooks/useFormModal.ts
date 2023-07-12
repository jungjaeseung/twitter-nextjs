import { create } from "zustand";

interface FormStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFormModal = create<FormStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormModal;
