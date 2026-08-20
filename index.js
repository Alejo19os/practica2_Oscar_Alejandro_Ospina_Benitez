const express = require('express');
const { resolve } = require('path');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.static('static'));

// BASE DE DATOS SIMULADA
const productos = [
  { id: 1, nombre: 'Teclado', precio: 150000, cantidad: 10 },
  { id: 2, nombre: 'Mouse', precio: 90000, cantidad: 20 },
  { id: 3, nombre: 'Monitor', precio: 800000, cantidad: 5 },
  { id: 4, nombre: 'Parlantes', precio: 250000, cantidad: 15 },
  { id: 5, nombre: 'Auriculares', precio: 120000, cantidad: 25 },
];

app.get('/', (req, res) => {
  const rutaHtml = resolve(__dirname, 'pages', 'productos', 'index.html');
  console.log('Buscando el HTML en:', rutaHtml);
  res.sendFile(rutaHtml);
});

// Endpoint 1: Verificación de estado del servidor
app.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mensaje: 'Servidor Backend UCompensar ejecutándose correctamente',
    timestamp: new Date(),
  });
});

// Endpoint 2: Obtener todos los productos
app.get('/api/v1/pages/productos', (req, res) => {
  res.status(200).json({
    success: true,
    total: productos.length,
    data: productos,
  });
});

// Enpoint 3:oibterner los productos por id
app.get('/api/v1/pages/productos/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find((p) => p.id === parseInt(id));

  if (producto) {
    res.status(200).json({
      success: true,
      data: producto,
    });
  } else {
    res.status(404).json({
      status: 'error',
      mensaje: 'Producto no encontrado',
      timestamp: new Date(),
    });
  }
})

// Endpoint para error de url no encontrada
app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
      return res.sendFile(resolve(__dirname, 'pages','exepciones', '404.html'));
    }
    res.json({
      status: 'error',
      mensaje: 'URL no encontrada',
      timestamp: new Date(),
    });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor backend escuchando en el puerto http://localhost:${PORT}`
  );
});
