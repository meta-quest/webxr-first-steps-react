import { Quaternion, Vector3 } from "three";

import { create } from "zustand";
import { generateUUID } from "three/src/math/MathUtils.js";

type BulletData = {
  id: string;
  initPosition: Vector3;
  initQuaternion: Quaternion;
};
type BulletStore = {
  bullets: BulletData[];
  addBullet: (position: Vector3, quaternion: Quaternion) => void;
};
export const useBulletStore = create<BulletStore>((set) => ({
  bullets: [],
  addBullet: (position, quaternion) =>
    set((state) => {
      const newBullet = {
        id: generateUUID(),
        initPosition: position,
        initQuaternion: quaternion,
      };
      return { bullets: [...state.bullets, newBullet] };
    }),
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
  return (
    <mesh
      position={bulletData.initPosition}
      quaternion={bulletData.initQuaternion}
    >
      <sphereGeometry args={[0.02]} />
      <meshStandardMaterial color="grey" />
    </mesh>
  );
};
