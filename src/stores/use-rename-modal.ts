import { create } from "zustand";

type State = {
    id: string;
    title: string;
};

type RenameModal = {
    isOpen: boolean;
    initialValues: State;
    onOpen: (values: State) => void;
    onClose: () => void;
};

export const useRenameModal = create<RenameModal>((set) => ({
    isOpen: false,
    initialValues: {
        id: "",
        title: "",
    },
    onOpen: (values) => set({ isOpen: true, initialValues: values }),
    onClose: () => set({ isOpen: false }),
}));
