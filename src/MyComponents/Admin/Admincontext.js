import React, { createContext, useState } from 'react';

const Admincontext = createContext();

export const AdminProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);

    return (
        <Admincontext.Provider value={{ cards, setCards, originalCards, setOriginalCards }}>
            {children}
        </Admincontext.Provider>
    );
};

export default Admincontext;
