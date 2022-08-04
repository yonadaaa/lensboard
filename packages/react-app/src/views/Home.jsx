import React from "react";
import uploadToIPFS from "../lib/uploadToIPFS.js";
import trimify from "../lib/trimify.js";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const PROFILE_ID = 50302;
const PROFILE_NAME = "lensboard";

const uploadPost = async (postContent) => {
  const { path } = await uploadToIPFS({
    version: '1.0.0',
    metadata_id: uuid(),
    description: trimify(postContent),
    content: trimify(postContent),
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `Post by @${PROFILE_NAME}`,
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
        <h2>Welcome to LensBoard</h2>
        <h4>
          Pseudonymously post on behalf of the smart contract-owned <a href={`https://www.lensfrens.xyz/${PROFILE_NAME}.lens`}>@{PROFILE_NAME}.lens</a> profile.
        </h4>
        <p>
          To create a post, simply enter some text below and press <i>"post"</i>.

        </p>
        <div>
          <input type="text" onChange={setContent}></input>
          <button
            onClick={() => uploadPost(content.target.value).then(p => tx(writeContracts.LensBoard.post(PROFILE_ID, p)))}
          >
            Post
          </button>
        </div>
        <p style={{ margin: 16 }}><i>Note: There may be a short delay while the post content is being uploaded to IPFS.</i></p>
      </div>
    </div>
  );
}

export default Home;