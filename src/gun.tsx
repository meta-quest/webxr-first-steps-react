/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Mesh, Quaternion, Vector3 } from "three";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";

import { useBulletStore } from "./bullets";
import { useRef } from "react";

export const Gun = () => {
  const barrelRef = useRef<Mesh>(null);
  const state = useXRInputSourceStateContext("controller");
  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed" && barrelRef.current) {
      useBulletStore
        .getState()
        .addBullet(
          barrelRef.current.getWorldPosition(new Vector3()),
          barrelRef.current.getWorldQuaternion(new Quaternion())
        );
    }
  });

  return (
    <group rotation-x={-Math.PI / 8}>
      <mesh ref={barrelRef}>
        <boxGeometry args={[0.035, 0.05, 0.16]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, -0.05, 0.05]}>
        <boxGeometry args={[0.025, 0.04, 0.1]} />
        <meshStandardMaterial color="grey" />
      </mesh>
    </group>
  );
};
