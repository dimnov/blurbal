import { useSession } from "@/hooks/auth/useSession";
import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
  session: Session | null;
  isCheckingAuth: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, isCheckingAuth } = useSession();

  return (
    <AuthContext.Provider value={{ session, isCheckingAuth }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
