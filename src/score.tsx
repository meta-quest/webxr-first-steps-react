/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PositionalAudio, Text } from "@react-three/drei";
import { useEffect, useRef } from "react";

import { PositionalAudio as PAudio } from "three";
import { create } from "zustand";

type ScoreStore = {
  score: number;
  addScore: () => void;
};
export const useScoreStore = create<ScoreStore>((set) => ({
  score: 0,
  addScore: () => set((state) => ({ score: state.score + 10 })),
}));

export const Score = () => {
  const formatScoreText = (score: number) => {
    const clampedScore = Math.max(0, Math.min(9999, score));
    return clampedScore.toString().padStart(4, "0");
  };
  const score = useScoreStore((state) => state.score);
  const soundRef = useRef<PAudio>(null);

  useEffect(() => {
    if (score > 0) {
      const scoreSound = soundRef.current!;
      if (scoreSound.isPlaying) scoreSound.stop();
      scoreSound.play();
    }
  }, [score]);

  return (
    <Text
      color={0xffa276}
      font="assets/SpaceMono-Bold.ttf"
      fontSize={0.52}
      anchorX="center"
      anchorY="middle"
      position={[0, 0.67, -1.44]}
      quaternion={[-0.4582265217274104, 0, 0, 0.8888354486549235]}
    >
      {formatScoreText(score)}
      <PositionalAudio ref={soundRef} url="assets/score.ogg" loop={false} />
    </Text>
  );
};
