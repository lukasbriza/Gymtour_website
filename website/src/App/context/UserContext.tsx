import { ContextProviderProps, UserStateContext } from "src/app/_index";
import { FC, createContext, useMemo, useState } from "react";

const initialstate: UserStateContext = {
    logged: false,
    userId: "",
    userObject: undefined,
    fn: {
        setLogged: () => { throw new Error('Context does not have a matching provider!') },
        setUserId: () => { throw new Error('Context does not have a matching provider!') },
        setUserObject: () => { throw new Error('Context does not have a matching provider!') }
    }
}

export const UserContext = createContext<UserStateContext>(initialstate)
UserContext.displayName = 'UserContext'

export const UserContextProvider: FC<ContextProviderProps> = (props) => {
    const [logged, setLogged] = useState<boolean>(initialstate.logged)
    const [userId, setUserId] = useState<string>(initialstate.userId)
    const [userObject, setUserObject] = useState<userObjectType | undefined>(initialstate.userObject)

    const userState: UserStateContext = useMemo(() => ({
        logged: logged,
        userId: userId,
        userObject: userObject,
        fn: {
            setLogged: setLogged,
            setUserId: setUserId,
            setUserObject: setUserObject
        }
    }), [logged, userId, userObject])

    return (
        <UserContext.Provider value={userState}>
            {props.children}
        </UserContext.Provider>
    )
}