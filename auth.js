const accountStorageKey = "bpoQuestDemoAccounts";
const sessionStorageKey = "bpoQuestDemoSession";
const musicTimeStorageKey = "bpoQuestBackgroundMusicTime";
const musicEnabledStorageKey = "bpoQuestBackgroundMusicEnabled";
const isLoginPage = window.location.pathname.toLowerCase().endsWith("/login.html");

function getCurrentSession() {
  const session = sessionStorage.getItem(sessionStorageKey);
  if (!session) return null;

  try {
    const user = JSON.parse(session);
    if (user && typeof user.username === "string") return user;
  } catch (error) {
    console.error("Could not read the BPO QUEST demo session.", error);
  }

  sessionStorage.removeItem(sessionStorageKey);
  return null;
}

if (isLoginPage && getCurrentSession()) {
  window.location.replace("BPOQUESTCustomerServiceSimulator.html");
} else if (!isLoginPage && !getCurrentSession()) {
  window.location.replace("login.html");
}

function readAccounts() {
  const savedAccounts = localStorage.getItem(accountStorageKey);
  if (!savedAccounts) return [];

  const accounts = JSON.parse(savedAccounts);
  if (!Array.isArray(accounts)) {
    throw new Error("Saved account data is invalid. Clear this site's browser storage and try again.");
  }
  return accounts;
}

function bytesToHex(bytes) {
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) {
    throw new Error("Secure password hashing is unavailable. Open this site using localhost or HTTPS.");
  }

  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const hash = await window.crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" },
    key,
    256
  );
  return bytesToHex(hash);
}

function showAuthMessage(message, isError = true) {
  const messageElement = document.getElementById("authMessage");
  messageElement.textContent = message;
  messageElement.classList.toggle("is-error", isError);
  messageElement.classList.toggle("is-success", !isError);
}

function switchAuthView(view) {
  document.getElementById("loginPage").hidden = view !== "login";
  document.getElementById("signupPage").hidden = view !== "signup";
  showAuthMessage("");
}

document.addEventListener("DOMContentLoaded", () => {
  const backgroundMusic = document.getElementById("background-music");
  if (backgroundMusic) {
    backgroundMusic.volume = 0.25;
    let musicTimeRestored = false;
    let musicEnabled = localStorage.getItem(musicEnabledStorageKey) !== "false";
    const header = document.querySelector(".site-header");
    const musicToggle = document.createElement("button");

    musicToggle.type = "button";
    musicToggle.classList.add("music-toggle");

    const updateMusicToggle = () => {
      musicToggle.textContent = musicEnabled ? "Music: On" : "Music: Off";
      musicToggle.setAttribute("aria-label", musicEnabled ? "Turn background music off" : "Turn background music on");
      musicToggle.setAttribute("aria-pressed", String(musicEnabled));
    };

    const saveMusicTime = () => {
      if (!musicTimeRestored) return;
      localStorage.setItem(musicTimeStorageKey, String(backgroundMusic.currentTime));
    };

    const startMusicAfterInteraction = () => {
      document.removeEventListener("pointerdown", startMusicAfterInteraction);
      document.removeEventListener("keydown", startMusicAfterInteraction);
      if (!musicEnabled) return;
      backgroundMusic.play().catch(error => {
        console.error("Could not play background music:", error);
      });
    };

    const requestMusicPlayback = () => {
      if (!musicEnabled || !musicTimeRestored) return;
      backgroundMusic.play().catch(() => {
        if (!musicEnabled) return;
        document.addEventListener("pointerdown", startMusicAfterInteraction, { once: true });
        document.addEventListener("keydown", startMusicAfterInteraction, { once: true });
      });
    };

    const restoreMusicTime = () => {
      const savedTime = Number(localStorage.getItem(musicTimeStorageKey));
      if (Number.isFinite(savedTime) && savedTime >= 0) {
        backgroundMusic.currentTime = savedTime;
      }
      musicTimeRestored = true;
      requestMusicPlayback();
    };

    updateMusicToggle();
    musicToggle.addEventListener("click", () => {
      musicEnabled = !musicEnabled;
      localStorage.setItem(musicEnabledStorageKey, String(musicEnabled));
      updateMusicToggle();
      if (musicEnabled) {
        requestMusicPlayback();
      } else {
        document.removeEventListener("pointerdown", startMusicAfterInteraction);
        document.removeEventListener("keydown", startMusicAfterInteraction);
        backgroundMusic.pause();
      }
    });

    if (header) {
      const navigation = header.querySelector(".site-nav");
      (navigation || header).appendChild(musicToggle);
    }

    if (backgroundMusic.readyState >= 1) {
      restoreMusicTime();
    } else {
      backgroundMusic.addEventListener("loadedmetadata", restoreMusicTime, { once: true });
    }

    backgroundMusic.addEventListener("timeupdate", () => {
      if (Math.floor(backgroundMusic.currentTime) !== Math.floor(Number(localStorage.getItem(musicTimeStorageKey)))) {
        saveMusicTime();
      }
    });
    window.addEventListener("pagehide", saveMusicTime);
  }

  if (!isLoginPage) return;

  document.getElementById("showSignup").addEventListener("click", event => {
    event.preventDefault();
    switchAuthView("signup");
  });
  document.getElementById("showLogin").addEventListener("click", event => {
    event.preventDefault();
    switchAuthView("login");
  });

  document.getElementById("signupForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    if (!fullName) {
      showAuthMessage("Please enter your full name.");
      return;
    }
    if (username.length < 3) {
      showAuthMessage("Your username must be at least 3 characters long.");
      return;
    }
    if (password.length < 8) {
      showAuthMessage("Your password must be at least 8 characters long.");
      return;
    }

    try {
      const accounts = readAccounts();
      if (accounts.some(account => account.username.toLowerCase() === username.toLowerCase())) {
        showAuthMessage("That username is already taken. Please choose another.");
        return;
      }

      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const passwordHash = await hashPassword(password, salt);
      accounts.push({ fullName, username, salt: bytesToHex(salt), passwordHash });
      localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
      sessionStorage.setItem(sessionStorageKey, JSON.stringify({ fullName, username }));
      window.location.replace("BPOQUESTCustomerServiceSimulator.html");
    } catch (error) {
      showAuthMessage(error instanceof Error ? error.message : "Unable to create your account.");
    }
  });

  document.getElementById("loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    try {
      const account = readAccounts().find(
        savedAccount => savedAccount.username.toLowerCase() === username.toLowerCase()
      );
      if (!account) {
        showAuthMessage("We couldn't find an account with that username.");
        return;
      }

      const salt = Uint8Array.from(account.salt.match(/.{2}/g), byte => parseInt(byte, 16));
      const passwordHash = await hashPassword(password, salt);
      if (passwordHash !== account.passwordHash) {
        showAuthMessage("That password doesn't match. Please try again.");
        return;
      }

      sessionStorage.setItem(
        sessionStorageKey,
        JSON.stringify({ fullName: account.fullName, username: account.username })
      );
      window.location.replace("BPOQUESTCustomerServiceSimulator.html");
    } catch (error) {
      showAuthMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  });
});
