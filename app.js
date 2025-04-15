const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./openapi.yaml');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let ingredientes = ['carne', 'pollo', 'yuca', 'papa'];
let sancochosPedidos = []; 

app.get('/sancocho', (req, res) => {
  res.json({
    message: 'Ingredientes disponibles:',
    data: ingredientes,
  });
});

app.get('/pedidos', (req, res) => {
  res.json({
    message: 'Lista de sancochos pedidos:',
    data: sancochosPedidos,
  });
});

app.post('/sancocho', (req, res) => {
  const { ingredientes: nuevosIngredientes } = req.body;
  if (!nuevosIngredientes || !Array.isArray(nuevosIngredientes)) {
    return res.status(400).json({ message: 'Faltan ingredientes válidos.' });
  }

  const nuevoSancocho = {
    id: Date.now(),
    ingredientes: nuevosIngredientes,
  };

  ingredientes = [...ingredientes, ...nuevosIngredientes];
  sancochosPedidos.push(nuevoSancocho); 

  res.status(201).json({
    message: 'Se ha ordenado correctamente el sancocho',
    data: nuevoSancocho,
  });
});

app.put('/sancocho', (req, res) => {
  const { ingredientes: nuevosIngredientes } = req.body;
  if (!nuevosIngredientes || !Array.isArray(nuevosIngredientes)) {
    return res.status(400).json({ message: 'Faltan ingredientes válidos.' });
  }

  ingredientes.push(...nuevosIngredientes);
  res.json({
    message: 'Se han agregado los ingredientes correctamente',
    data: ingredientes,
  });
});

app.patch('/sancocho', (req, res) => {
  const { ingredienteActual, ingredienteNuevo } = req.body;
  if (!ingredienteActual || !ingredienteNuevo) {
    return res.status(400).json({ message: 'Faltan datos para actualizar un ingrediente.' });
  }

  const index = ingredientes.indexOf(ingredienteActual);
  if (index === -1) {
    return res.status(404).json({ message: 'El ingrediente no se encontró en el sancocho.' });
  }

  ingredientes[index] = ingredienteNuevo;
  res.json({
    message: 'El ingrediente se reemplazó correctamente',
    data: ingredientes,
  });
});

app.delete('/sancocho', (req, res) => {
  ingredientes = [];
  res.json({
    message: 'El sancocho se consumió correctamente',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API en http://localhost:${port}/api-docs`);
});