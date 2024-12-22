import React from 'react';
import Login from './Login';

interface BaseLoginWrapperProps {
    isLoginVisible: boolean;
    onBackdropClick: () => void;
}

const BaseLoginWrapper: React.FC<BaseLoginWrapperProps> = ({onBackdropClick, isLoginVisible}) => {

  
    if (!isLoginVisible) return null;
  
    return (<Login onBackdropClick={onBackdropClick}/>)
}

export default BaseLoginWrapper;