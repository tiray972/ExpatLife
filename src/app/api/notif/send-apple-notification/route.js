import http2 from "http2";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Chemin vers votre clé privée Apple (.p8)
const keyPath = path.resolve("./path/to/AuthKey_KEYID.p8");
const keyId = "KEYID";
const teamId = "TEAMID";
const topic = "web.com.expatlife-uae.app";

// Fonction pour générer un JWT pour Apple APNs
function createJwt() {
  const privateKey = fs.readFileSync(keyPath, "utf8");

  return jwt.sign(
    { iss: teamId, iat: Math.floor(Date.now() / 1000) },
    privateKey,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: keyId,
      },
    }
  );
}

// Route API pour envoyer des notifications Apple
export async function POST(req) {
  try {
    const body = await req.json();
    const { deviceToken, notification } = body;

    if (!deviceToken || !notification) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Initialisation du client HTTP/2
    const client = http2.connect("https://api.push.apple.com");
    const jwtToken = createJwt();

    const request = client.request({
      ":method": "POST",
      ":path": `/3/device/${deviceToken}`,
      authorization: `bearer ${jwtToken}`,
      "apns-topic": topic,
    });

    request.setEncoding("utf8");
    request.write(JSON.stringify({ aps: notification }));
    request.end();

    let responseBody = "";
    request.on("data", (chunk) => {
      responseBody += chunk;
    });

    return new Promise((resolve) => {
      request.on("end", () => {
        client.close();
        resolve(
          new Response(
            JSON.stringify({ success: true, response: responseBody }),
            { status: 200 }
          )
        );
      });
    });
  } catch (error) {
    console.error("Error sending Apple notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
