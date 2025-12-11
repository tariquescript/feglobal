document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("programForm");
  const statusEl = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Submitting...";

    const payload = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      reason: document.getElementById("reason").value,
      currentStatus: document.getElementById("currentStatus").value,
      examTime: document.getElementById("examTime").value,
      date: document.getElementById("date").value,
      timeSlot: document.getElementById("timeSlot").value,
      message: "" // to match your Google Sheet header
    };

    try {
      const res = await fetch("/api/program-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const body = await res.json();

      if (res.ok) {
        statusEl.textContent = "Successfully submitted!";
        form.reset();
      } else {
        statusEl.textContent = body.error || "Submission failed!";
      }
    } catch (err) {
      statusEl.textContent = "Network error. Try again.";
    }
  });
});
