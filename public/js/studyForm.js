document.getElementById("studyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("formStatus");
  status.textContent = "Submitting...";

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    currentStatus: document.getElementById("currentStatus").value.trim(),
    country: document.getElementById("country").value.trim(),
    relocateTime: document.getElementById("relocateTime").value.trim()
  };

  try {
    const res = await fetch("/api/study-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const body = await res.json();

    if (res.ok) {
      status.textContent = "Your request is submitted! We will contact you soon.";
      e.target.reset();
    } else {
      status.textContent = body.error || "Something went wrong!";
    }
  } catch (err) {
    status.textContent = "Network error, please try again later.";
  }
});
