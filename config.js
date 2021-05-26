// ======================
// Puertos
// ======================

PORT = process.env.PORT || 3000

// ======================
// Entorno
// ======================

NODE_ENV = process.env.NODE_ENV

// ======================
// CORS 
// ======================
CORS = process.env.CORS

// ======================
// Base de datos
// ======================
 MONGO_CONEXION = NODE_ENV =='dev'? process.env.MONGO_CONEXION_DEV : process.env.MONGO_CONEXION_PROD
