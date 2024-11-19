/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Mesh, Quaternion, Vector3 } from "three";

import { create } from "zustand";
import { generateUUID } from "three/src/math/MathUtils.js";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const bulletSpeed = 10;
const forwardVector = new Vector3(0, 0, -1);
const bulletTimeToLive = 2;

type BulletData = {
  id: string;
  initPosition: Vector3;
  initQuaternion: Quaternion;
  timestamp: number;
};
type BulletStore = {
  bullets: BulletData[];
  addBullet: (position: Vector3, quaternion: Quaternion) => void;
  removeBullet: (bulletId: string) => void;
};
export const useBulletStore = create<BulletStore>((set) => ({
  bullets: [],
  addBullet: (position, quaternion) =>
    set((state) => {
      const newBullet = {
        id: generateUUID(),
        initPosition: position,
        initQuaternion: quaternion,
        timestamp: performance.now(),
      };
      setTimeout(() => {
        state.removeBullet(newBullet.id);
      }, bulletTimeToLive * 1000);
      return { bullets: [...state.bullets, newBullet] };
    }),
  removeBullet: (bulletId) =>
    set((state) => ({
      bullets: state.bullets.filter((bullet) => bullet.id !== bulletId),
    })),
}));

export const Bullets = () => {
  const bullets = useBulletStore((state) => state.bullets);
  return (
    <>
      {bullets.map((bulletData) => (
        <Bullet bulletData={bulletData} key={bulletData.id} />
      ))}
    </>
  );
};

type BulletProps = {
  bulletData: BulletData;
};
const Bullet = ({ bulletData }: BulletProps) => {
  const { scene } = useGLTF("assets/blaster.glb");
  const bulletPrototype = scene.getObjectByName("bullet")! as Mesh;
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    const now = performance.now();
    const bulletObject = ref.current!;
    const directionVector = forwardVector
      .clone()
      .applyQuaternion(bulletObject.quaternion);
    bulletObject.position.addVectors(
      bulletData.initPosition,
      directionVector.multiplyScalar(
        (bulletSpeed * (now - bulletData.timestamp)) / 1000
      )
    );
  });

  return (
    <mesh
      ref={ref}
      geometry={bulletPrototype.geometry}
      material={bulletPrototype.material}
      quaternion={bulletData.initQuaternion}
    ></mesh>
  );
};
