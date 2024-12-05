export function startCountdown(endTime, elementId, buttonId) {
  const countdownElement = document.getElementById(elementId);
  const makeBidButton = document.getElementById(buttonId);

  function updateCountdown() {
    const now = new Date();
    const timeLeft = new Date(endTime) - now;

    if (timeLeft <= 0) {
      countdownElement.textContent = 'Closed';
      countdownElement.classList.add('text-red-500', 'font-bold');
      if (makeBidButton) {
        makeBidButton.style.display = 'none';
      }
      clearInterval(timer);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}
