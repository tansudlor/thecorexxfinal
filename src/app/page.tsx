"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GameController } from "@/HTMLElementGameTemplete/GameController";
import { GameElement } from "@/HTMLElementGameTemplete/GameElement";
import { useNFT } from "@/hooks/useNFT";
import { useAccount, useSignMessage, useDisconnect, useClient } from "wagmi";
import { SiweMessage } from "siwe";
import NFTCard from "@/components/NFTCard";
import API from "@/HTMLElementGameTemplete/API";
import Cookies from "js-cookie";
import { Profile } from "@/HTMLElementGameTemplete/Profile";

export default function Home() {
  const { fetchNFT, nftData } = useNFT();
  const { isConnected, address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { signMessageAsync } = useSignMessage();
  const [signature, setSignature] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  let trustDisconnectHook = false;
  function start() {
    let gameController = new GameController("gameController", null, null);
    gameController.FrameTime = 1000 / 165;
    setInterval(update, gameController.FrameTime);
    console.log(window.innerWidth + " : " + window.innerHeight);
  }

  function update() {
    for (let id in GameElement.GameElementColletion) {
      GameElement.GameElementColletion[id].update(
        GameElement.GameElementColletion[id]
      );
    }
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function GetUpgradeDatas() {
    let datas = await API.GetUpgradeData("All");
    if (datas.error == null) {
      for (const skillname in datas) {
        console.log(skillname, datas[skillname]);
        Profile.Data["_upgradedata" + skillname.toLowerCase()] =
          datas[skillname];
      }
      Profile.Ready = true;
    }
  }

  const signMessage = async () => {
    API.getNonce(async (data) => {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign this message to generate a token.",
          uri: window.location.origin,
          version: "1",
          chainId: 1,
          nonce: data,
        });

        const signature = await signMessageAsync({
          account: address, // Include the account here
          message: message.prepareMessage(),
        });
        setSignature(signature);
        API.sendSignatureToBackend(
          signature,
          message.prepareMessage(),
          onToken
        );
      } catch (error) {
        console.log("Error signing message:", error);
      }
    });
  };

  const onToken = (json) => {
    API.GetMe((data) => {
      Profile.Data = JSON.parse(data);
      GetUpgradeDatas();
      console.log(Profile.Data);
    });
  };
  const onFetchNFT = async () => {
    await fetchNFT();
  };

  useEffect(() => {
    //console.log("start");

    start();
  }, []);

  useEffect(() => {
    //console.log("isConnected", isConnected);
    if (isConnected) {
      //console.log(address);
      onFetchNFT();
      signMessage();
      setToken(getCookie("auth-token"));
    } else {
      //console.log("isConnectedFalse", isConnected);
      //Cookies.remove("auth-token", { path: "/", expires: new Date(0) });
    }
  }, [isConnected]);

  useEffect(() => {
    //TODO: Must test on production
    if (firstRender) {
      setFirstRender(false);
      API.GetMe((data) => {
        console.log(data);
        Profile.Data = JSON.parse(data);
        if (Profile.Data.error != null) {
          console.log("ProfileError", Profile.Data);
          setTimeout(() => {
            disconnect();
          }, 1000);
          return;
        }
        GetUpgradeDatas();
        console.log("Profile", Profile.Data);
      });
      return;
    }
    //TODO: Must test on production
    console.log(address);
    if (isDisconnected && !address) {
      Cookies.remove("auth-token", { path: "/", expires: new Date(0) });
      Profile.Ready = false;
      console.log("isDisconnected activate", isDisconnected);
    }
  }, [isDisconnected]);

  console.log(nftData);

  return (
    <main className="flex  min-h-screen ">
      {
        <div className="grid grid-cols-5 bg-red-400 w-full mt-20">
          {nftData.length > 0 &&
            nftData.map((nft, index) => {
              return (
                <NFTCard
                  key={index}
                  index={index}
                  nft={nft}
                  imageId={nft.imageId}
                />
              );
            })}
        </div>
      }
    </main>
  );
}
