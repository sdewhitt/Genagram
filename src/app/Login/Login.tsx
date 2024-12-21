import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    onBackdropClick: () => void;
}

const Login: React.FC<ModalProps> = ({ onBackdropClick, children }: React.PropsWithChildren<ModalProps>) => {
    return ReactDOM.createPortal(
        <div onClick={onBackdropClick} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}

export default Login;