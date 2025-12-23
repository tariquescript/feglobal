const API_URL = "https://feglobal-api-production.tariquescript.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studyForm");
  const statusEl = document.getElementById("studyStatus");
  if (!form || !statusEl) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    statusEl.textContent = "Submitting...";

    const payload = {};
    for (const el of form.elements) {
      if (el.name) payload[el.name] = el.value.trim();
    }

    try {
      const res = await fetch(`${API_URL}/api/study-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      statusEl.textContent = res.ok && body.success ? "Your request is submitted! We will contact you soon." : (body.error || "Something went wrong!");
      if (res.ok && body.success) form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again later.";
    }
  });
});
