// IP-Adresse holen
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    const webhookUrl = "https://discord.com/api/webhooks/1394552647838732391/Dpd6h05vo3PRDzVOPz0p6_Si7jS-mNfcFVQUhYPZVt03qIMk3zhWqejH2EnaBGqo-1TQ";
    
    const payload = {
      content: `📨 Neue Bewerbung: ${ip}`
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
