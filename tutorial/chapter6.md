# Chapter 6: Finishing Touches

With a fully functioning WebXR game, let’s add some final touches to enhance immersion. In this chapter, we’ll introduce audio, haptic feedback, and visual effects to make the game more engaging and interactive.

## 1. Adding Audio Feedback

We’ll start by adding audio for shooting and scoring. Using `PositionalAudio` from `@react-three/drei`, we can make sounds feel like they’re coming from specific points in 3D space.

### Adding Audio in `gun.tsx` for Shooting

In `gun.tsx`, we’ll add a sound for when the player fires the blaster.

```tsx
import { PositionalAudio as PAudio } from "three";
import { PositionalAudio } from "@react-three/drei";
import { useRef } from "react";

export const Gun = () => {
  // ... existing code
  const soundRef = useRef<PAudio>(null);

  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      // ... existing code
      const laserSound = soundRef.current!;
      if (laserSound.isPlaying) laserSound.stop();
      laserSound.play();
    }
  });

  return (
    <>
      <primitive object={scene} />
      <PositionalAudio ref={soundRef} url="assets/laser.ogg" loop={false} />
    </>
  );
};
```

- **PositionalAudio**: We use `@react-three/drei` to position audio in 3D space, so it feels tied to the blaster.
- **Sound Trigger**: We trigger the sound when the trigger is pressed.

### Adding Audio in `score.tsx` for Scoring

In `score.tsx`, we play a sound whenever the score changes.

```tsx
import { PositionalAudio } from "@react-three/drei";
import { PositionalAudio as PAudio } from "three";
import { useEffect, useRef } from "react";

export const Score = () => {
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
    // ... existing props
    >
      {formatScoreText(score)}
      <PositionalAudio ref={soundRef} url="assets/score.ogg" loop={false} />
    </Text>
  );
};
```

- **Sound Trigger**: The sound plays when `score` changes, excluding when it’s 0 (initial score).

## 2. Adding Haptic Feedback

We’ll add haptic feedback to give tactile responses when shooting. This vibration effect enhances immersion, making the action feel impactful.

```tsx
export const Gun = () => {
  // ... existing code
  const gamepad = state.inputSource.gamepad;
  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      // ... existing code
      gamepad.hapticActuators[0]?.pulse(0.6, 100);
    }
  });
  // ... existing code
};
```

- **Haptic Feedback**: The `pulse` method triggers a vibration at 60% intensity for 100 milliseconds.

## 3. Adding Visual Feedback with GSAP

For visual feedback, we’ll animate the target’s disappearance and reappearance using GSAP, creating a smooth effect instead of a sudden transition.

Replace the `setTimeout`-based disappear/reappear logic with GSAP animations in `bullet.tsx`:

```tsx
import { gsap } from "gsap";

gsap.to(target.scale, {
  duration: 0.3,
  x: 0,
  y: 0,
  z: 0,
  onComplete: () => {
    target.visible = false;
    setTimeout(() => {
      target.visible = true;
      target.position.x = Math.random() * 10 - 5;
      target.position.z = -Math.random() * 5 - 5;

      // Scale back up
      gsap.to(target.scale, {
        duration: 0.3,
        x: 1,
        y: 1,
        z: 1,
      });
    }, 1000);
  },
});
```

- **Scaling Animation**: The target scales down over 0.3 seconds upon being hit, creating a smooth disappearing effect.
- **Reappearance with Animation**: After 1 second, the target scales back up to its original size, adding to the polished experience.

### Updating the GSAP Ticker

To synchronize GSAP animations with WebXR updates, add a manual GSAP ticker in `index.tsx`:

```tsx
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

const GsapTicker = () => {
  useFrame(() => {
    gsap.ticker.tick();
  });
  return null;
};
```

Add `<GsapTicker />` inside `<Canvas>` to tick the GSAP ticker on every frame.

## Congratulations!

Congratulations! You’ve completed the WebXR First Steps tutorial, building a fully immersive and interactive game with audio, haptics, and animations to engage and entertain players. Here’s a final look at your game in action:

![Shrinking Targets](./assets/chapter6.gif)

[View full changes made in this chapter](https://github.com/meta-quest/webxr-first-steps-react/compare/chapter5...chapter6)

## What’s Next?

Though the tutorial is complete, your journey with WebXR has only just begun! Here are some ways you can continue to expand your game:

- **Augmented Reality Mode**: Experience your game in AR by allowing adding an `enterAR` button.
- **Dual Wielding**: Add a blaster to the other controller for a dual-wielding experience.
- **Larger Map**: Use a larger map, spawn targets everywhere, and add [teleportation](https://pmndrs.github.io/xr/docs/tutorials/teleport).
- **Timed Challenge**: Introduce a timer to create a race-against-the-clock gameplay style.
- **Moving Targets**: Add difficulty by having targets move around the scene.
- **Exploding Targets**: Make the targets explode with visual effects when hit.

Beyond expanding your game, you can also check out the [react-three/xr docs](https://pmndrs.github.io/xr/docs/) for more tutorials and insights into what is possible in WebXR using react.

Thank you for following along! Enjoy building even more with WebXR. Happy coding!
