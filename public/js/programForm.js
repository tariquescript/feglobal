const API_URL = "https://feglobal-api.tariquescript.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("programForm");
  const statusEl = document.getElementById("programStatus");
  if (!form || !statusEl) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    statusEl.textContent = "Submitting...";

    const payload = {};
    for (const el of form.elements) {
      if (el.name) payload[el.name] = el.value.trim();
    }
    if (!payload.message) payload.message = "";

    try {
      const res = await fetch(`${API_URL}/api/program-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      statusEl.textContent = res.ok && body.success ? "Successfully submitted!" : (body.error || "Submission failed!");
      if (res.ok && body.success) form.reset();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Try again.";
    }
  });
});
