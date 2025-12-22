export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const body = await request.json();

    // ROUTES
    if (url.pathname === "/api/contact") {
      return handleContact(body, env);
    }

    if (url.pathname === "/api/program-form") {
      return saveToSheet(body, env.GOOGLE_SHEET_URL);
    }

    if (url.pathname === "/api/study-form") {
      return saveToSheet(body, env.GOOGLE_SHEET_STUDY_URL);
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function handleContact(data, env) {
  const { name, email, phone, message } = data;

  if (!name || !email || !phone || !message) {
    return json({ error: "All fields required" }, 400);
  }

  // SEND EMAIL (MailChannels)
  const emailPayload = {
    personalizations: [
      { to: [{ email: env.TO_EMAIL }] }
    ],
    from: {
      email: "noreply@" + env.DOMAIN,
      name: "FE Global Education"
    },
    subject: "New Contact Form Submission",
    content: [
      {
        type: "text/html",
        value: `
          <h2>New Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        `
      }
    ]
  };

  await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload)
  });

  // SAVE TO GOOGLE SHEET
  await saveToSheet(data, env.GOOGLE_SHEET_URL);

  return json({ success: true });
}

async function saveToSheet(data, sheetURL) {
  await fetch(sheetURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return json({ success: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
