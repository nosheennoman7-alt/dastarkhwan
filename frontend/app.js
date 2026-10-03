// Dastarkhwan Assistant chat widget (front end only, no AI connected yet)

const FIXED_REPLY = "Hi! I'm Dastarkhwan Assistant. My AI brain isn't connected yet.";
const REPLY_DELAY_MS = 600;

const toggleButton = document.getElementById("chat-toggle");
const closeButton = document.getElementById("chat-close");
const chatWindow = document.getElementById("chat-window");
const messageList = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

function openChat() {
  chatWindow.hidden = false;
  // Wait one frame so the slide-up transition runs after the window is shown
  requestAnimationFrame(() => chatWindow.classList.add("is-open"));
  toggleButton.classList.add("is-open");
  toggleButton.setAttribute("aria-expanded", "true");
  toggleButton.setAttribute("aria-label", "Close chat");
  chatInput.focus();
}

function closeChat() {
  chatWindow.classList.remove("is-open");
  toggleButton.classList.remove("is-open");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-label", "Open chat with Dastarkhwan Assistant");
  chatWindow.addEventListener("transitionend", () => {
    if (!chatWindow.classList.contains("is-open")) chatWindow.hidden = true;
  }, { once: true });
  toggleButton.focus();
}

function isChatOpen() {
  return chatWindow.classList.contains("is-open");
}

// textContent (not innerHTML) so customer text is never treated as HTML
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message chat-message-${sender}`;
  bubble.textContent = text;
  messageList.appendChild(bubble);
  messageList.scrollTop = messageList.scrollHeight;
}

function handleSend(event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";
  chatInput.focus();

  setTimeout(() => addMessage(FIXED_REPLY, "bot"), REPLY_DELAY_MS);
}

toggleButton.addEventListener("click", () => (isChatOpen() ? closeChat() : openChat()));
closeButton.addEventListener("click", closeChat);
chatForm.addEventListener("submit", handleSend);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isChatOpen()) closeChat();
});
