import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

// Configurar MercadoPago con tu access token
mercadopago.configurations.setAccessToken("YOUR_ACCESS_TOKEN"); // Reemplaza con tu token real

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { items } = req.body; // Recibe los productos desde el cliente

    const preference = {
      items,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    // Crear preferencia en MercadoPago
    const response = await mercadopago.preferences.create(preference);

    res.json({ preferenceId: response.body.id }); // Enviar el ID de la preferencia al cliente
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).send("Error al crear la preferencia");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
