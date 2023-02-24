import { create } from 'zustand';

export type MODAL_NAMES =
  | ''
  | 'VIEW_NOTE'
  | 'CREATE_NOTE'
  | 'UPDATE_NOTE'
  | 'DELETE_NOTE'
  | 'LOGIN'
  | 'SIGNUP';

interface ModalOptions {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
}

export interface ModalsState<T> {
  isOpen: boolean;
  data: T | null;
  active_name: MODAL_NAMES;
  onOpen: <T>(name: MODAL_NAMES, data?: T, options?: ModalOptions) => void;
  onClose: () => void;
  options: ModalOptions;
}

const defaultOptions: ModalOptions = {
  size: '4xl',
};

export const useModalsStore = create<ModalsState<unknown>>((set) => ({
  isOpen: false,
  active_name: '',
  options: {
    size: '4xl',
  },
  data: null,
  onOpen: (name, data, new_options) => {
    set(({ active_name, options, ...prev }) => ({
      ...prev,
      data,
      isOpen: true,
      active_name: name,
      options: new_options ? { ...options, ...new_options } : options,
    }));
  },
  onClose: () => {
    set(({ isOpen, ...prev }) => ({
      ...prev,
      isOpen: false,
      active_name: '',
      data: null,
    }));

    setTimeout(() => {
      set(({ isOpen, ...prev }) => ({
        ...prev,
        options: { ...defaultOptions },
      }));
    }, 500);
  },
}));
