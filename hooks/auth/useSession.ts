import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    try {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      // Listen for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("There was an unexpected error");
      }
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  return { session, isCheckingAuth };
};
