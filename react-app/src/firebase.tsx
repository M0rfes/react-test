import { createContext } from 'react';
import { connection } from './setup';

const FirebaseContext = createContext(connection);

export default FirebaseContext;
