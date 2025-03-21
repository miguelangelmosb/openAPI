const express = require('express');
const app = express();
app.use(express.json());

let sancocho = {
    id: 1,
    ingredientes: ['carne' , 'pollo' , 'yuca', 'papa', 'ají', 'cilantro', 'ahuyama', 'mazorca']
};

