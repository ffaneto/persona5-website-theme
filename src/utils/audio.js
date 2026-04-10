export const playSelectSound = () => {
  const audio = new Audio('/audio/select.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => {});
};
