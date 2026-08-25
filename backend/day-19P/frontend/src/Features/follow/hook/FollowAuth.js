import { useContext } from "react";
import { FollowContext } from "../follow.context";
import {
  seeFollower,
  seeFollowing,
  seeUnFollowing,
} from "../service/follow.api";
import { useEffect } from "react";

const FollowAuth = () => {
  const context = useContext(FollowContext);
  const {
    user,
    setUser,
    loading,
    setLoading,
    following,
    setFollowing,
    unFollowing,
    setUnFollowing,
  } = context;

  async function handleSeeFollower() {
    setLoading(false);
    try {
      const data = await seeFollower();
      setUser(data.followers);
      console.log("ans=> ", data.followers);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleSeeFollowing() {
    setLoading(false);
    try {
      const data = await seeFollowing();
      setFollowing(data.following);
      console.log("ans=> ", data.following);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleSeeUnFollowing() {
    setLoading(true);
    try {
      const data = await seeUnFollowing();
      setUnFollowing(data.unfollowing);
      console.log(data.unfollowing);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSeeFollower();
    handleSeeFollowing();
    handleSeeUnFollowing();
  }, []);
  return {
    handleSeeFollower,
    handleSeeFollowing,
    handleSeeUnFollowing,
    loading,
    user,
    following,
    unFollowing,
  };
};

export default FollowAuth;
