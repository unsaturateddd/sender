// send/static/js/sendSignal.js

setTimeout(() => {
  console.log("⌛ Ждём появления кнопки 'Играть'...");

  const socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("📡 WebSocket подключён [наш sendSignal.js]");
  };

  socket.onerror = (e) => {
    console.error("❌ WebSocket ошибка [наш sendSignal.js]:", e);
  };

  function findAndHookButton() {
    const playBtn = document.getElementById("play_btn");
    if (playBtn) {
      console.log("✅ Кнопка #play_btn найдена [sendSignal.js]");
      playBtn.addEventListener("click", () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send("signal");
          console.log("📤 Сигнал отправлен с игры [sendSignal.js]");
        } else {
          console.warn("⚠️ WebSocket не готов [sendSignal.js]");
        }
      });
    } else {
      console.warn("❌ Кнопка #play_btn не найдена, пробую снова...");
      setTimeout(findAndHookButton, 500); // ждём ещё раз
    }
  }

  findAndHookButton();
}, 1500); // ждём после загрузки всего основного кода
