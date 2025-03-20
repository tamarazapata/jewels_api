import pool from "../../db/conection.db.js";


const getJewels = async () => {
  const SQLquery = { text: "SELECT * FROM inventario" };
    const response = await pool.query(SQLquery);
    return response.rows;
};

const addJewel = async ({ nombre, categoria, metal, precio, stock }) => {
    const SQLquery = {
        text: "INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        values: [nombre, categoria, metal, precio, stock],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

const setJewel = async (nombre, categoria, metal, precio, stock, jewelId, oldData) => {
    const newName = nombre || oldData.nombre
    const newCategory = categoria || oldData.categoria
    const newMetal = metal || oldData.metal
    const newPrice = precio || oldData.precio
    const newStock = stock || oldData.stock
    
    const SQLquery = {
        text: "UPDATE inventario SET nombre = $1, categoria = $2, metal = $3, precio = $4, stock = $5  WHERE id = $6 RETURNING *",
        values: [newName, newCategory, newMetal, newPrice, newStock, jewelId],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
}

const jewelById = async (id) => {
    const SQLquery = {
        text: "SELECT * FROM inventario WHERE id = $1",
        values: [Number(id)]
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
}

const destroyJewel = async (id) => {
    const SQLquery = {
        text: "DELETE FROM inventario WHERE id = $1",
        values: [Number(id)]
    };
    const response = await pool.query(SQLquery);
    return response.rowCount;
}

export {getJewels, addJewel, setJewel, jewelById, destroyJewel}
