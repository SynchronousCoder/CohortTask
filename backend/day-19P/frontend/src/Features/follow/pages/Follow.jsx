import React from "react";
import FollowAuth from "../hook/FollowAuth";
import { useEffect } from "react";
import { div } from "three/src/nodes/math/OperatorNode.js";

const Follow = () => {
  const {
    handleSeeFollower,
    handleSeeFollowing,
    handleSeeUnFollowing,
    loading,
    user,
    following,
    unFollowing,
  } = FollowAuth();

  // async function handleFollower() {
  //   await handleSeeFollower();
  // }

  // async function handleFollowing() {
  //   await handleSeeFollowing()
  // }

  // async function handleUnFollowing(){
  //   await handleSeeUnFollowing()
  // }

  if (loading) {
    return (
      <main>
        <h1>Loading Follow List...</h1>
      </main>
    );
  }

  // useEffect(() => {
  //   handleFollower();
  //   handleFollowing();
  //   handleUnFollowing()
  // }, []);

  return (
    <>
      <div>
        <h1>Followers</h1>
        {user &&
          user.map((user, idx) => {
            return (
              <div key={idx}>
                <h1>{user.follower}</h1>
              </div>
            );
          })}
      </div>

      <div>
        <h1>Following</h1>
        {following &&
          following.map((user, idx) => {
            return (
              <div key={idx}>
                <h1>{user.followee}</h1>
              </div>
            );
          })}
      </div>

      <div>
        <h1>UnFollowing</h1>
        {unFollowing &&
          unFollowing.map((user, idx) => {
            return (
              <div key={idx}>
                <h1>{user.username}</h1>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Follow;