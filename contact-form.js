document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactFormStatus");
  if (!form || !status) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = document.getElementById("contactName").value.trim();
    status.textContent = `Thanks, ${name}! We appreciate your message. Please use our Facebook page to contact us.`;
    form.reset();
  });
});
