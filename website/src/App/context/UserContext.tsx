import { ContextProviderProps, Permissions, UserStateContext } from "src/app/_index";
import { FC, createContext, useCallback, useMemo, useState } from "react";
import { User } from "src/fetcher";

const initialstate: UserStateContext = {
    logged: false,
    userId: "",
    userObject: undefined,
    setLogged: () => { throw new Error('Context does not have a matching provider!') },
    setUserId: () => { throw new Error('Context does not have a matching provider!') },
    setUserObject: () => { throw new Error('Context does not have a matching provider!') },
    hasPermission: () => { throw new Error('Context does not have a matching provider!') }
}

export const UserContext = createContext<UserStateContext>(initialstate)
UserContext.displayName = 'UserContext'

export const UserContextProvider: FC<ContextProviderProps> = (props) => {
    const [logged, setLogged] = useState<boolean>(initialstate.logged)
    const [userId, setUserId] = useState<string>(initialstate.userId)
    const [userObject, setUserObject] = useState<User | undefined>(initialstate.userObject)

    const hasPermission = useCallback((permission: Permissions) => {
        switch (permission) {
            case Permissions.AUTHORIZED:
                //LOGIC    
                return true
        }
    }, [])

    const userState: UserStateContext = useMemo(() => ({
        logged: logged,
        userId: userId,
        userObject: userObject,
        setLogged: setLogged,
        setUserId: setUserId,
        setUserObject: setUserObject,
        hasPermission: hasPermission

    }), [hasPermission, logged, userId, userObject])

    return (
        <UserContext.Provider value={userState}>
            {props.children}
        </UserContext.Provider>
    )
}