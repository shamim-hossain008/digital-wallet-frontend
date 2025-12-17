export const playSuccessSound = () => {
  const audio = new Audio("/sounds/success.mp3");
  audio.volume = 0.6;
  audio.play().catch(() => {
    console.warn("Sound autoplay blocked");
  });
};
