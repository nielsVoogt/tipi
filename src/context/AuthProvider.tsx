import {
  AuthChangeEvent,
  AuthTokenResponsePassword,
  Session,
  User,
} from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase/client";

type AuthContextType = {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword>;
  signOut: () => void;
};

const AuthContext = createContext(undefined as unknown as AuthContextType);

const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!session) {
          return;
        }
        if (event === "SIGNED_IN") {
          setUser(session.user);
          setAuth(true);
        }
      }
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
