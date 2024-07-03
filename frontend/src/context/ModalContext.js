import React, { createContext, useState, useContext } from 'react';
import ModalAlert from '../components/ModalAlert';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const showModal = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setModalMessage('');
        setModalTitle('');
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <ModalAlert
                visible={modalVisible}
                onClose={hideModal}
                title={modalTitle}
                message={modalMessage}
            />
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
