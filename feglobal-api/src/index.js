export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(await request.json(), env);
    }

    if (url.pathname === "/api/program-form" && request.method === "POST") {
      return saveToSheet(await request.json(), env.GOOGLE_SHEET_URL);
    }

    if (url.pathname === "/api/study-form" && request.method === "POST") {
      return saveToSheet(await request.json(), env.GOOGLE_SHEET_STUDY_URL);
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function handleContact(data, env) {
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
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
