/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const Gun = () => {
  return (
    <group rotation-x={-Math.PI / 8}>
      <mesh>
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
