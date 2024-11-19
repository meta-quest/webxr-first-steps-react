/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

import { Bullets } from "./bullets";
import { Canvas } from "@react-three/fiber";
import { Gun } from "./gun";
import ReactDOM from "react-dom/client";

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
        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[6, 6]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.4, 0.75, -1.5]}>
          <coneGeometry args={[0.6, 1.5]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        <mesh rotation-y={Math.PI / 4} position={[-0.8, 0.5, -1.5]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[0.6, 0.4, -0.5]} scale={1.2}>
          <sphereGeometry args={[0.4]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <Bullets />
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
