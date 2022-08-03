import { Button } from "antd";
import React from "react";

import Address from "./Address";

export default function Account({
  address,
  mainnetProvider,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
}) {

  let accountButtonInfo;
  if (web3Modal?.cachedProvider) {
    accountButtonInfo = { name: "Logout", action: logoutOfWeb3Modal };
  } else {
    accountButtonInfo = { name: "Connect", action: loadWeb3Modal };
  }

  const display = !minimized && (
    <span>
      {address && (
        <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} fontSize={20} />
      )}
    </span>
  );

  return (
    <div style={{ display: "flex" }}>
      {display}
      {web3Modal && (
        <Button style={{ marginLeft: 8 }} shape="round" onClick={accountButtonInfo.action}>
          {accountButtonInfo.name}
        </Button>
      )}
    </div>
  );
}
