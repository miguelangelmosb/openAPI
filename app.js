const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let ingredientes = ['carne', 'pollo', 'yuca', 'papa'];

app.get('/sancocho', (req, res) => {
    res.json({
      message: 'Ingredientes disponibles:',
      data: ingredientes,
    });
  });

  app.post('/sancocho', (req, res) => {
    const { ingredientes: nuevosIngredientes } = req.body;
    if (!nuevosIngredientes || !Array.isArray(nuevosIngredientes)) {
      return res.status(400).json({ message: 'Faltan ingredientes válidos.' });
    }
  
    ingredientes = [...ingredientes, ...nuevosIngredientes];
    res.status(201).json({
      message: 'Se ha ordenado correctamente el sancocho',
      data: {
        id: Date.now(),
        ingredientes,
      },
    });
  });