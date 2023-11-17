const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "turtledexter",
  database: "velas",
  connectionLimit: 5,
});

const getCandles = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, nombre, precio, peso, lado, ancho, alto, diametro FROM velas"
    );

    return rows;
  } catch (error) {
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const getCandleById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, nombre, precio, peso, lado, ancho, alto, diametro FROM velas WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const createCandle = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO velas(nombre, precio, peso, lado, ancho, alto, diametro) VALUE(?, ?, ?, ?, ?, ?, ?)`,
      [user.nombre, user.precio, user.peso, user.lado, user.ancho, user.alto, user.diametro]
    );

    return { id: parseInt(response.insertId), ...user };
  } catch (error) {
    console.log(error); 
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const updateCandle = async (id, user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE velas SET nombre=?, precio=?, peso=?, lado=?, ancho=?, alto=?, diametro=? WHERE id=?`,
      [user.nombre, user.precio, user.peso, user.lado, user.ancho, user.alto, user.diametro, id]
    );

    return { id, ...user };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const deleteCandle = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM velas WHERE id=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;
};

module.exports = {
  getCandles,
  getCandleById,
  createCandle,
  updateCandle,
  deleteCandle,
};
