// AvatarContext.js
import React, { createContext, useState, useContext } from 'react';

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};
