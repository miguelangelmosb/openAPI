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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
