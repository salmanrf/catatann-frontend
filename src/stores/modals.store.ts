import { create } from 'zustand';

export type MODAL_NAMES =
  | ''
  | 'CREATE_NOTE'
  | 'UPDATE_NOTE'
  | 'LOGIN'
  | 'SIGNUP';

export interface ModalsState<T> {
  isOpen: boolean;
  data: T | null;
  active_name: MODAL_NAMES;
  onOpen: <T>(name: MODAL_NAMES, data?: T) => void;
  onClose: () => void;
}

export const useModalsStore = create<ModalsState<unknown>>((set) => ({
  isOpen: false,
  active_name: '',
  data: null,
  onOpen: (name, data) => {
    set(({ active_name, ...prev }) => ({
      ...prev,
      data,
      isOpen: true,
      active_name: name,
    }));
  },
  onClose: () => {
    set(({ isOpen, ...prev }) => ({
      ...prev,
      isOpen: false,
      active_name: '',
      data: null,
    }));
  },
}));
