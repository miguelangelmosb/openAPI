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
      return res.status(400).json({ message: 'Se debe enviar una lista con ingredientes' });
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
      message: 'Se han agregado los ingredientes correctamente',
      data: sancocho.ingredientes
    });
  });

  app.patch('/sancocho', (req, res) => {
    const { ingredienteActual, ingredienteNuevo } = req.body;
    if (!ingredienteActual || !ingredienteNuevo) {
      return res.status(400).json({
        message: 'Se debe indicar el ingrediente actual y el nuevo'
      });
    }
    const index = sancocho.ingredientes.indexOf(ingredienteActual);
    if (index === -1) {
      return res.status(404).json({
        message: `El ingrediente ${ingredienteActual} no se encuentra en el sancocho`
      });
    }
    sancocho.ingredientes[index] = ingredienteNuevo;
    res.status(200).json({
      message: 'El ingrediente se reemplazó correctamente',
      data: sancocho.ingredientes
    });
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
