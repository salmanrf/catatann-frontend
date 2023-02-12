import { createContext, useContext, useState } from 'react';

export interface SessionState {
  logged_in: boolean;
  user: {
    user_id: string;
    username: string;
    name: string;
    profile_picture: string;
  };
}

const SessionContext = createContext<SessionState>({
  logged_in: false,
  user: {
    user_id: '',
    name: '',
    username: '',
    profile_picture: '',
  },
});

export function useSession() {
  const session = useContext(SessionContext);

  return session;
}

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState({
    logged_in: false,
    user: {
      user_id: '',
      name: '',
      username: '',
      profile_picture: '',
    },
  });

  return (
    <SessionContext.Provider value={{ ...session }}>
      {children}
    </SessionContext.Provider>
  );
};
