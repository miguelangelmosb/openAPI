const express = require('express');
const app = express();
app.use(express.json());

let sancocho = {
    id: 1,
    ingredientes: ['carne' , 'pollo' , 'yuca', 'papa', 'ají', 'cilantro', 'ahuyama', 'mazorca']
};

app.get('/sancocho', (req, res) => {
    res.status(200).json({
      message: 'Ingredientes disponibles:',
      data: sancocho.ingredientes
    });
  });

  app.post('/sancocho', (req, res) => {
    const { ingredientes } = req.body;
    if (!ingredientes || !Array.isArray(ingredientes)) {
      return res.status(400).json({ message: 'Debe enviar una lista de ingredientes' });
    }
    sancocho = { id: Date.now(), ingredientes };
    res.status(201).json({
      message: 'Se ha ordenado correctamente el sancocho',
      data: sancocho
    });
  });

  app.put('/sancocho', (req, res) => {
    const { ingredientes } = req.body;
    if (!ingredientes || !Array.isArray(ingredientes)) {
      return res.status(400).json({ message: 'Se debe enviar una lista con ingredientes' });
    }
    sancocho.ingredientes.push(...ingredientes);
    res.status(200).json({
      message: 'Se han agregado los ingredienes correctamente',
      data: sancocho.ingredientes
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
