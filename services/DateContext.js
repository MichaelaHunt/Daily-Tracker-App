import { createContext } from 'react';
import { useState } from 'react';

export const DateContext = createContext({
  currentDate: new Date(),
  setCurrentDate: () => {},
});

export function DateProvider({ children }) { 
    const [currentDate, setCurrentDate] = useState(new Date()); 
    return ( 
        <DateContext.Provider value={{ currentDate, setCurrentDate }}> 
            {children} 
        </DateContext.Provider> 
    ); 
}