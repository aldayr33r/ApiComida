const Platillo = require('../models/platillos_models');


const newPlatillos = async(req, res, next) => {

  const { nombre, descripcion, precio, ingredientes } = req.body;

  if (!nombre || !descripcion || !ingredientes) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const nuevoPlatillo = new Platillo({
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
    const platillo = await Platillo.findOneAndUpdate(
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




// Controlador para listar todos los platillos
const listar_todo = async (req, res) => {
  try {
    const platillos = await Platillo.find(); // Obtener todos los platillos de la base de datos
    res.status(200).json(platillos); // Enviar los platillos como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platillos', error }); // Manejo de errores
  }
};

const eliminarPlatilloPorNombre = async (req, res) => {
    try {
      const nombre = req.params.nombre;
      const resultado = await Platillo.findOneAndDelete({ nombre });
  
      if (!resultado) {
        return res.status(404).json({ mensaje: 'Platillo no encontrado' });
      }
  
      res.json({ mensaje: 'Platillo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el platillo', error });
    }
  };
  

const buscarPlatilloPorNombre = async (req, res) => {
  try{
    const consNombre = req.params.nombre;
    const resultado = await Platillo.findOne({ nombre: consNombre });
  if(!resultado){
    return res.status(404).json({ mensaje: 'Platillo no encontrado' });
  }
    const { nombre: nombrePlatillo, descripcion, precio ,ingredientes} = resultado;
    res.json({ 
      mensaje: 'Platillo encontrado:',
      platillo: { nombre: nombrePlatillo, precio, descripcion,ingredientes }
    });
  }
  catch(error){
    res.status(500).json({ mensaje: 'Error al buscar el platillo', error });
  }

};
  
module.exports = {
    listar_todo,
    newPlatillos, 
    updatePlatillos,
    eliminarPlatilloPorNombre,
    buscarPlatilloPorNombre,
};