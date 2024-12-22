import React from 'react';
import LoginForm from './LoginForm';

interface LoginProps {
  onBackdropClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onBackdropClick }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        style={{ top: -50, bottom: 0, left: 0, right: 0 }} 
        onClick={onBackdropClick}>
      <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl text-gray-900 font-semibold mb-4">Login</h2>
        <LoginForm onLoginSuccess={(user) => console.log(`Login successful for user: ${user}`)} />
      </div>
    </div>
  );
};

export default Login;