import { createContext, useState } from "react";

export const FollowContext = createContext();

const FollowProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(null)
  const [unFollowing, setUnFollowing] = useState(null)
  return (
    <FollowContext.Provider value={{ user, setUser, loading, setLoading, following, setFollowing, unFollowing, setUnFollowing }}>
      {children}
    </FollowContext.Provider>
  );
};

export default FollowProvider;