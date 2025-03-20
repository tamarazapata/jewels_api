import pool from "../../db/conection.db.js";  
import format from "pg-format";
import prepareHateoas from "../../src/utils/hateoas.js";


export const getAllJewels = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
        const [campo, direccion] = order_by.split("_");
        const offset = (page - 1) * limits;
        const validFields = ["id", "nombre", "categoria", "metal", "precio", "stock"];
        if (!validFields.includes(campo) || !["ASC", "DESC"].includes(direccion.toUpperCase())) {
            return res.status(400).json({ error: "Parámetro order_by inválido" });
        }
        

        const formattedQuery = format(
            "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
            campo,
            direccion,
            limits,
            offset
        );

        const { rows: joyas } = await pool.query(formattedQuery);
        res.json(await prepareHateoas("joyas", joyas));
    } catch (error) {
        console.error("Error en getAllJewels:", error);
        res.status(500).json({ error: "Error en la consulta" });
    }
};

// Obtener joyas filtradas 
export const getFilteredJewels = async (req, res) => {
    try {
        console.log("Parámetros recibidos:", req.query);
        const { precio_min, precio_max, categoria, metal } = req.query;
        let filtros = [];
        let values = [];

        if (precio_min) {
            filtros.push(`precio >= $${values.length + 1}`);
            values.push(precio_min);
        }
        if (precio_max) {
            filtros.push(`precio <= $${values.length + 1}`);
            values.push(precio_max);
        }
        if (categoria) {
            filtros.push(`categoria = $${values.length + 1}`);
            values.push(categoria);
        }
        if (metal) {
            filtros.push(`metal = $${values.length + 1}`);
            values.push(metal);
        }

        let query = "SELECT * FROM inventario";
        if (filtros.length > 0) {
            query += " WHERE " + filtros.join(" AND ");
        }
        console.log("Filtros aplicados:", filtros);
        console.log("Valores en la consulta:", values);

        const { rows: joyas } = await pool.query(query, values);
        res.json(joyas);
    } catch (error) {
        console.error("Error en getFilteredJewels:", error);
        res.status(500).json({ error: "Error en la consulta" });
    }
};

// Agregar una nueva joya
export const createJewel = async (req, res) => {
    try {
        const { nombre, categoria, metal, precio, stock } = req.body;
        const query = "INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [nombre, categoria, metal, precio, stock];

        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error en createJewel:", error);
        res.status(500).json({ error: "Error al agregar la joya" });
    }
};

export const updateJewel = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, metal, precio, stock } = req.body;
        const query = "UPDATE inventario SET nombre = $1, categoria = $2, metal = $3, precio = $4, stock = $5 WHERE id = $6 RETURNING *";
        const values = [nombre, categoria, metal, precio, stock, id];

        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Joya no encontrada" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error en updateJewel:", error);
        res.status(500).json({ error: "Error al actualizar la joya" });
    }
};

// Eliminar una joya
export const deleteJewel = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM inventario WHERE id = $1 RETURNING *";
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Joya no encontrada" });
        }

        res.json({ message: "Joya eliminada exitosamente" });
    } catch (error) {
        console.error("Error en deleteJewel:", error);
        res.status(500).json({ error: "Error al eliminar la joya" });
    }
};
