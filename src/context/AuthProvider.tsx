import {
  AuthChangeEvent,
  AuthError,
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
  signOut: () => Promise<{
    error: AuthError | null;
  }>;
  auth: boolean;
};

const AuthContext = createContext(undefined as unknown as AuthContextType);

const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
