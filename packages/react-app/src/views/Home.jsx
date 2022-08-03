import React from "react";
import uploadToIPFS from "../lib/uploadToIPFS.js";
import trimify from "../lib/trimify.js";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const PROFILE_ID = 1;
const PROFILE_NAME = "smolting";

const uploadPost = async (postContent) => {
  const { path } = await uploadToIPFS({
    version: '1.0.0',
    metadata_id: uuid(),
    description: trimify(postContent),
    content: trimify(postContent),
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `Post by @smolting`,
    attributes: [
      {
        traitType: 'string',
        key: 'type',
        value: 'post'
      }
    ],
    media: [],
    appId: "Lenster"
  }).finally();

  return path;
}

function Home({ writeContracts, tx }) {
  const [content, setContent] = useState("");

  return (
    <div>
      <div style={{ margin: 32 }}>
        <u>Welcome to LensBoard</u>
        <p>Create a post below.</p>
        <input onChange={setContent}></input>
        <button
          onClick={() => uploadPost(content.target.value).then(p => tx(writeContracts.LensBoard).post(PROFILE_ID, p))}
        >
          Post
        </button>
      </div>
      <div>
        View profile <a href={`https://www.lensfrens.xyz/${PROFILE_NAME}.lens`}>here</a>.
      </div>
    </div>
  );
}

export default Home;