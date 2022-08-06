import React from "react";
import uploadToIPFS from "../lib/uploadToIPFS.js";
import trimify from "../lib/trimify.js";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export const PROFILE_ID = 50302;
export const PROFILE_NAME = "lensboard";

const uploadPost = async postContent => {
  const { path } = await uploadToIPFS({
    version: "1.0.0",
    metadata_id: uuid(),
    description: trimify(postContent),
    content: trimify(postContent),
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `Post by @${PROFILE_NAME}`,
    attributes: [
      {
        traitType: "string",
        key: "type",
        value: "post",
      },
    ],
    media: [],
    appId: "Lenster",
  });

  return path;
};

function NewPost({ writeContracts, tx }) {
  const [content, setContent] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            maxWidth: "50%",
            margin: 32,
          }}
        >
          <button style={{ display: "flex", flexDirection: "column", alignItems: "start", margin: 1 }}>
            <Link to="/">⬅️ Home</Link>
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderStyle: "solid",
              padding: 16,
              borderRadius: 5,
              borderColor: "grey",
              borderWidth: 1,
            }}
          >
            <h2>New post</h2>
            <h4>
              You are about post on behalf of the{" "}
              <a href={`https://open.withlens.app/profile/${PROFILE_NAME}.lens`}>@{PROFILE_NAME}.lens</a> profile.
            </h4>
            <p>
              <i>
                Note: If you wish to be anonymous, remember that the account which creates the post is publicly visible.
              </i>
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <textarea style={{ color: 'black' }} cols="40" rows="3" onChange={setContent} />
              <div style={{ alignItems: "flex-end", marginLeft: "auto" }}>
                <button
                  style={{ width: "fit-content", margin: 8, color: 'black' }}
                  onClick={() =>
                    uploadPost(content.target.value).then(p =>
                      tx(writeContracts.LensBoard.post(PROFILE_ID, `https://ipfs.io/ipfs/${p}`)),
                    )
                  }
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
