import { create } from "zustand";

// countdownStore.ts
interface CountdownState {
  timeLeft: number;
  timerId: ReturnType<typeof setTimeout> | null;
  startCountdown: (duration: number, onComplete: () => void) => void;
  stopCountdown: () => void;
}

export const useCountdownStore = create<CountdownState>((set, get) => ({
  timeLeft: 0,
  timerId: null,

  startCountdown: (duration, onComplete) => {
    // Clear any existing timers first
    get().stopCountdown();

    set({ timeLeft: duration });

    const id = setInterval(() => {
      const currentTime = get().timeLeft;
      if (currentTime <= 1) {
        get().stopCountdown();
        onComplete(); // Trigger the actual DELETE mutate here!
      } else {
        set({ timeLeft: currentTime - 1 });
      }
    }, 1000);

    set({ timerId: id });
  },

  stopCountdown: () => {
    const id = get().timerId;
    if (id) clearInterval(id);
    set({ timerId: null, timeLeft: 0 });
  },
}));
