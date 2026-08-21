    import React from "react";

    const Post = ({ post, user, idx }) => {
    console.log(post, idx);

    return (
        <div key={idx}>
        <article className="posts__item" key={idx}>

            {/* POST HEADER */}
            <div className="posts__top">

            <div className="posts__identity">

                <div className="posts__avatar">
                <img
                    src={user.profilePic}
                    alt={user.username}
                />
                </div>

                <div className="posts__user">

                <div className="posts__username-row">
                    <span className="posts__username">
                    {user.username}
                    </span>

                    <span className="posts__verified" />
                </div>

                <span className="posts__meta">
                    NØVA MEMBER
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


            {/* POST MAIN CONTENT */}

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
                    className={`posts__action posts__action--like ${post.isLiked ? "liked": ""}`}
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
        </div>
    );
    };

    export default Post;