/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Canvas, addEffect, useFrame } from "@react-three/fiber";
import { Environment, Gltf, PerspectiveCamera } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

import { Bullets } from "./bullets";
import { Gun } from "./gun";
import React from "react";
import ReactDOM from "react-dom/client";
import { Score } from "./score";
import { Target } from "./targets";
import gsap from "gsap";

const xrStore = createXRStore({
  emulate: {
    controller: {
      left: {
        position: [-0.15649, 1.43474, -0.38368],
        quaternion: [
          0.14766305685043335, -0.02471366710960865, -0.0037767395842820406,
          0.9887216687202454,
        ],
      },
      right: {
        position: [0.15649, 1.43474, -0.38368],
        quaternion: [
          0.14766305685043335, 0.02471366710960865, -0.0037767395842820406,
          0.9887216687202454,
        ],
      },
    },
  },
  controller: {
    right: Gun,
  },
});

const GsapTicker = () => {
  useFrame(() => {
    gsap.ticker.tick();
  });
  return null;
};

const App = () => {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <color args={[0x808080]} attach={"background"}></color>
        <PerspectiveCamera makeDefault position={[0, 1.6, 2]} fov={75} />
        <Environment preset="warehouse" />
        <Bullets />
        <Gltf src="assets/spacestation.glb" />
        <Target targetIdx={0} />
        <Target targetIdx={1} />
        <Target targetIdx={2} />
        <Score />
        <GsapTicker />
        <XR store={xrStore}></XR>
      </Canvas>
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div>
          <div style={{ paddingTop: "10px" }}>
            WebXR First Steps Tutorial -&nbsp;
            <a href="https://github.com/meta-quest/webxr-first-steps-react">
              GitHub
            </a>
            &nbsp;|&nbsp;
            <a href="https://raw.githubusercontent.com/meta-quest/webxr-first-steps-react/main/LICENSE">
              MIT License
            </a>
          </div>
          <div>
            Copyright © Meta Platforms, Inc |
            <a href="https://opensource.fb.com/legal/terms/">Terms</a>
            &nbsp;|&nbsp;
            <a href="https://opensource.fb.com/legal/privacy/">Privacy</a>
          </div>
        </div>
        <button
          onClick={() => xrStore.enterVR()}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "20px",
          }}
        >
          Enter VR
        </button>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
