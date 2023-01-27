import {createContext} from 'react';
import ILoggedUser from '../interfaces/ILoggedUser';

interface IAuthContext {
  loggedUser: ILoggedUser | null;
  setLoggedUser: (user: ILoggedUser | null) => void;
}

const AuthContext = createContext<IAuthContext>([null, () => {}]);

export default AuthContext;
