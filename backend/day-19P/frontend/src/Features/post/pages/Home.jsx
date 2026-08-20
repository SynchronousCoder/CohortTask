import React, { useEffect } from "react";
import postAuth from "../hooks/postAuth";
import "../styles/style.scss";

const Home = () => {
  const { handleAllPost, loading, posts } = postAuth();

  useEffect(() => {
    handleAllPost();
    console.log(posts);
  }, []);

  return (
    <div className="posts">
      <main className="posts__main">

        <header className="posts__header">
          <div className="posts__header-top">
            <span className="posts__eyebrow">
              NØVA / FEED
            </span>

            <span className="posts__status">
              LIVE
            </span>
          </div>

          <h1 className="posts__title">
            Discover<span>.</span>
          </h1>

          <div className="posts__header-line" />
        </header>

        <section className="posts__feed">

          {loading && (
            <div className="posts__loading">
              <span className="posts__loading-ring" />
              <span>Loading your world</span>
            </div>
          )}

          {posts &&
            posts.map((post, idx) => {
              return (
                <article
                  className="posts__item"
                  key={idx}
                >

                  <div className="posts__top">

                    <div className="posts__identity">

                      <div className="posts__avatar">
                        N
                      </div>

                      <div className="posts__user">
                        <span className="posts__username">
                          nova_user
                        </span>

                        <span className="posts__meta">
                          NØVA / 00{idx + 1}
                        </span>
                      </div>

                    </div>

                    <button
                      className="posts__more"
                      type="button"
                      aria-label="More options"
                    >
                      <span />
                      <span />
                      <span />
                    </button>

                  </div>

                  <div className="posts__caption-wrap">

                    <h2 className="posts__caption">
                      {post.caption}
                    </h2>

                  </div>

                  <div className="posts__media">

                    <img
                      className="posts__image"
                      src={post.imgUrl}
                      alt=""
                    />

                    <div className="posts__media-shine" />

                    <span className="posts__media-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <div className="posts__actions">

                    <button
                      className="posts__action posts__action--like"
                      aria-label="Like"
                      type="button"
                    />

                    <button
                      className="posts__action posts__action--comment"
                      aria-label="Comment"
                      type="button"
                    />

                    <button
                      className="posts__action posts__action--share"
                      aria-label="Share"
                      type="button"
                    />

                    <button
                      className="posts__action posts__action--save"
                      aria-label="Save"
                      type="button"
                    />

                  </div>

                  <div className="posts__bottom">

                    <span>
                      JOIN THE CONVERSATION
                    </span>

                    <span>
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                  </div>

                </article>
              );
            })}

        </section>

      </main>
    </div>
  );
};

export default Home;