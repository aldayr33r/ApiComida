const Platillo = require('../models/platillos_models');


const newPlatillos = async(req, res, next) => {

  const { nombre, descripcion, precio, ingredientes } = req.body;

  if (!nombre || !descripcion || !ingredientes) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const nuevoPlatillo = new Platillo({
    nombre: nombre.toLowerCase(),
    descripcion: descripcion.toLowerCase(),
    precio: precio,
    ingredientes: ingredientes.toLowerCase(),
  });

    try {
      await nuevoPlatillo.save();
      res.status(200).json({message:"Se agrego nuevo platillo", Platillo: nuevoPlatillo})
    }catch (error) {
      res.status(400).json({message: error.message})
      next(error);
    }
    
}; 

const updatePlatillos = async(req, res, next) => {
  const key = req.params.key.toLowerCase();
  const value = req.params.value.toLowerCase();
  const { nombre, descripcion, precio, ingredientes } = req.body;
   let query = {};
    query[key] = value;
    const updateData= {
      nombre: nombre.toLowerCase(),
      descripcion: descripcion.toLowerCase(),
      precio: precio,
      ingredientes: ingredientes.toLowerCase(),
    };

  if (!value) {
    return res.status(400).json({ message: 'No se tiene en db se platillo'});
  }

  try {
    const platillo = await Platillo.findOneAndUpdate(
      query, updateData ,   { new: true, runValidators: true }  // Filtro para encontrar el platillo por nombre// Campos a actualizar
   // Opciones
    );

    if (!platillo) {
      return res.status(404).json({ message: 'Platillo no encontrado'});
    }

    res.status(200).json({message:"Se actualizo el platillo", Platillo: platillo});
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
    const key = req.params.key.toLowerCase();
    const value=   req.params.value.toLowerCase();
    let query = {};
    query[key] = value;
    const resultado = await Platillo.findOneAndDelete(query);

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
  const key = req.params.key.toLowerCase();
  const value=   req.params.value.toLowerCase();
  let query = {};
  query[key] = value;
  const resultado = await Platillo.findOne(query);
if(!resultado){
  return res.status(404).json({ mensaje: 'Platillo no encontrado' });
}
  
res.json(resultado);
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