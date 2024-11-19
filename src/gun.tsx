/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Quaternion, Vector3 } from "three";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";

import { useBulletStore } from "./bullets";
import { useGLTF } from "@react-three/drei";

export const Gun = () => {
  const state = useXRInputSourceStateContext("controller");
  const { scene } = useGLTF("assets/blaster.glb");
  const bulletPrototype = scene.getObjectByName("bullet")!;
  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      useBulletStore
        .getState()
        .addBullet(
          bulletPrototype.getWorldPosition(new Vector3()),
          bulletPrototype.getWorldQuaternion(new Quaternion())
        );
    }
  });

  return <primitive object={scene} />;
};

useGLTF.preload("assets/blaster.glb");
