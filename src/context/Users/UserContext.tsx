import React, { createContext, useState } from 'react';

interface UserState {
    user: boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsersContext = createContext<UserState>({
    user: false,
    setUser: () => false
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<boolean>(false);

    return (
        <UsersContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};
