import { useSession } from "@/hooks/auth/useSession";
import { getUserApi } from "@/services/auth";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  session: Session | null;
  user: Profile | null;
  isCheckingAuth: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, isCheckingAuth } = useSession();
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        try {
          const { user } = await getUserApi(session.user.id);
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, isCheckingAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
