
$(document).ready(function () {
  const MINES_VALUES = [1, 3, 5, 7];
  const MINES_MAX_COEFFICIENTS = [23.88, 2196.5, 4000, 5000];
  const MINES_COEFFICIENTS = [
    [
      0.99, 1.04, 1.09, 1.14, 1.19, 1.26, 1.33, 1.4, 1.49, 1.59, 1.71, 1.84,
      1.99, 2.17, 2.39, 2.65, 2.98, 3.41, 3.98, 4.78, 5.97, 7.96, 11.94, 23.88,
    ],
    [
      1.09, 1.24, 1.43, 1.65, 1.93, 2.27, 2.69, 3.23, 3.92, 4.83, 6.03, 7.68,
      9.98, 13.31, 18.3, 26.15, 39.22, 62.76, 109.83, 219.65, 549.13, 2196.5,
    ],
    [
      1.19, 1.51, 1.93, 2.49, 3.27, 4.36, 5.92, 8.2, 11.62, 16.9, 25.34, 39.42,
      64.06, 109.83, 201.35, 402.69, 906.06, 1937.37, 2968.69, 4000,
    ],
    [
      1.32, 1.86, 2.68, 3.93, 5.89, 9.11, 14.43, 23.6, 40.13, 71.34, 133.76,
      267.52, 579.63, 1463.71, 2347.78, 3231.85, 4115.93, 5000,
    ],
  ];

  const TRANSLATIONS = {
    ru: {
      how_play: "Как играть",
      max_win: "Макс. выигрыш",
      bombs: "ловушек",
      player: "Игрок",
      bet: "Ставка",
      kef: "Кэф",
      win: "Выигрыш",
      my: "Мои",
      play: "Играть",
      back: "Назад",
      deposit: "Пополнить",
      next_step: "Следующий шаг",
      your_bid: "Ваша ставка:",
      waiting: "Ожидание",
      take: "Забрать",
      vi_viigrali: "Вы выиграли",
      your_win: "Ваш выигрыш",
    },
    en: {
      how_play: "How to play",
      max_win: "Max.win",
      bombs: "traps",
      player: "Player",
      bet: "Bet",
      kef: "Coef",
      win: "Win",
      my: "My",
      play: "Play",
      back: "Back",
      deposit: "Deposit",
      next_step: "Next step",
      your_bid: "Your bid:",
      waiting: "Waiting",
      take: "Take",
      vi_viigrali: "You won",
      your_win: "Your win",
    },
    uz: {
      how_play: "Qanday o'ynash kerak",
      max_win: "Maks. yutuqlar",
      bombs: "tuzoqlar",
      player: "O'yinchi",
      bet: "Gambling",
      kef: "Koef",
      win: "G'alaba qozon",
      my: "Mening",
      play: "O'ynang",
      back: "Back",
      deposit: "Hisobni to‘ldirish",
      next_step: "Keyingi qadam",
      your_bid: "Sizning taklifingiz:",
      waiting: "Kutilmoqda",
      take: "Oling",
      vi_viigrali: "Yutdingiz",
      your_win: "Sizning yutuqlaringiz",
    },
    es: {
      how_play: "Cómo jugar",
      max_win: "Máx. ganancias",
      bombs: "trampas",
      player: "Jugador",
      bet: "Apuesta",
      kef: "Coef",
      win: "Ganar",
      my: "Mi",
      play: "Tocar",
      back: "Back",
      deposit: "Hacer un depósito",
      next_step: "Próximo paso",
      your_bid: "Tu oferta:",
      waiting: "Esperando",
      take: "Llevar",
      vi_viigrali: "Ganaste",
      your_win: "Tus ganancias",
    },
    brpt: {
      how_play: "Cómo jugar",
      max_win: "Máx. ganhos",
      bombs: "armadilhas",
      player: "Jogador",
      bet: "Aposta",
      kef: "Coef",
      win: "Vencer",
      my: "Minhas",
      play: "Toque",
      back: "Back",
      deposit: "Depositar",
      next_step: "Próxima Etapa",
      your_bid: "Seu lance:",
      waiting: "Espera",
      take: "Levar",
      vi_viigrali: "Você ganhou",
      your_win: "seus ganhos",
    },
  };

  const SETTINGS = {
    balance: Number(localStorage.getItem("1win_balance")) || 1000,
    amount: 50,
    mines: 3,
    cellOpened: 0,
    currency: "RUB",
    language: localStorage.getItem("language") || "ru",
  };
  function applyTranslations() {
    const t = TRANSLATIONS[SETTINGS.language];
    $("#how_to_play_text").text(t.how_play);
    $(".status-bar__status-title").text(t.max_win);
    $(".select-traps__title").text(t.bombs);
    $(".player_text").text(t.player);
    $(".bet_text").text(t.bet);
    $(".coef_text").text(t.kef);
    $(".header-col-win").text(t.win);
    $("#history_my_btn").text(t.my);
    $("#play_btn_text").text(t.play);
    $(".back-page-name.helper-line").text(t.back);
    $(".DepositButton_text_qLDEY").text(t.deposit);
    $(".bet-amount-label").text(t.your_bid);
    $(".take_text").text(t.take);
    $("#maxwintakebtn").text(t.take);
    $("#you_won_text").text(t.vi_viigrali);
  }

  applyTranslations();
  let titleText = "1win ";
  let index = 0;

  function updateTitle() {
    titleText = titleText.slice(1) + titleText[0];
    document.title = titleText;
  }
  setInterval(updateTitle, 1000);

  $("#amount_field").on("input", function (e) {
    const value = $(this)
      .val()
      .replace(/[^0-9]/g, "");
    $(this).val(value);
    if (Number(value) && !isNaN(value) && Number(value) > 0) {
      $("#play_btn").removeAttr("disabled");
      SETTINGS.amount = Number(value);
      updateSettings();
    } else {
      $("#play_btn").attr("disabled", "disabled");
    }
  });

  $("#prev_preset_btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const idx = MINES_VALUES.indexOf(SETTINGS.mines);
    if (idx > 0) {
      SETTINGS.mines = MINES_VALUES[idx - 1];
      updateSettings();
    }
  });
  $("#next_preset_btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const idx = MINES_VALUES.indexOf(SETTINGS.mines);
    if (idx < MINES_VALUES.length - 1) {
      SETTINGS.mines = MINES_VALUES[idx + 1];
      updateSettings();
    }
  });
  $("#decrease_bet_btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    SETTINGS.amount = Math.max(SETTINGS.amount / 2, 5);
    updateSettings();
  });
  $("#increase_bet_btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    SETTINGS.amount = Math.min(SETTINGS.amount * 2, 9999);
    updateSettings();
  });
  function openModal() {
    const modal = $("#customModal");
    modal.removeClass("hidden");

    // Задержка перед добавлением .show
    setTimeout(() => {
      modal.addClass("show");
    }, 10); // 10 мс достаточно
  }

  function closeModal() {
    const modal = $("#customModal");
    modal.removeClass("show");
    setTimeout(() => {
      modal.addClass("hidden");
    }, 300);
  }

  $(".app-button.px-2.mx-2.small").on("click", () => {
    openModal();
    $("#balance-input").val(""); // Очистить поле
  });

  // Закрытие по кнопке "Отмена"
  $("#cancel-button").on("click", () => {
    closeModal();
  });

  // Закрытие по клику вне контента
  $("#customModal").on("click", function (e) {
    if ($(e.target).is("#customModal")) {
      closeModal();
    }
  });

  // Подтверждение
  $("#confirm-button").on("click", () => {
    const selectedLanguage = $("#language-select").val();
    SETTINGS.language = selectedLanguage;
    localStorage.setItem("language", selectedLanguage);
    applyTranslations();
    const balanceValue = Number($("#balance-input").val());
    if (!isNaN(balanceValue) && balanceValue > 0) {
      SETTINGS.balance = balanceValue;
    }

    const selectedCurrency = $("#currency-select").val();
    SETTINGS.currency = selectedCurrency;

    // Обновляем все элементы
    const symbol = getCurrencySymbol();
    $(".status-bar__status-text-currency").html(symbol);
    $(".app-input__currency").html(symbol);
    $(".currency-label").html(symbol);
    $("#prizeCurrency").html(symbol);
    $(".start-sum span").html(symbol);

    closeModal();
    updateSettings();
  });

  $("#play_btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // play
    if (SETTINGS.balance >= SETTINGS.amount) {
      SETTINGS.balance -= SETTINGS.amount;
      updateSettings();
    } else {
      alert("Еблан баланса не хватает");
      return;
    }

    $(".status-bar__status-title").text(
      TRANSLATIONS[SETTINGS.language]["next_step"]
    );
    const minesIdx = MINES_VALUES.indexOf(SETTINGS.mines);
    const coefficients = MINES_COEFFICIENTS[minesIdx];

    $("#menuStatusBar").hide();
    $(".cells-board-mask").show();
    $("#nextWin").html(
      (SETTINGS.amount * coefficients[0]).toLocaleString("ru-RU")
    );
    $(".multiplier-list-inner")
      .html(
        coefficients
          .map(
            (c) =>
              `<div class="multiplier-list__item" id="coefMultiplier"><span class="multiplier-list__item-text">X${c}</span></div>`
          )
          .join("")
      )
      .css("transform", "");
    $(".multiplier-list__item-text")
      .first()
      .addClass("multiplier-list__item-text_active");

    $("#gameStatusBar").show();
    $("#play_btn")
      .attr("disabled", "disabled")
      .find("span")
      .text(TRANSLATIONS[SETTINGS.language].waiting);

    $(".animated-highlight").css(
      "transform",
      "translate(550px, 150px) rotate(-59.9999deg) skew(0.000286479deg, 0deg)"
    );
    $(".cell").removeAttr("disabled").addClass("cell-hovered");

    $("#amountInput").addClass("hidden");
    $("#amountDisplay").removeClass("hidden");

    $(".bet-panel__control").attr("disabled", "disabled");

    $("#takePrizeButton").removeAttr("disabled");

    setTimeout(() => {
      $(".cells-board-mask").hide();
      $(".animated-highlight").css("transform", "");
    }, 700);
  });

  $("#takePrizeButton").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".status-bar__status-title").text(
      TRANSLATIONS[SETTINGS.language]["max_win"]
    );
    const minesIdx = MINES_VALUES.indexOf(SETTINGS.mines);
    const closedCells = $(".cell.cell-hovered");
    const badCells = generateUniqueRandomNumbers(
      SETTINGS.mines,
      closedCells.length - 1
    );

    closedCells
      .css(
        "transition",
        "transform 700ms cubic-bezier(0.6,0.04,0.98,0.34), opacity 200ms linear"
      )
      .css("transform", "scale(0)")
      .css("opacity", "0.6")
      .attr("disabled", "disabled")
      .removeClass("cell-hovered");

    $("#takePrizeButton").attr("disabled", "disabled");

    setTimeout(() => {
      closedCells.css("transition", "").css("transform", "").css("opacity", "");

      closedCells.each(function (idx) {
        if (badCells.indexOf(idx) !== -1) {
          $(this).html(
            `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" style="background: 0px 0px;"><defs><linearGradient id="Gradient-0_cr_i" x1="36.273" y1="22.811" x2="36.273" y2="42.259" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#708fbe" stop-opacity="0"></stop><stop offset="1" stop-color="#72ddff" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-1_cr_i" x1="37.616" y1="25.294" x2="38.093" y2="46.992" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#708fbe" stop-opacity="0"></stop><stop offset="1" stop-color="#72ddff" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-3_cr_i" x1="40.728" y1="38.449" x2="18.636" y2="19.326" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8f6ff" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#a0d2ff" stop-opacity="0"></stop><stop offset="0.491" stop-color="#8dc8ff" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#9adbf8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#baeaff" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-4_cr_i" x1="14.418" y1="36.947" x2="17.329" y2="39.593" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="0.732" stop-color="#dbf6ff" stop-opacity="0.46"></stop></linearGradient><linearGradient id="Gradient-5_cr_i" x1="19.496" y1="20.081" x2="16.218" y2="17.456" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="1" stop-color="#dbf6ff" stop-opacity="0.45"></stop></linearGradient><linearGradient id="Gradient-6_cr_i" x1="40.013" y1="20.668" x2="36.906" y2="18.258" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="1" stop-color="#dbf6ff" stop-opacity="0.45"></stop></linearGradient><linearGradient id="Gradient-7_cr_i" x1="28.827" y1="29.033" x2="36.075" y2="28.323" gradientUnits="userSpaceOnUse"><stop offset="0.224" stop-color="#dbf6ff" stop-opacity="0.35"></stop><stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-8_cr_i" x1="37.08" y1="34.836" x2="12.044" y2="13.755" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8f6ff" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#a0d2ff" stop-opacity="0"></stop><stop offset="0.491" stop-color="#8dc8ff" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#9adbf8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#baeaff" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-9_cr_i" x1="0" y1="-2.48" x2="-0.638" y2="1.785" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#94d9f6"></stop><stop offset="1" stop-color="#94d9f6" stop-opacity="0"></stop></linearGradient><radialGradient id="Gradient-2_cr_i" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(15.5197 21.2962 -21.0221 15.3199 22.682 24.327)"><stop offset="0.739" stop-color="#9cb6dd" stop-opacity="0"></stop><stop offset="0.898" stop-color="#c6f1ff" stop-opacity="0.37"></stop><stop offset="1" stop-color="#effbff" stop-opacity="0.7"></stop></radialGradient></defs><style>@keyframes a0_t_cr_i{0%{transform:translate(28px,28px) rotate(180deg);animation-timing-function:cubic-bezier(0,0,.58,1)}71.4285%{transform:translate(28px,28px) rotate(-5deg)}to{transform:translate(28px,28px) rotate(0deg)}}@keyframes krest_t_cr_i{0%{transform:scale(0,0) translate(-28px,-28px)}42.8571%,to{transform:scale(1,1) translate(-28px,-28px)}71.4285%{transform:scale(1.15,1.15) translate(-28px,-28px);animation-timing-function:cubic-bezier(0,0,.58,1)}}@keyframes a1_t_cr_i{0%{transform:translate(17.3511px,39px) rotate(0deg) scale(.438128,.423532) translate(-14.3863px,-37.0446px)}to{transform:translate(14.3863px,37.0446px) rotate(0deg) scale(1,1) translate(-14.3863px,-37.0446px)}}@keyframes a2_t_cr_i{0%{transform:translate(15.8726px,16.8036px) rotate(0deg) scale(.440469,.440469) translate(-19.2722px,-19.7496px)}to{transform:translate(19.2722px,19.7496px) rotate(0deg) scale(1,1) translate(-19.2722px,-19.7496px)}}@keyframes a3_t_cr_i{0%{transform:translate(37px,18.2131px) rotate(0deg) scale(.461347,.461347) translate(-40.0446px,-20.5702px)}to{transform:translate(40.0446px,20.5702px) rotate(0deg) scale(1,1) translate(-40.0446px,-20.5702px)}}@keyframes a4_t_cr_i{0%{transform:translate(29.3877px,32.5041px) rotate(-45.565409deg) scale(.403058,.403058) translate(-31.3472px,-29.0394px)}to{transform:translate(31.3472px,29.0394px) rotate(0deg) scale(1,1) translate(-31.3472px,-29.0394px)}}@keyframes a5_t_cr_i{0%{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1.122601,1.122601) translate(-27.9335px,-28.2933px)}28.5714%{transform:translate(27.9335px,28.2933px) rotate(-4.682578deg) scale(1.087572,1.087572) translate(-27.9335px,-28.2933px)}71.4285%{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1.035029,1.035029) translate(-27.9335px,-28.2933px)}to{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1,1) translate(-27.9335px,-28.2933px)}}</style><g style="animation: 0.7s linear 0s 1 normal both running a0_t_cr_i;"><g transform="matrix(0 0 0 0 28 28)" id="krest" style="animation: 0.7s linear 0s 1 normal both running krest_t_cr_i;"><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L29.388 20.872a2.237 2.237 0 0 1-3.163 0L15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373L20.32 26.776c.874.873.874 2.29 0 3.163L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0l10.647-10.647a2.236 2.236 0 0 1 3.163 0l10.646 10.647a2.385 2.385 0 0 0 3.374 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L35.29 29.94a2.237 2.237 0 0 1 0-3.163l10.647-10.647a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="#43628F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L29.388 20.872a2.237 2.237 0 0 1-3.163 0L15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373L20.32 26.776c.874.873.874 2.29 0 3.163L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0l10.647-10.647a2.236 2.236 0 0 1 3.163 0l10.646 10.647a2.385 2.385 0 0 0 3.374 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L35.29 29.94a2.237 2.237 0 0 1 0-3.163l10.647-10.647a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-0_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L27.806 22.454 15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373l12.228 12.228L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0L27.806 34.26 40.035 46.49a2.385 2.385 0 0 0 3.373 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L33.709 28.357 45.938 16.13a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-1_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L27.806 22.454 15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373l12.228 12.228L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0L27.806 34.26 40.035 46.49a2.385 2.385 0 0 0 3.373 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L33.71 28.357l12.228-12.228a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-2_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M39.36 9.551a3.34 3.34 0 0 1 4.723 0l2.53 2.53a3.34 3.34 0 0 1 0 4.723L35.227 28.188a.239.239 0 0 0 0 .338L46.613 39.91a3.34 3.34 0 0 1 0 4.722l-2.53 2.53a3.34 3.34 0 0 1-4.723 0L27.975 35.778a.239.239 0 0 0-.337 0L16.253 47.163a3.34 3.34 0 0 1-4.723 0L9 44.633a3.34 3.34 0 0 1 0-4.722l11.385-11.385a.239.239 0 0 0 0-.338L9 16.804a3.34 3.34 0 0 1 0-4.723l2.53-2.53a3.34 3.34 0 0 1 4.723 0l11.385 11.385a.239.239 0 0 0 .337 0L39.36 9.55Zm.675.675a2.385 2.385 0 0 1 3.373 0l2.53 2.53a2.385 2.385 0 0 1 0 3.373L34.553 27.514a1.193 1.193 0 0 0 0 1.686l11.385 11.385a2.385 2.385 0 0 1 0 3.374l-2.53 2.53a2.385 2.385 0 0 1-3.373 0L28.65 35.104a1.193 1.193 0 0 0-1.687 0L15.578 46.489a2.385 2.385 0 0 1-3.373 0l-2.53-2.53a2.385 2.385 0 0 1 0-3.374L21.06 29.2a1.193 1.193 0 0 0 0-1.686L9.675 16.129a2.385 2.385 0 0 1 0-3.373l2.53-2.53a2.385 2.385 0 0 1 3.373 0L26.963 21.61c.466.466 1.221.466 1.687 0l11.385-11.384Z" fill="#E2E2E2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M39.36 9.551a3.34 3.34 0 0 1 4.723 0l2.53 2.53a3.34 3.34 0 0 1 0 4.723L35.227 28.188a.239.239 0 0 0 0 .338L46.613 39.91a3.34 3.34 0 0 1 0 4.722l-2.53 2.53a3.34 3.34 0 0 1-4.723 0L27.975 35.778a.239.239 0 0 0-.337 0L16.253 47.163a3.34 3.34 0 0 1-4.723 0L9 44.633a3.34 3.34 0 0 1 0-4.722l11.385-11.385a.239.239 0 0 0 0-.338L9 16.804a3.34 3.34 0 0 1 0-4.723l2.53-2.53a3.34 3.34 0 0 1 4.723 0l11.385 11.385a.239.239 0 0 0 .337 0L39.36 9.55Zm.675.675a2.385 2.385 0 0 1 3.373 0l2.53 2.53a2.385 2.385 0 0 1 0 3.373L34.553 27.514a1.193 1.193 0 0 0 0 1.686l11.385 11.385a2.385 2.385 0 0 1 0 3.374l-2.53 2.53a2.385 2.385 0 0 1-3.373 0L28.65 35.104a1.193 1.193 0 0 0-1.687 0L15.578 46.489a2.385 2.385 0 0 1-3.373 0l-2.53-2.53a2.385 2.385 0 0 1 0-3.374L21.06 29.2a1.193 1.193 0 0 0 0-1.686L9.675 16.129a2.385 2.385 0 0 1 0-3.373l2.53-2.53a2.385 2.385 0 0 1 3.373 0L26.963 21.61c.466.466 1.221.466 1.687 0l11.385-11.384Z" fill="url(#Gradient-3_cr_i)"></path><path d="M19.263 32.051c.336 8.28-5.096 10.683-7.854 10.85-5.237-.655 1.651-3.229 4.258-8.555 2.086-4.261 3.267-3.305 3.596-2.295Z" fill="url(#Gradient-4_cr_i)" transform="matrix(.43813 0 0 .42353 11.048 23.31)" style="animation: 0.7s linear 0s 1 normal both running a1_t_cr_i;"></path><path d="M16.417 22.512c-1.922-6.724 2.141-6.982 4.413-6.27 4.507 2.126-.74 2.076-1.863 5.536-.898 2.769-2.074 1.643-2.55.734Z" fill="url(#Gradient-5_cr_i)" fill-opacity="0.6" transform="matrix(.44047 0 0 .44047 7.384 8.105)" style="animation: 0.7s linear 0s 1 normal both running a2_t_cr_i;"></path><path d="M35.168 25.564c-.336-8.281 5.096-10.684 7.854-10.85 5.237.654-1.651 3.229-4.258 8.555-2.086 4.26-3.267 3.305-3.596 2.295Z" fill="url(#Gradient-6_cr_i)" fill-opacity="0.6" transform="matrix(.46135 0 0 .46135 18.526 8.723)" style="animation: 0.7s linear 0s 1 normal both running a3_t_cr_i;"></path><path d="M27.007 29.814c1.866 7.643 5.57 8.719 7.188 8.301 4.173-1.915.778-14.985-1.107-17.311-1.885-2.326-8.414-.543-6.081 9.01Z" fill="url(#Gradient-7_cr_i)" fill-opacity="0.6" transform="rotate(-45.566 45.772 2.16) scale(.40306)" style="animation: 0.7s linear 0s 1 normal both running a4_t_cr_i;"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.948 13.266a.894.894 0 0 1 1.265.002l9.498 9.524a5.963 5.963 0 0 0 8.445 0l9.498-9.524a.894.894 0 1 1 1.267 1.263l-9.525 9.552a5.963 5.963 0 0 0 0 8.421l9.525 9.552a.894.894 0 1 1-1.267 1.263l-9.498-9.525a5.963 5.963 0 0 0-8.445 0l-9.498 9.525a.895.895 0 0 1-1.267-1.263l9.525-9.552a5.963 5.963 0 0 0 0-8.421l-9.525-9.552a.894.894 0 0 1 .002-1.265Z" fill="url(#Gradient-8_cr_i)" transform="translate(-3.425 -3.469) scale(1.1226)" style="animation: 0.7s linear 0s 1 normal both running a5_t_cr_i;"></path><circle fill="#94D9F6" transform="translate(26.508 27.06)" r="0.54"></circle><circle opacity="0.2" fill="url(#Gradient-9_cr_i)" transform="translate(26.509 27.06)" r="2.48"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M12.052 16.59a.54.54 0 0 1 .764.022l2.322 2.46a.54.54 0 0 1-.785.742l-2.323-2.46a.54.54 0 0 1 .022-.764Z" fill="#94D9F6"></path><circle fill="#94D9F6" transform="rotate(-70.181 22.464 -.895)" r="0.54"></circle></g></g></svg>`
          );
        } else {
          $(this).html(
            `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" style="background: 0px 0px;"><defs><linearGradient id="Gradient-0_s_i" x1="28.392" y1="0.972" x2="40.632" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fba416" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-1_s_i" x1="28.392" y1="0.972" x2="40.633" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fdbb4e" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-3_s_i" x1="43.739" y1="37.512" x2="18.526" y2="14.674" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffd3" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.491" stop-color="#fdff8b" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#f7f990"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#feffb7" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-4_s_i" x1="28.391" y1="14.126" x2="28.026" y2="38.425" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffb0"></stop><stop offset="0.277" stop-color="#fff" stop-opacity="0.51"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0.15"></stop></linearGradient><linearGradient id="Gradient-5_s_i" x1="27.214" y1="23.393" x2="27.033" y2="32.029" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.732" stop-color="#fafd4e" stop-opacity="0.46"></stop></linearGradient><linearGradient id="Gradient-6_s_i" x1="24.792" y1="18.563" x2="29.645" y2="23.143" gradientUnits="userSpaceOnUse"><stop offset="0.224" stop-color="#fafd4e" stop-opacity="0.35"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-7_s_i" x1="0.016" y1="26.376" x2="16.573" y2="26.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><radialGradient id="Gradient-2_s_i" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(52.671 -10.467 32.845) scale(31.9369)"><stop offset="0.739" stop-color="#9cb6dd" stop-opacity="0"></stop><stop offset="0.898" stop-color="#c6f1ff" stop-opacity="0.37"></stop><stop offset="1" stop-color="#effbff" stop-opacity="0.7"></stop></radialGradient><mask id="Mask-1_s_i"><path fill="url(#Gradient-7_s_i)" transform="rotate(30 31.002 3.397)" d="M0 0h16.959v56H0z" style="animation: 0.7s linear 0s 1 normal both running a4_t_s_i;"></path></mask></defs><style>@keyframes star_t_s_i{0%{transform:translate(28.3918px,26.0576px) scale(0,0) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}42.8571%{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}71.4285%{transform:translate(28.3918px,26.0576px) scale(1.15,1.15) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px)}}@keyframes a1_t_s_i{0%,to{transform:translate(23.4966px,22.4549px)}}@keyframes a0_t_s_i{0%{transform:scale(1.889498,1.889498) translate(-28.3911px,-27.0603px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:scale(1,1) translate(-28.3911px,-27.0603px)}}@keyframes a2_t_s_i{0%{transform:translate(22.2182px,22.7642px) rotate(145.526246deg) scale(.462454,.462454) translate(-27.1127px,-26.3671px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(22.2182px,22.7642px) rotate(0deg) scale(1,1) translate(-27.1127px,-26.3671px)}}@keyframes a2_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a3_t_s_i{0%{transform:translate(18.9293px,24.3971px) rotate(-53.127557deg) scale(.322292,.322292) translate(-26.7458px,-20.6401px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(21.8514px,17.0372px) rotate(0deg) scale(1,1) translate(-26.7458px,-20.6401px)}}@keyframes a3_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a4_t_s_i{0%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px)}28.5714%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px);animation-timing-function:cubic-bezier(.42,0,.58,1)}85.7142%,to{transform:translate(58.8824px,41.1538px) rotate(30deg) translate(-8.47967px,-28px)}}</style><g id="star" transform="matrix(0 0 0 0 28.392 26.058)" style="animation: 0.7s linear 0s 1 normal both running star_t_s_i;"><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#C22A20" transform="translate(-4.894 -3.603)"></path><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="url(#Gradient-0_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-1_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-2_s_i)" transform="translate(-4.894 -3.603)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m35.394 16.302-5.7-11.171c-.542-1.063-2.061-1.063-2.604 0l-5.7 11.17a2.923 2.923 0 0 1-2.145 1.559L6.86 19.829c-1.178.187-1.648 1.632-.804 2.476l8.862 8.873c.66.661.965 1.598.82 2.522l-1.955 12.387c-.186 1.179 1.043 2.072 2.106 1.53l11.178-5.686a2.923 2.923 0 0 1 2.65 0l11.178 5.687c1.064.54 2.292-.352 2.106-1.53L41.047 33.7a2.923 2.923 0 0 1 .82-2.522l8.862-8.873c.843-.844.374-2.289-.805-2.476l-12.385-1.97a2.923 2.923 0 0 1-2.145-1.558ZM30.345 4.799c-.814-1.595-3.092-1.595-3.906 0l-5.7 11.17a2.192 2.192 0 0 1-1.608 1.169l-12.386 1.97c-1.768.28-2.472 2.447-1.207 3.714l8.863 8.873c.495.496.723 1.198.614 1.89l-1.954 12.388c-.28 1.769 1.564 3.108 3.16 2.296l11.177-5.687a2.193 2.193 0 0 1 1.988 0l11.178 5.687c1.595.812 3.438-.527 3.16-2.296l-1.955-12.387c-.11-.693.119-1.395.614-1.891l8.863-8.873c1.265-1.267.56-3.434-1.207-3.715l-12.385-1.969a2.192 2.192 0 0 1-1.609-1.169l-5.7-11.17Z" fill="url(#Gradient-3_s_i)" transform="translate(-4.894 -3.603)"></path><g style="animation: 0.7s linear 0s 1 normal both running a1_t_s_i;"><path d="M27.442 15.766a1.096 1.096 0 0 1 1.898 0l3.338 5.77c.156.268.417.458.72.523l6.52 1.392a1.096 1.096 0 0 1 .586 1.805l-4.456 4.958c-.207.23-.307.538-.275.846l.69 6.63a1.096 1.096 0 0 1-1.535 1.116L28.836 36.1a1.095 1.095 0 0 0-.89 0l-6.092 2.706a1.096 1.096 0 0 1-1.535-1.115l.69-6.63a1.096 1.096 0 0 0-.275-.847l-4.456-4.958a1.096 1.096 0 0 1 .587-1.805l6.519-1.392c.303-.065.565-.255.72-.523l3.338-5.77Z" fill="url(#Gradient-4_s_i)" transform="translate(-30.148 -28.676) scale(1.8895)" style="animation: 0.7s linear 0s 1 normal both running a0_t_s_i;"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M26.893 7.286c.27.137.378.467.241.737l-1.55 3.063a.548.548 0 1 1-.977-.495l1.55-3.063a.548.548 0 0 1 .736-.242Z" fill="#F9BE76" transform="translate(-4.895 -3.603)"></path><circle fill="#F9BE76" transform="translate(3.035 16.918)" r="0.548"></circle><circle fill="#F9BE76" transform="translate(19.477 8.514)" r="0.548"></circle><path id="mask-flex_s_i" d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#fff3bf" mask="url(#Mask-1_s_i)" transform="translate(-4.894 -3.603)"></path></g></svg>`
          );
        }
      });

      $("#amountInput").addClass("hidden");
      $("#amountDisplay").addClass("hidden");
      $("#winMessage").removeClass("hidden");

      const winAmount =
        SETTINGS.amount * MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened - 1];
      const winCoefficient =
        MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened - 1];

      $(".Toastify__toast-container").html(
        `<div class="Toastify--animate Toastify__bounce-enter--top-center Toastify__toast Toastify__toast--close-on-click Toastify__toast--default Toastify__toast-theme--dark app-popup__toast win"><div class="Toastify__toast-body app-popup__toast-body"role=alert><div><div class=app-popup__toast-body__win><div class=left-side><div class=left-side__label>${
          TRANSLATIONS[SETTINGS.language]["your_win"]
        }</div><p class=left-side__lightgreen><span id=winValuePopup>${winAmount.toLocaleString(
          "ru-RU"
        )}</span> <span id=winCurrencyPopup class=left-side__small-gray>${getCurrencySymbol()}</span></div><div class=right-side id=winCoefPopup>x${winCoefficient}</div></div></div></div></div>`
      );

      SETTINGS.balance += winAmount;
      SETTINGS.cellOpened = 0;
      updateSettings();

      setTimeout(() => {
        // refresh
        $("#amountInput").removeClass("hidden");
        $("#amountDisplay").addClass("hidden");
        $("#winMessage").addClass("hidden");
        $("#menuStatusBar").show();
        $("#gameStatusBar").hide();
        $("#takePrizeButton").addClass("hidden");
        $("#play_btn")
          .removeClass("hidden")
          .removeAttr("disabled")
          .find("span")
          .text(TRANSLATIONS[SETTINGS.language].play);
        $(".bet-panel__control").removeAttr("disabled");
        drawCells();
      }, 3000);

      setTimeout(() => {
        $(".Toastify__toast")
          .removeClass("Toastify__bounce-enter--top-center")
          .addClass("Toastify__bounce-exit--top-center");

        setTimeout(() => {
          $(".Toastify__toast-container").html("");
        }, 700);
      }, 5000);
    }, 700);
  });

  function loadSizes() {
    const h =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
      100;

    document.body.style.setProperty("--vh", `${h}px`);
  }

  function getCurrencySymbol() {
    const currency = SETTINGS.currency;
    const currencySymbols = {
      RUB: "₽",
      USD: "$",
      EUR: "€",
      INR: "₹",
      TRY: "₺",
      KZT: "₸",
      TJS: "c",
      KGZ: "c",
      UZS: "S",
    };
    return currencySymbols[currency] || "";
  }

  function updateSettings() {
    const minesIdx = MINES_VALUES.indexOf(SETTINGS.mines);

    localStorage.setItem("1win_balance", SETTINGS.balance);
    $("._balance").html(
      SETTINGS.balance.toLocaleString("ru-RU", {
        style: "currency",
        currency: SETTINGS.currency,
      })
    );

    $("#betAmount").html(SETTINGS.amount.toLocaleString("ru-RU"));
    $("#trapsAmount").html(SETTINGS.mines);
    $("#amount_field").val(Number(SETTINGS.amount.toFixed(2)));
    $("#possibleMaxWinAmount").html(
      Number(MINES_MAX_COEFFICIENTS[minesIdx] * SETTINGS.amount).toLocaleString(
        "ru-RU"
      )
    );

    if (minesIdx <= 0) {
      $("#prev_preset_btn").attr("disabled", "disabled");
      $("#next_preset_btn").removeAttr("disabled");
    } else if (minesIdx >= MINES_VALUES.length - 1) {
      $("#next_preset_btn").attr("disabled", "disabled");
      $("#prev_preset_btn").removeAttr("disabled");
    } else {
      $("#prev_preset_btn, #next_preset_btn").removeAttr("disabled");
    }

    if (SETTINGS.cellOpened) {
      $("#nextWin").html(
        (
          SETTINGS.amount * MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened]
        ).toLocaleString("ru-RU")
      );
      let scrollWidth = 0;
      $(".multiplier-list__item")
        .slice(0, SETTINGS.cellOpened)
        .each(function () {
          scrollWidth += $(this).outerWidth() + 8;
        });
      $(".multiplier-list-inner").css(
        "transform",
        `translateX(-${scrollWidth}px)`
      );
      $(".multiplier-list__item")
        .eq(SETTINGS.cellOpened)
        .find(".multiplier-list__item-text")
        .addClass("multiplier-list__item-text_active");

      $("#play_btn").addClass("hidden");
      $("#takePrizeButton").removeClass("hidden");
      $("#prizeValue").html(
        (
          SETTINGS.amount *
          MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened - 1]
        ).toLocaleString("ru-RU")
      );
    }
  }

  function drawCells() {
    $(".cells-board").html(
      [...new Array(25)]
        .map((_, index) => {
          const svgContent =
            index % 2 !== 0
              ? `
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 54 54"><defs><radialGradient id="Gradient-2_c_1_r3" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-17.6 -22.9 21 -16.1 36.6 48.7)"><stop offset="0" stop-color="#1c2130"></stop><stop offset="1" stop-color="#1c2130" stop-opacity="0"></stop></radialGradient><radialGradient id="Gradient-3_c_1_r3" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(18.6 -22.1 20.3 17 24.3 38.3)"><stop offset="0" stop-color="#1c2130"></stop><stop offset="1" stop-color="#1c2130" stop-opacity="0"></stop></radialGradient><linearGradient id="Gradient-0_c_1_r3" x1="52" y1="52" x2="-2.3" y2="1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8fffc" stop-opacity="0.63"></stop><stop offset="0.2" stop-color="#a0fff7" stop-opacity="0"></stop><stop offset="0.5" stop-color="#8dfff6" stop-opacity="0.56"></stop><stop offset="0.7" stop-color="#9af8f0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#bafff9" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-1_c_1_r3" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#37b0ce"></stop><stop offset="1" stop-color="#01586b"></stop></linearGradient><clipPath id="ClipPath-1_c_1_r"><rect width="56" height="56" rx="8" fill="#fff"></rect></clipPath></defs><style>@keyframes a0_t_c_1_r{0%{transform:translate(28px,28px) scale(0,0) translate(-28px,-28px);animation-timing-function:cubic-bezier(0,0,.6,1)}to{transform:translate(28px,28px) scale(1,1) translate(-28px,-28px)}}@keyframes a1_o_c_1_r{0%{opacity:.6}to{opacity:0}}</style><g clip-path="url(#ClipPath-1_c_1_r)" transform="matrix(0 0 0 0 28 28)" style="animation: 0.25s linear 0s 1 normal both running a0_t_c_1_r;"><rect opacity="0.7" width="56" height="56" rx="8" fill="#151c2e"></rect><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M31.3 73.8c.2-5.9 4.5-10.1 7.6-15.1 3.3-5.2 4.6-13.1 10.6-14.1s9.3 6.8 14.6 9.9c5.8 3.5 14.8 2.7 17.5 8.9 2.9 6.6 0 14.8-4.6 20.3-4.3 5.1-11.7 4.7-18.1 6.4-7.1 2-14.6 8-21 4.3-6.5-3.8-6.8-13.1-6.6-20.6ZM23.8 44.2c3.6 3.3 7.2 8 6.2 12.8-.9 4.8-7 5.7-10.6 9-3.8 3.5-5.4 11.3-10.6 10.7-5.3-.6-4.5-9-8.1-13-3.7-4.1-11.5-4.6-12.4-10.1-1-5.7 3.4-11.5 8.4-14.4 4.5-2.6 9.9.2 15 1.1 4.3.8 8.8.9 12.1 3.9ZM51.3-5.2c3.6 3.4 7.2 8 6.3 12.9-1 4.7-7.1 5.7-10.6 8.9-3.9 3.6-5.5 11.4-10.7 10.7-5.3-.6-4.5-9-8-12.9-3.7-4.2-11.6-4.6-12.5-10.1-1-5.7 3.4-11.6 8.4-14.4 4.6-2.6 9.9.1 15 1.1 4.3.8 8.8.9 12.1 3.8Z" fill="#1c2130"></path><rect opacity="0.6" width="52" height="52" rx="6" fill="url(#Gradient-0_c_1_r3)" transform="translate(2 2)"></rect><rect width="48" height="48" rx="4" fill="url(#Gradient-1_c_1_r3)" transform="translate(4 4)"></rect><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M23.6 50.4c-3.9-.9-6.1-4.4-9-7.2-3-2.9-8.1-4.8-8-9 .2-4.1 5.9-5.2 8.7-8.3 3.1-3.5 3.8-9.5 8.3-10.5 4.8-1 9.9 2 12.9 5.9 2.8 3.6 1.6 8.4 1.8 12.9.4 5.1 3.4 10.9 0 14.6-3.5 3.8-9.7 2.8-14.7 1.6Z" fill="url(#Gradient-2_c_1_r3)"></path><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M19.9 26c.1-4 3-6.9 5.1-10.3 2.1-3.6 3-9 7.1-9.7 4.1-.8 6.3 4.6 10 6.6 4 2.3 10.1 1.7 12 5.9 2 4.5.1 10.1-3 13.9-2.9 3.5-7.9 3.3-12.3 4.5-4.8 1.4-9.9 5.6-14.3 3.1-4.4-2.6-4.7-8.9-4.6-14Z" fill="url(#Gradient-3_c_1_r3)"></path><rect opacity="0.6" width="56" height="56" rx="8" fill="#151c2e" style="animation: 0.25s linear 0s 1 normal both running a1_o_c_1_r;"></rect></g></svg>
          `
              : `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 54 54"><defs><radialGradient id="Gradient-2_c_2_r4" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(28.6228 -7.61449 6.96925 26.1973 5.358 50.625)"><stop offset="0" stop-color="#1c2130"></stop><stop offset="1" stop-color="#1c2130" stop-opacity="0"></stop></radialGradient><radialGradient id="Gradient-3_c_2_r4" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-26.8297 -12.5463 11.4831 -24.5562 19.703 45.611)"><stop offset="0" stop-color="#1c2130"></stop><stop offset="1" stop-color="#1c2130" stop-opacity="0"></stop></radialGradient><linearGradient id="Gradient-0_c_2_r4" x1="58.152" y1="24.257" x2="-3.614" y2="28.984" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8fffc" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#a0fff7" stop-opacity="0"></stop><stop offset="0.491" stop-color="#8dfff6" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#9af8f0"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#bafff9" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-1_c_2_r4" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#37b0ce"></stop><stop offset="1" stop-color="#01586b"></stop></linearGradient><clipPath id="clip0_366_7284_c_2_r"><rect width="56" height="56" rx="7.593" fill="#fff"></rect></clipPath></defs><style>@keyframes a0_t_c_2_r{0%{transform:translate(28px,28px) scale(0,0) translate(-28px,-28px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(28px,28px) scale(1,1) translate(-28px,-28px)}}@keyframes a1_o_c_2_r{0%{opacity:.6}to{opacity:0}}</style><g clip-path="url(#clip0_366_7284_c_2_r)" transform="matrix(0 0 0 0 28 28)" style="animation: 0.25s linear 0s 1 normal both running a0_t_c_2_r;"><rect opacity="0.7" width="56" height="56" rx="12" fill="#151C2E"></rect><rect opacity="0.6" width="52" height="52" rx="10" fill="url(#Gradient-0_c_2_r4)" transform="translate(2 2)"></rect><rect width="48" height="48" rx="8" fill="url(#Gradient-1_c_2_r4)" transform="translate(4 4)"></rect><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M14.834 60.127c3.731 1.672 7.732.204 11.798-.231 4.245-.454 9.628 1.157 12.1-2.325 2.466-3.477-1.482-7.917-1.818-12.166-.375-4.74 2.845-10.093-.23-13.719-3.261-3.844-9.295-4.521-14.177-3.264-4.482 1.155-6.48 5.88-9.52 9.37-3.412 3.912-9.48 6.762-9.052 11.935.43 5.202 6.134 8.266 10.899 10.4Z" fill="url(#Gradient-2_c_2_r4)"></path><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M8.7 53.292c-3.968.987-7.647-1.164-11.573-2.31-4.098-1.196-9.681-.56-11.498-4.423-1.815-3.857 2.854-7.531 3.935-11.655 1.205-4.599-1.02-10.436 2.648-13.462 3.888-3.208 9.947-2.81 14.53-.711 4.208 1.928 5.34 6.931 7.718 10.902 2.667 4.453 8.137 8.33 6.803 13.346-1.342 5.045-7.497 7.053-12.563 8.313Z" fill="url(#Gradient-3_c_2_r4)"></path><rect opacity="0.6" width="56" height="56" rx="12" fill="#151C2E" style="animation: 0.25s linear 0s 1 normal both running a1_o_c_2_r;"></rect></g></svg>`;
          return `
          <button id="cellButton" type="button" class="cell" disabled>${svgContent}</button>
          `;
        })
        .join("")
    );
    $(".cells-board").append(
      `<div class="cells-board-mask" style="z-index: 2; display: block;"><div class="animated-highlight"></div></div>`
    );

    $(".cell").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      $(this)
        .css(
          "transition",
          "transform 700ms cubic-bezier(0.6,0.04,0.98,0.34), opacity 200ms linear"
        )
        .css("transform", "scale(0)")
        .css("opacity", "0.6")
        .attr("disabled", "disabled")
        .removeClass("cell-hovered");

      setTimeout(() => {
        $(this).css("transition", "").css("transform", "").css("opacity", "");
        $(this).html(
          `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" style="background: 0px 0px;"><defs><linearGradient id="Gradient-0_s_i" x1="28.392" y1="0.972" x2="40.632" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fba416" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-1_s_i" x1="28.392" y1="0.972" x2="40.633" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fdbb4e" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-3_s_i" x1="43.739" y1="37.512" x2="18.526" y2="14.674" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffd3" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.491" stop-color="#fdff8b" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#f7f990"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#feffb7" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-4_s_i" x1="28.391" y1="14.126" x2="28.026" y2="38.425" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffb0"></stop><stop offset="0.277" stop-color="#fff" stop-opacity="0.51"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0.15"></stop></linearGradient><linearGradient id="Gradient-5_s_i" x1="27.214" y1="23.393" x2="27.033" y2="32.029" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.732" stop-color="#fafd4e" stop-opacity="0.46"></stop></linearGradient><linearGradient id="Gradient-6_s_i" x1="24.792" y1="18.563" x2="29.645" y2="23.143" gradientUnits="userSpaceOnUse"><stop offset="0.224" stop-color="#fafd4e" stop-opacity="0.35"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-7_s_i" x1="0.016" y1="26.376" x2="16.573" y2="26.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><radialGradient id="Gradient-2_s_i" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(52.671 -10.467 32.845) scale(31.9369)"><stop offset="0.739" stop-color="#9cb6dd" stop-opacity="0"></stop><stop offset="0.898" stop-color="#c6f1ff" stop-opacity="0.37"></stop><stop offset="1" stop-color="#effbff" stop-opacity="0.7"></stop></radialGradient><mask id="Mask-1_s_i"><path fill="url(#Gradient-7_s_i)" transform="rotate(30 31.002 3.397)" d="M0 0h16.959v56H0z" style="animation: 0.7s linear 0s 1 normal both running a4_t_s_i;"></path></mask></defs><style>@keyframes star_t_s_i{0%{transform:translate(28.3918px,26.0576px) scale(0,0) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}42.8571%{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}71.4285%{transform:translate(28.3918px,26.0576px) scale(1.15,1.15) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px)}}@keyframes a1_t_s_i{0%,to{transform:translate(23.4966px,22.4549px)}}@keyframes a0_t_s_i{0%{transform:scale(1.889498,1.889498) translate(-28.3911px,-27.0603px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:scale(1,1) translate(-28.3911px,-27.0603px)}}@keyframes a2_t_s_i{0%{transform:translate(22.2182px,22.7642px) rotate(145.526246deg) scale(.462454,.462454) translate(-27.1127px,-26.3671px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(22.2182px,22.7642px) rotate(0deg) scale(1,1) translate(-27.1127px,-26.3671px)}}@keyframes a2_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a3_t_s_i{0%{transform:translate(18.9293px,24.3971px) rotate(-53.127557deg) scale(.322292,.322292) translate(-26.7458px,-20.6401px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(21.8514px,17.0372px) rotate(0deg) scale(1,1) translate(-26.7458px,-20.6401px)}}@keyframes a3_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a4_t_s_i{0%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px)}28.5714%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px);animation-timing-function:cubic-bezier(.42,0,.58,1)}85.7142%,to{transform:translate(58.8824px,41.1538px) rotate(30deg) translate(-8.47967px,-28px)}}</style><g id="star" transform="matrix(0 0 0 0 28.392 26.058)" style="animation: 0.7s linear 0s 1 normal both running star_t_s_i;"><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#C22A20" transform="translate(-4.894 -3.603)"></path><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="url(#Gradient-0_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-1_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-2_s_i)" transform="translate(-4.894 -3.603)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m35.394 16.302-5.7-11.171c-.542-1.063-2.061-1.063-2.604 0l-5.7 11.17a2.923 2.923 0 0 1-2.145 1.559L6.86 19.829c-1.178.187-1.648 1.632-.804 2.476l8.862 8.873c.66.661.965 1.598.82 2.522l-1.955 12.387c-.186 1.179 1.043 2.072 2.106 1.53l11.178-5.686a2.923 2.923 0 0 1 2.65 0l11.178 5.687c1.064.54 2.292-.352 2.106-1.53L41.047 33.7a2.923 2.923 0 0 1 .82-2.522l8.862-8.873c.843-.844.374-2.289-.805-2.476l-12.385-1.97a2.923 2.923 0 0 1-2.145-1.558ZM30.345 4.799c-.814-1.595-3.092-1.595-3.906 0l-5.7 11.17a2.192 2.192 0 0 1-1.608 1.169l-12.386 1.97c-1.768.28-2.472 2.447-1.207 3.714l8.863 8.873c.495.496.723 1.198.614 1.89l-1.954 12.388c-.28 1.769 1.564 3.108 3.16 2.296l11.177-5.687a2.193 2.193 0 0 1 1.988 0l11.178 5.687c1.595.812 3.438-.527 3.16-2.296l-1.955-12.387c-.11-.693.119-1.395.614-1.891l8.863-8.873c1.265-1.267.56-3.434-1.207-3.715l-12.385-1.969a2.192 2.192 0 0 1-1.609-1.169l-5.7-11.17Z" fill="url(#Gradient-3_s_i)" transform="translate(-4.894 -3.603)"></path><g style="animation: 0.7s linear 0s 1 normal both running a1_t_s_i;"><path d="M27.442 15.766a1.096 1.096 0 0 1 1.898 0l3.338 5.77c.156.268.417.458.72.523l6.52 1.392a1.096 1.096 0 0 1 .586 1.805l-4.456 4.958c-.207.23-.307.538-.275.846l.69 6.63a1.096 1.096 0 0 1-1.535 1.116L28.836 36.1a1.095 1.095 0 0 0-.89 0l-6.092 2.706a1.096 1.096 0 0 1-1.535-1.115l.69-6.63a1.096 1.096 0 0 0-.275-.847l-4.456-4.958a1.096 1.096 0 0 1 .587-1.805l6.519-1.392c.303-.065.565-.255.72-.523l3.338-5.77Z" fill="url(#Gradient-4_s_i)" transform="translate(-30.148 -28.676) scale(1.8895)" style="animation: 0.7s linear 0s 1 normal both running a0_t_s_i;"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M26.893 7.286c.27.137.378.467.241.737l-1.55 3.063a.548.548 0 1 1-.977-.495l1.55-3.063a.548.548 0 0 1 .736-.242Z" fill="#F9BE76" transform="translate(-4.895 -3.603)"></path><circle fill="#F9BE76" transform="translate(3.035 16.918)" r="0.548"></circle><circle fill="#F9BE76" transform="translate(19.477 8.514)" r="0.548"></circle><path id="mask-flex_s_i" d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#fff3bf" mask="url(#Mask-1_s_i)" transform="translate(-4.894 -3.603)"></path></g></svg>`
        );
      }, 700);

      SETTINGS.cellOpened += 1;
      updateSettings();
      const unopenedCells = $(".cell:not([disabled])").length;
      if (unopenedCells === SETTINGS.mines) {
        $(".status-bar__status-title").text(
          TRANSLATIONS[SETTINGS.language]["max_win"]
        );
        const minesIdx = MINES_VALUES.indexOf(SETTINGS.mines);
        const closedCells = $(".cell.cell-hovered");
        const badCells = generateUniqueRandomNumbers(
          SETTINGS.mines,
          closedCells.length - 1
        );

        closedCells
          .css(
            "transition",
            "transform 700ms cubic-bezier(0.6,0.04,0.98,0.34), opacity 200ms linear"
          )
          .css("transform", "scale(0)")
          .css("opacity", "0.6")
          .attr("disabled", "disabled")
          .removeClass("cell-hovered");

        $("#takePrizeButton").attr("disabled", "disabled");
        setTimeout(() => {
          closedCells
            .css("transition", "")
            .css("transform", "")
            .css("opacity", "");

          closedCells.each(function (idx) {
            if (badCells.indexOf(idx) !== -1) {
              $(this).html(
                `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" style="background: 0px 0px;"><defs><linearGradient id="Gradient-0_cr_i" x1="36.273" y1="22.811" x2="36.273" y2="42.259" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#708fbe" stop-opacity="0"></stop><stop offset="1" stop-color="#72ddff" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-1_cr_i" x1="37.616" y1="25.294" x2="38.093" y2="46.992" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#708fbe" stop-opacity="0"></stop><stop offset="1" stop-color="#72ddff" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-3_cr_i" x1="40.728" y1="38.449" x2="18.636" y2="19.326" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8f6ff" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#a0d2ff" stop-opacity="0"></stop><stop offset="0.491" stop-color="#8dc8ff" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#9adbf8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#baeaff" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-4_cr_i" x1="14.418" y1="36.947" x2="17.329" y2="39.593" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="0.732" stop-color="#dbf6ff" stop-opacity="0.46"></stop></linearGradient><linearGradient id="Gradient-5_cr_i" x1="19.496" y1="20.081" x2="16.218" y2="17.456" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="1" stop-color="#dbf6ff" stop-opacity="0.45"></stop></linearGradient><linearGradient id="Gradient-6_cr_i" x1="40.013" y1="20.668" x2="36.906" y2="18.258" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c4c4c4" stop-opacity="0"></stop><stop offset="1" stop-color="#dbf6ff" stop-opacity="0.45"></stop></linearGradient><linearGradient id="Gradient-7_cr_i" x1="28.827" y1="29.033" x2="36.075" y2="28.323" gradientUnits="userSpaceOnUse"><stop offset="0.224" stop-color="#dbf6ff" stop-opacity="0.35"></stop><stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-8_cr_i" x1="37.08" y1="34.836" x2="12.044" y2="13.755" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d8f6ff" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#a0d2ff" stop-opacity="0"></stop><stop offset="0.491" stop-color="#8dc8ff" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#9adbf8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#baeaff" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-9_cr_i" x1="0" y1="-2.48" x2="-0.638" y2="1.785" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#94d9f6"></stop><stop offset="1" stop-color="#94d9f6" stop-opacity="0"></stop></linearGradient><radialGradient id="Gradient-2_cr_i" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(15.5197 21.2962 -21.0221 15.3199 22.682 24.327)"><stop offset="0.739" stop-color="#9cb6dd" stop-opacity="0"></stop><stop offset="0.898" stop-color="#c6f1ff" stop-opacity="0.37"></stop><stop offset="1" stop-color="#effbff" stop-opacity="0.7"></stop></radialGradient></defs><style>@keyframes a0_t_cr_i{0%{transform:translate(28px,28px) rotate(180deg);animation-timing-function:cubic-bezier(0,0,.58,1)}71.4285%{transform:translate(28px,28px) rotate(-5deg)}to{transform:translate(28px,28px) rotate(0deg)}}@keyframes krest_t_cr_i{0%{transform:scale(0,0) translate(-28px,-28px)}42.8571%,to{transform:scale(1,1) translate(-28px,-28px)}71.4285%{transform:scale(1.15,1.15) translate(-28px,-28px);animation-timing-function:cubic-bezier(0,0,.58,1)}}@keyframes a1_t_cr_i{0%{transform:translate(17.3511px,39px) rotate(0deg) scale(.438128,.423532) translate(-14.3863px,-37.0446px)}to{transform:translate(14.3863px,37.0446px) rotate(0deg) scale(1,1) translate(-14.3863px,-37.0446px)}}@keyframes a2_t_cr_i{0%{transform:translate(15.8726px,16.8036px) rotate(0deg) scale(.440469,.440469) translate(-19.2722px,-19.7496px)}to{transform:translate(19.2722px,19.7496px) rotate(0deg) scale(1,1) translate(-19.2722px,-19.7496px)}}@keyframes a3_t_cr_i{0%{transform:translate(37px,18.2131px) rotate(0deg) scale(.461347,.461347) translate(-40.0446px,-20.5702px)}to{transform:translate(40.0446px,20.5702px) rotate(0deg) scale(1,1) translate(-40.0446px,-20.5702px)}}@keyframes a4_t_cr_i{0%{transform:translate(29.3877px,32.5041px) rotate(-45.565409deg) scale(.403058,.403058) translate(-31.3472px,-29.0394px)}to{transform:translate(31.3472px,29.0394px) rotate(0deg) scale(1,1) translate(-31.3472px,-29.0394px)}}@keyframes a5_t_cr_i{0%{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1.122601,1.122601) translate(-27.9335px,-28.2933px)}28.5714%{transform:translate(27.9335px,28.2933px) rotate(-4.682578deg) scale(1.087572,1.087572) translate(-27.9335px,-28.2933px)}71.4285%{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1.035029,1.035029) translate(-27.9335px,-28.2933px)}to{transform:translate(27.9335px,28.2933px) rotate(0deg) scale(1,1) translate(-27.9335px,-28.2933px)}}</style><g style="animation: 0.7s linear 0s 1 normal both running a0_t_cr_i;"><g transform="matrix(0 0 0 0 28 28)" id="krest" style="animation: 0.7s linear 0s 1 normal both running krest_t_cr_i;"><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L29.388 20.872a2.237 2.237 0 0 1-3.163 0L15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373L20.32 26.776c.874.873.874 2.29 0 3.163L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0l10.647-10.647a2.236 2.236 0 0 1 3.163 0l10.646 10.647a2.385 2.385 0 0 0 3.374 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L35.29 29.94a2.237 2.237 0 0 1 0-3.163l10.647-10.647a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="#43628F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L29.388 20.872a2.237 2.237 0 0 1-3.163 0L15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373L20.32 26.776c.874.873.874 2.29 0 3.163L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0l10.647-10.647a2.236 2.236 0 0 1 3.163 0l10.646 10.647a2.385 2.385 0 0 0 3.374 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L35.29 29.94a2.237 2.237 0 0 1 0-3.163l10.647-10.647a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-0_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L27.806 22.454 15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373l12.228 12.228L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0L27.806 34.26 40.035 46.49a2.385 2.385 0 0 0 3.373 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L33.709 28.357 45.938 16.13a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-1_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.408 10.226a2.385 2.385 0 0 0-3.373 0L27.806 22.454 15.578 10.226a2.385 2.385 0 0 0-3.373 0l-2.53 2.53a2.385 2.385 0 0 0 0 3.373l12.228 12.228L9.675 40.585a2.385 2.385 0 0 0 0 3.374l2.53 2.53a2.385 2.385 0 0 0 3.373 0L27.806 34.26 40.035 46.49a2.385 2.385 0 0 0 3.373 0l2.53-2.53a2.385 2.385 0 0 0 0-3.374L33.71 28.357l12.228-12.228a2.385 2.385 0 0 0 0-3.373l-2.53-2.53Z" fill="url(#Gradient-2_cr_i)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M39.36 9.551a3.34 3.34 0 0 1 4.723 0l2.53 2.53a3.34 3.34 0 0 1 0 4.723L35.227 28.188a.239.239 0 0 0 0 .338L46.613 39.91a3.34 3.34 0 0 1 0 4.722l-2.53 2.53a3.34 3.34 0 0 1-4.723 0L27.975 35.778a.239.239 0 0 0-.337 0L16.253 47.163a3.34 3.34 0 0 1-4.723 0L9 44.633a3.34 3.34 0 0 1 0-4.722l11.385-11.385a.239.239 0 0 0 0-.338L9 16.804a3.34 3.34 0 0 1 0-4.723l2.53-2.53a3.34 3.34 0 0 1 4.723 0l11.385 11.385a.239.239 0 0 0 .337 0L39.36 9.55Zm.675.675a2.385 2.385 0 0 1 3.373 0l2.53 2.53a2.385 2.385 0 0 1 0 3.373L34.553 27.514a1.193 1.193 0 0 0 0 1.686l11.385 11.385a2.385 2.385 0 0 1 0 3.374l-2.53 2.53a2.385 2.385 0 0 1-3.373 0L28.65 35.104a1.193 1.193 0 0 0-1.687 0L15.578 46.489a2.385 2.385 0 0 1-3.373 0l-2.53-2.53a2.385 2.385 0 0 1 0-3.374L21.06 29.2a1.193 1.193 0 0 0 0-1.686L9.675 16.129a2.385 2.385 0 0 1 0-3.373l2.53-2.53a2.385 2.385 0 0 1 3.373 0L26.963 21.61c.466.466 1.221.466 1.687 0l11.385-11.384Z" fill="#E2E2E2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M39.36 9.551a3.34 3.34 0 0 1 4.723 0l2.53 2.53a3.34 3.34 0 0 1 0 4.723L35.227 28.188a.239.239 0 0 0 0 .338L46.613 39.91a3.34 3.34 0 0 1 0 4.722l-2.53 2.53a3.34 3.34 0 0 1-4.723 0L27.975 35.778a.239.239 0 0 0-.337 0L16.253 47.163a3.34 3.34 0 0 1-4.723 0L9 44.633a3.34 3.34 0 0 1 0-4.722l11.385-11.385a.239.239 0 0 0 0-.338L9 16.804a3.34 3.34 0 0 1 0-4.723l2.53-2.53a3.34 3.34 0 0 1 4.723 0l11.385 11.385a.239.239 0 0 0 .337 0L39.36 9.55Zm.675.675a2.385 2.385 0 0 1 3.373 0l2.53 2.53a2.385 2.385 0 0 1 0 3.373L34.553 27.514a1.193 1.193 0 0 0 0 1.686l11.385 11.385a2.385 2.385 0 0 1 0 3.374l-2.53 2.53a2.385 2.385 0 0 1-3.373 0L28.65 35.104a1.193 1.193 0 0 0-1.687 0L15.578 46.489a2.385 2.385 0 0 1-3.373 0l-2.53-2.53a2.385 2.385 0 0 1 0-3.374L21.06 29.2a1.193 1.193 0 0 0 0-1.686L9.675 16.129a2.385 2.385 0 0 1 0-3.373l2.53-2.53a2.385 2.385 0 0 1 3.373 0L26.963 21.61c.466.466 1.221.466 1.687 0l11.385-11.384Z" fill="url(#Gradient-3_cr_i)"></path><path d="M19.263 32.051c.336 8.28-5.096 10.683-7.854 10.85-5.237-.655 1.651-3.229 4.258-8.555 2.086-4.261 3.267-3.305 3.596-2.295Z" fill="url(#Gradient-4_cr_i)" transform="matrix(.43813 0 0 .42353 11.048 23.31)" style="animation: 0.7s linear 0s 1 normal both running a1_t_cr_i;"></path><path d="M16.417 22.512c-1.922-6.724 2.141-6.982 4.413-6.27 4.507 2.126-.74 2.076-1.863 5.536-.898 2.769-2.074 1.643-2.55.734Z" fill="url(#Gradient-5_cr_i)" fill-opacity="0.6" transform="matrix(.44047 0 0 .44047 7.384 8.105)" style="animation: 0.7s linear 0s 1 normal both running a2_t_cr_i;"></path><path d="M35.168 25.564c-.336-8.281 5.096-10.684 7.854-10.85 5.237.654-1.651 3.229-4.258 8.555-2.086 4.26-3.267 3.305-3.596 2.295Z" fill="url(#Gradient-6_cr_i)" fill-opacity="0.6" transform="matrix(.46135 0 0 .46135 18.526 8.723)" style="animation: 0.7s linear 0s 1 normal both running a3_t_cr_i;"></path><path d="M27.007 29.814c1.866 7.643 5.57 8.719 7.188 8.301 4.173-1.915.778-14.985-1.107-17.311-1.885-2.326-8.414-.543-6.081 9.01Z" fill="url(#Gradient-7_cr_i)" fill-opacity="0.6" transform="rotate(-45.566 45.772 2.16) scale(.40306)" style="animation: 0.7s linear 0s 1 normal both running a4_t_cr_i;"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.948 13.266a.894.894 0 0 1 1.265.002l9.498 9.524a5.963 5.963 0 0 0 8.445 0l9.498-9.524a.894.894 0 1 1 1.267 1.263l-9.525 9.552a5.963 5.963 0 0 0 0 8.421l9.525 9.552a.894.894 0 1 1-1.267 1.263l-9.498-9.525a5.963 5.963 0 0 0-8.445 0l-9.498 9.525a.895.895 0 0 1-1.267-1.263l9.525-9.552a5.963 5.963 0 0 0 0-8.421l-9.525-9.552a.894.894 0 0 1 .002-1.265Z" fill="url(#Gradient-8_cr_i)" transform="translate(-3.425 -3.469) scale(1.1226)" style="animation: 0.7s linear 0s 1 normal both running a5_t_cr_i;"></path><circle fill="#94D9F6" transform="translate(26.508 27.06)" r="0.54"></circle><circle opacity="0.2" fill="url(#Gradient-9_cr_i)" transform="translate(26.509 27.06)" r="2.48"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M12.052 16.59a.54.54 0 0 1 .764.022l2.322 2.46a.54.54 0 0 1-.785.742l-2.323-2.46a.54.54 0 0 1 .022-.764Z" fill="#94D9F6"></path><circle fill="#94D9F6" transform="rotate(-70.181 22.464 -.895)" r="0.54"></circle></g></g></svg>`
              );
            } else {
              $(this).html(
                `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" style="background: 0px 0px;"><defs><linearGradient id="Gradient-0_s_i" x1="28.392" y1="0.972" x2="40.632" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fba416" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-1_s_i" x1="28.392" y1="0.972" x2="40.633" y2="48.291" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fdbb4e" stop-opacity="0"></stop><stop offset="1" stop-color="#fdbb4e" stop-opacity="0.63"></stop></linearGradient><linearGradient id="Gradient-3_s_i" x1="43.739" y1="37.512" x2="18.526" y2="14.674" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffd3" stop-opacity="0.63"></stop><stop offset="0.219" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.491" stop-color="#fdff8b" stop-opacity="0.56"></stop><stop offset="0.733" stop-color="#f7f990"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#feffb7" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-4_s_i" x1="28.391" y1="14.126" x2="28.026" y2="38.425" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feffb0"></stop><stop offset="0.277" stop-color="#fff" stop-opacity="0.51"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0.15"></stop></linearGradient><linearGradient id="Gradient-5_s_i" x1="27.214" y1="23.393" x2="27.033" y2="32.029" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafd4e" stop-opacity="0"></stop><stop offset="0.732" stop-color="#fafd4e" stop-opacity="0.46"></stop></linearGradient><linearGradient id="Gradient-6_s_i" x1="24.792" y1="18.563" x2="29.645" y2="23.143" gradientUnits="userSpaceOnUse"><stop offset="0.224" stop-color="#fafd4e" stop-opacity="0.35"></stop><stop offset="1" stop-color="#fafd4e" stop-opacity="0"></stop></linearGradient><linearGradient id="Gradient-7_s_i" x1="0.016" y1="26.376" x2="16.573" y2="26.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><radialGradient id="Gradient-2_s_i" cx="0" cy="0" r="1" fx="0" fy="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(52.671 -10.467 32.845) scale(31.9369)"><stop offset="0.739" stop-color="#9cb6dd" stop-opacity="0"></stop><stop offset="0.898" stop-color="#c6f1ff" stop-opacity="0.37"></stop><stop offset="1" stop-color="#effbff" stop-opacity="0.7"></stop></radialGradient><mask id="Mask-1_s_i"><path fill="url(#Gradient-7_s_i)" transform="rotate(30 31.002 3.397)" d="M0 0h16.959v56H0z" style="animation: 0.7s linear 0s 1 normal both running a4_t_s_i;"></path></mask></defs><style>@keyframes star_t_s_i{0%{transform:translate(28.3918px,26.0576px) scale(0,0) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}42.8571%{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}71.4285%{transform:translate(28.3918px,26.0576px) scale(1.15,1.15) translate(-23.4974px,-22.4547px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(28.3918px,26.0576px) scale(1,1) translate(-23.4974px,-22.4547px)}}@keyframes a1_t_s_i{0%,to{transform:translate(23.4966px,22.4549px)}}@keyframes a0_t_s_i{0%{transform:scale(1.889498,1.889498) translate(-28.3911px,-27.0603px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:scale(1,1) translate(-28.3911px,-27.0603px)}}@keyframes a2_t_s_i{0%{transform:translate(22.2182px,22.7642px) rotate(145.526246deg) scale(.462454,.462454) translate(-27.1127px,-26.3671px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(22.2182px,22.7642px) rotate(0deg) scale(1,1) translate(-27.1127px,-26.3671px)}}@keyframes a2_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a3_t_s_i{0%{transform:translate(18.9293px,24.3971px) rotate(-53.127557deg) scale(.322292,.322292) translate(-26.7458px,-20.6401px);animation-timing-function:cubic-bezier(0,0,.58,1)}to{transform:translate(21.8514px,17.0372px) rotate(0deg) scale(1,1) translate(-26.7458px,-20.6401px)}}@keyframes a3_o_s_i{0%{opacity:0;animation-timing-function:cubic-bezier(0,0,.58,1)}to{opacity:1}}@keyframes a4_t_s_i{0%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px)}28.5714%{transform:translate(-.804393px,13.4424px) rotate(30deg) translate(-8.47967px,-28px);animation-timing-function:cubic-bezier(.42,0,.58,1)}85.7142%,to{transform:translate(58.8824px,41.1538px) rotate(30deg) translate(-8.47967px,-28px)}}</style><g id="star" transform="matrix(0 0 0 0 28.392 26.058)" style="animation: 0.7s linear 0s 1 normal both running star_t_s_i;"><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#C22A20" transform="translate(-4.894 -3.603)"></path><path d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="url(#Gradient-0_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-1_s_i)" transform="translate(-4.894 -3.603)"></path><path d="M26.44 4.799c.813-1.595 3.091-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.169l12.385 1.97c1.768.28 2.472 2.447 1.207 3.714l-8.863 8.873a2.192 2.192 0 0 0-.614 1.89l1.954 12.388c.28 1.769-1.564 3.108-3.16 2.296l-11.177-5.687a2.193 2.193 0 0 0-1.988 0L16.22 48.27c-1.596.812-3.44-.527-3.16-2.296l1.954-12.387a2.192 2.192 0 0 0-.614-1.891l-8.863-8.873c-1.265-1.267-.56-3.434 1.207-3.715l12.386-1.969a2.192 2.192 0 0 0 1.608-1.169l5.7-11.17Z" fill="url(#Gradient-2_s_i)" transform="translate(-4.894 -3.603)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m35.394 16.302-5.7-11.171c-.542-1.063-2.061-1.063-2.604 0l-5.7 11.17a2.923 2.923 0 0 1-2.145 1.559L6.86 19.829c-1.178.187-1.648 1.632-.804 2.476l8.862 8.873c.66.661.965 1.598.82 2.522l-1.955 12.387c-.186 1.179 1.043 2.072 2.106 1.53l11.178-5.686a2.923 2.923 0 0 1 2.65 0l11.178 5.687c1.064.54 2.292-.352 2.106-1.53L41.047 33.7a2.923 2.923 0 0 1 .82-2.522l8.862-8.873c.843-.844.374-2.289-.805-2.476l-12.385-1.97a2.923 2.923 0 0 1-2.145-1.558ZM30.345 4.799c-.814-1.595-3.092-1.595-3.906 0l-5.7 11.17a2.192 2.192 0 0 1-1.608 1.169l-12.386 1.97c-1.768.28-2.472 2.447-1.207 3.714l8.863 8.873c.495.496.723 1.198.614 1.89l-1.954 12.388c-.28 1.769 1.564 3.108 3.16 2.296l11.177-5.687a2.193 2.193 0 0 1 1.988 0l11.178 5.687c1.595.812 3.438-.527 3.16-2.296l-1.955-12.387c-.11-.693.119-1.395.614-1.891l8.863-8.873c1.265-1.267.56-3.434-1.207-3.715l-12.385-1.969a2.192 2.192 0 0 1-1.609-1.169l-5.7-11.17Z" fill="url(#Gradient-3_s_i)" transform="translate(-4.894 -3.603)"></path><g style="animation: 0.7s linear 0s 1 normal both running a1_t_s_i;"><path d="M27.442 15.766a1.096 1.096 0 0 1 1.898 0l3.338 5.77c.156.268.417.458.72.523l6.52 1.392a1.096 1.096 0 0 1 .586 1.805l-4.456 4.958c-.207.23-.307.538-.275.846l.69 6.63a1.096 1.096 0 0 1-1.535 1.116L28.836 36.1a1.095 1.095 0 0 0-.89 0l-6.092 2.706a1.096 1.096 0 0 1-1.535-1.115l.69-6.63a1.096 1.096 0 0 0-.275-.847l-4.456-4.958a1.096 1.096 0 0 1 .587-1.805l6.519-1.392c.303-.065.565-.255.72-.523l3.338-5.77Z" fill="url(#Gradient-4_s_i)" transform="translate(-30.148 -28.676) scale(1.8895)" style="animation: 0.7s linear 0s 1 normal both running a0_t_s_i;"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M26.893 7.286c.27.137.378.467.241.737l-1.55 3.063a.548.548 0 1 1-.977-.495l1.55-3.063a.548.548 0 0 1 .736-.242Z" fill="#F9BE76" transform="translate(-4.895 -3.603)"></path><circle fill="#F9BE76" transform="translate(3.035 16.918)" r="0.548"></circle><circle fill="#F9BE76" transform="translate(19.477 8.514)" r="0.548"></circle><path id="mask-flex_s_i" d="M26.439 4.8c.813-1.595 3.092-1.595 3.905 0l5.7 11.17a2.192 2.192 0 0 0 1.609 1.168l12.385 1.97c1.768.28 2.472 2.448 1.207 3.714l-8.862 8.873a2.193 2.193 0 0 0-.615 1.891l1.955 12.388c.279 1.768-1.565 3.107-3.16 2.295l-11.177-5.686a2.192 2.192 0 0 0-1.989 0L16.22 48.269c-1.595.812-3.439-.527-3.16-2.295l1.955-12.388a2.192 2.192 0 0 0-.615-1.89l-8.862-8.874c-1.265-1.266-.561-3.433 1.207-3.714l12.385-1.97a2.192 2.192 0 0 0 1.609-1.168l5.7-11.17Z" fill="#fff3bf" mask="url(#Mask-1_s_i)" transform="translate(-4.894 -3.603)"></path></g></svg>`
              );
            }
          });

          $("#amountInput").addClass("hidden");
          $("#amountDisplay").addClass("hidden");
          $("#winMessage").removeClass("hidden");

          const winAmount =
            SETTINGS.amount *
            MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened - 1];
          const winCoefficient =
            MINES_COEFFICIENTS[minesIdx][SETTINGS.cellOpened - 1];

          $("#winJackpotAmount").text(
            `${winAmount.toFixed(2)} ${getCurrencySymbol()}`
          );

          $(".Toastify__toast-container").html(
            `<div class="Toastify--animate Toastify__bounce-enter--top-center Toastify__toast Toastify__toast--close-on-click Toastify__toast--default Toastify__toast-theme--dark app-popup__toast win"><div class="Toastify__toast-body app-popup__toast-body"role=alert><div><div class=app-popup__toast-body__win><div class=left-side><div class=left-side__label>${
              TRANSLATIONS[SETTINGS.language]["your_win"]
            }</div><p class=left-side__lightgreen><span id=winValuePopup>${winAmount.toLocaleString(
              "ru-RU"
            )}</span> <span id=winCurrencyPopup class=left-side__small-gray>${getCurrencySymbol()}</span></div><div class=right-side id=winCoefPopup>x${winCoefficient}</div></div></div></div></div>`
          );

          SETTINGS.balance += winAmount;
          SETTINGS.cellOpened = 0;
          updateSettings();

          setTimeout(() => {
            // refresh
            $("#amountInput").removeClass("hidden");
            $("#amountDisplay").addClass("hidden");
            $("#winMessage").addClass("hidden");
            $("#menuStatusBar").show();
            $("#gameStatusBar").hide();
            $("#takePrizeButton").addClass("hidden");
            $("#play_btn")
              .removeClass("hidden")
              .removeAttr("disabled")
              .find("span")
              .text(TRANSLATIONS[SETTINGS.language].play);
            $(".bet-panel__control").removeAttr("disabled");
            drawCells();
          }, 3000);
          $("#maxwinmodal").addClass("active");
          setTimeout(() => {
            $(".Toastify__toast")
              .removeClass("Toastify__bounce-enter--top-center")
              .addClass("Toastify__bounce-exit--top-center");

            setTimeout(() => {
              $(".Toastify__toast-container").html("");
            }, 700);
          }, 5000);
        }, 700);
      }
    });
  }

  $("#takeWinJackpotButton").on("click", function (e) {
    $("#maxwinmodal").removeClass("active");
  });

  function generateUniqueRandomNumbers(count, max) {
    if (count > max + 1)
      throw new Error(
        "Невозможно сгенерировать больше уникальных чисел, чем доступно в диапазоне."
      );

    const numbers = new Set();

    while (numbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max + 1));
      numbers.add(randomNum);
    }

    return Array.from(numbers);
  }

  function addBalance() {
    const balance = Number(prompt("Новый баланс:"));
    if (balance) {
      SETTINGS.balance = balance;
      updateSettings();
    }
  }

  window.onload = () => {
    loadSizes();
    drawCells();
    updateSettings();

    setTimeout(() => {
      $("body").css("overflow", "");
      $("#loader").fadeOut(200);
    }, 330);
  };
  window.onresize = () => {
    loadSizes();
  };

  const socket = io("wss://prod-rnd-websocket-php-orchestra.100hp.app/mines", {
    transports: ["websocket"],
    query: {
      Authorization: "3ff6be4f-7f91-53b1-a12b-2d97166375c6",
      Language: "en",
      xorigin: "1waaa.top",
    },
  });
  socket.on("connect", () => {
    console.log("✅ Успешное подключение к /mines");
    socket.emit("authentication", { token: "demo" });
  });
  socket.on("authenticated", () => {
    console.log("🔑 Успешная авторизация!");
  });
  socket.on("unauthorized", (error) => {
    console.error("❌ Ошибка авторизации:", error);
    socket.disconnect();
  });
  socket.on("message", (data) => {
    console.log("📩 Получено сообщение:", data);
  });

  socket.on("mines_live_bet_event", (data) => {
    console.log("🎰 Пришло событие ставки!", data);
    addBetToHistory(data);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Ошибка подключения:", error);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Соединение закрыто:", reason);
  });

  const calculateCoefficient = (bet, resultBalance) => {
    return (resultBalance / bet).toFixed(2);
  };

  function addBetToHistory(data) {
    const truncatedUserName =
      data.user.length > 15 ? data.user.slice(0, 15) + "..." : data.user;
    const listWrapper = $(".history-panel__list-wrapper");

    // Сначала смещаем все существующие элементы на 1 позицию (и обновляем их классы even/odd)
    listWrapper.children().each((index, elem) => {
      $(elem).removeClass("even odd");
      $(elem).addClass(index % 2 === 0 ? "odd" : "even");
    });

    const newElement = $(`
      <div class="history-element-container">
        <div class="collapsable-header history-live">
          <div class="user">
            <img width="28" height="28" alt="user icon" src="data:image/png;base64,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" />
            <div class="ml-[8px]">${truncatedUserName}</div>
          </div>
          <div class="start-sum">${data.bet} <span>${data.currency}</span></div>
          <div class="coef">x${calculateCoefficient(
            data.bet,
            data.resultBalance
          )}</div>
          <div class="game-amount">
            <div class="win-amount">${data.resultBalance} ${data.currency}</div>
          </div>
        </div>
      </div>
    `);

    newElement.addClass(
      listWrapper.children().length % 2 === 0 ? "even" : "odd"
    );

    // Добавляем в начало
    listWrapper.prepend(newElement);

    // Ограничиваем список 20 элементами
    while (listWrapper.children().length > 20) {
      listWrapper.children().last().remove();
    }
  }
});
