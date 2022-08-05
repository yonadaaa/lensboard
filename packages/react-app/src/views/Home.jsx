import React from "react";
import { PROFILE_NAME } from "./Post"
import { Link } from "react-router-dom";

function Home({ readContracts }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          margin: 32,
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <h1>Welcome to LensBoard</h1>
        <h2>The anonymous message board for Lens.</h2>
        <img src="timeline.png" style={{ borderStyle: "solid", margin: 16, padding: 8 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderStyle: "solid",
            padding: 16,
            borderRadius: 5,
            borderColor: "grey",
            borderWidth: 1,
            margin: 10,
          }}
        >
          <h3>How does it work?</h3>
          <div>
            <p>
              <a href={`https://open.withlens.app/profile/${PROFILE_NAME}.lens`}>@{PROFILE_NAME}.lens</a> is a smart
              contract-owned Lens profile that anyone can post for.
            </p>
            <p>
              Creating new posts is permissionless, so the profile is not owned by any single person, and posting is
              anonymous (provided that you use an anonymous address)!
            </p>
            <p>Say gm, tell the world your most controversial take, confess your deepest secrets - it's up to you!</p>
            <button style={{ fontSize: 22, margin: 8 }}>
              <Link to="/post">Create a post</Link>
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            margin: 10,
            flexDirection: "column",
            borderStyle: "solid",
            padding: 16,
            borderRadius: 5,
            borderColor: "grey",
            borderWidth: 1,
          }}
        >
          <h3>Useful links</h3>
          <ul style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <li>
              <a href={`https://open.withlens.app/profile/${PROFILE_NAME}.lens`}>@{PROFILE_NAME}.lens Lens profile</a>
            </li>
            <li>
              <a
                href={`https://polygonscan.com/address/${readContracts.LensBoard ? readContracts.LensBoard.address : ""}`}
              >
                Smart contract on PolygonScan
              </a>
            </li>
            <li>
              <a href={`https://github.com/fraserdscott/lensboard`}>LensBoard GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
}

export default Home;
