const { randomUUID } = require("node:crypto");
const { Session } = require("@/models");

const FLASH_KEY = "adminFlash";

function parseSessionData(raw) {
  if (!raw) return {};
  try {
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

/** Luôn đảm bảo flash là mảng (tránh xung đột express-flash / data cũ trong DB). */
function ensureFlashArray(sessionData) {
  const messages = sessionData[FLASH_KEY];
  if (!Array.isArray(messages)) {
    sessionData[FLASH_KEY] = [];
  }
  // Dọn key cũ nếu từng lưu nhầm dạng object
  if (sessionData.flash !== undefined && !Array.isArray(sessionData.flash)) {
    delete sessionData.flash;
  }
}

async function session(req, res, next) {
  let _sid = req.cookies.sid;
  let session =
    _sid && (await Session.findOne({ where: { sid: req.cookies.sid } }));
  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    date.setDate(date.getDate() + 7);

    session = await Session.create({
      sid: _sid,
      expires_at: date,
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.set(
      "Set-Cookie",
      `sid=${_sid}; path=/; httpOnly;${
        isProduction ? " Secure" : ""
      }; expires=${date.toUTCString()} `,
    );
  }

  req.session = parseSessionData(session.data);
  ensureFlashArray(req.session);

  res.flash = (data) => {
    ensureFlashArray(req.session);
    req.session[FLASH_KEY].push(data);
  };

  res.on("finish", async () => {
    await Session.update(
      { data: JSON.stringify(req.session) },
      { where: { sid: _sid } },
    );
  });
  next();
}

module.exports = session;
