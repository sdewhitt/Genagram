import React, { useEffect, useState } from 'react';
import Login from './Login';

interface BaseLoginWrapperProps {
    isLoginVisible: boolean;
    onBackdropClick: () => void;
}

const BaseLoginWrapper: React.FC<BaseLoginWrapperProps> = ({onBackdropClick, isLoginVisible}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient || !isLoginVisible) return null;
  
    return (<Login onBackdropClick={onBackdropClick}/>)
}

export default BaseLoginWrapper;