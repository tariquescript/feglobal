document.getElementById("programForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("formStatus");
  status.textContent = "Submitting...";

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    reason: document.getElementById("reason").value,
    currentStatus: document.getElementById("currentStatus").value,
    examTime: document.getElementById("examTime").value,
    date: document.getElementById("date").value,
    timeSlot: document.getElementById("timeSlot").value,
  };

  try {
    const res = await fetch("/api/programform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const body = await res.json();

    if (res.ok) {
      status.textContent = "Form submitted successfully!";
      e.target.reset();
    } else {
      status.textContent = body.error || "Something went wrong.";
    }

  } catch (err) {
    status.textContent = "Network error.";
  }
});
