export interface DialogModalProps {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    backgroundStyle: {
        backgroundColor: string;
        primary: string;
        secondary: string;
        color: string;
    };
    type: 'DELETE' | 'CONFIRM' | 'INFO';
};