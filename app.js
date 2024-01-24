const express = require('express');
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static('public'))

app.get('/v1/shorten_url', async (req, res) => {
    try {
      const longUrl = 'https://agrix-chat.web.app/AgriculturalLoanForm?instance=InstanceTest&project_id=o3zO5Efyd4h8AsMLjkCM&project_activity=Agricole&farmer_name=Kheilifa&loanForm_id=Bmc2uhIDu1p1HcDszv0o'; // Remplacez par votre URL longue
      // const customName = 'YOUR-CUSTOM-NAME'; // Remplacez par un nom personnalisé si nécessaire
      const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(longUrl)}&private=1`;
  
      https.get(apiUrl, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res.json({ shortUrl: data });
        });
      }).on('error', (error) => {
        console.error("Error occurred while shortening the URL:", error);
        res.status(500).json({ error: "An error occurred while shortening the URL" });
      });
    } catch (error) {
      console.error("Error occurred while shortening the URL:", error);
      res.status(500).json({ error: "An error occurred while shortening the URL" });
    }
  });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})