const Platillos = require("../models/platillos_models");

const newPlatillos = async(req, res, next) => {

  const { nombre, descripcion, precio, ingredientes } = req.body;

  if (!nombre || !descripcion || !ingredientes) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const nuevoPlatillo = new Platillos({
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    ingredientes: ingredientes,
  });

    try {
      await nuevoPlatillo.save();
      res.status(200).json(nuevoPlatillo)
    }catch (error) {
      res.status(400).json({message: error.message})
      next(error);
    }
    
}; 

const updatePlatillos = async(req, res, next) => {
  const nombrePlatillo = req.params.nombre;
  const { nombre, descripcion, precio, ingredientes } = req.body;
  if (!nombrePlatillo) {
    return res.status(400).json({ message: 'No se tiene en db se platillo'});
  }

  try {
    const platillo = await Platillos.findOneAndUpdate(
      { nombre: nombrePlatillo }, // Filtro para encontrar el platillo por nombre
      { nombre, descripcion, precio, ingredientes }, // Campos a actualizar
      { new: true, runValidators: true } // Opciones
    );

    if (!platillo) {
      return res.status(404).json({ message: 'Platillo no encontrado'});
    }

    res.status(200).json(platillo);
  } catch (error) {
    res.status(400).send({message: error.message});
    next(error);
  }
  
}; 








module.exports={
    newPlatillos, 
    updatePlatillos
}