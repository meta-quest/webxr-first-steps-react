# Chapter 5: Making It a Game

In this chapter, we’ll add a proximity-based hit test for the targets and implement a scoreboard to track the player’s score. These additions make the scene more interactive and engaging, turning our app into a simple game.

## 1. Setting Up the Scoreboard

To display the player’s score, we’ll use Zustand to manage score data and the `Text` component from `@react-three/drei` for rendering.

### Creating the Score Store

First, create a `score.tsx` file to manage the score. We’ll define an `addScore` function to increase the score by 10 points when a target is hit.

```tsx
import { create } from "zustand";

type ScoreStore = {
  score: number;
  addScore: () => void;
};

export const useScoreStore = create<ScoreStore>((set) => ({
  score: 0,
  addScore: () => set((state) => ({ score: state.score + 10 })),
}));
```

### Rendering the Score

Next, we’ll render the score using the `Text` component from `@react-three/drei`. This component provides high-quality, customizable text rendering, ideal for showing the score on a monitor in the scene.

```tsx
import { Text } from "@react-three/drei";

export const Score = () => {
  const formatScoreText = (score: number) => {
    const clampedScore = Math.max(0, Math.min(9999, score));
    return clampedScore.toString().padStart(4, "0");
  };

  const score = useScoreStore((state) => state.score);

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
    </Text>
  );
};
```

- **`formatScoreText`**: Formats the score to be a 4-digit number, clamped between 0 and 9999.
- **Positioning**: The score text is positioned and rotated to align with a monitor in the scene.

Finally, add `<Score />` inside `<Canvas>` in `index.tsx` to display the score.

## 2. Implementing Proximity-Based Hit Testing for Bullets

To determine if a bullet hits a target, we’ll use a proximity-based hit test. This approach checks if a bullet is close enough to a target, and if so, registers a hit.

### Updating `bullet.tsx`

In `bullet.tsx`, we’ll import the the score store and targets and implement the hit detection logic inside the `Bullet` component.

```tsx
import { useScoreStore } from "./score";
import { targets } from "./targets";

const Bullet = ({ bulletPrototype, bulletData }: BulletProps) => {
  // ... existing code
  useFrame(() => {
    // ... existing movement code
    [...targets]
      .filter((target) => target.visible)
      .forEach((target) => {
        const distance = target.position.distanceTo(bulletObject.position);
        if (distance < 1) {
          useBulletStore.getState().removeBullet(bulletData.id);

          // Hide and reposition the target
          target.visible = false;
          setTimeout(() => {
            target.visible = true;
            target.position.x = Math.random() * 10 - 5;
            target.position.z = -Math.random() * 5 - 5;
          }, 2000);

          // Update the score
          useScoreStore.getState().addScore();
        }
      });
  });
  // ... remaining code
};
```

### Explanation

- **Proximity-Based Hit Test**: We check if the distance between each bullet and target is less than 1 unit. If so, it’s registered as a hit.
- **Score Update and Target Respawn**: On hit, the score increases by 10 points, and the target becomes invisible for 2 seconds before reappearing at a random position.

This hit test works effectively for our game since the targets are round and face the player.

## Summary

In this chapter, you’ve turned your WebXR experience into a simple game by adding a hit test and a scoreboard. The proximity-based hit test registers hits when bullets are near targets, while the scoreboard tracks the player’s score and updates in real time, adding an interactive element to the scene.

Here’s what the game looks like with hit detection and scoring:

![Gameplay Screenshot](./assets/chapter5.gif)

[View full changes made in this chapter](https://github.com/meta-quest/webxr-first-steps-react/compare/chapter4...chapter5)
