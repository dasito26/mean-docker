const mongoose = require("mongoose");
const Area = require("./models/area.model"); // Asegúrate de importar el modelo correcto
const Programa = require("./models/programa.model"); // Importa el modelo de municipios

async function updateDistritosWithMunicipioIds() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(
      "mongodb://admin-user:admin-password@database/mean-contacts?authSource=admin",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    // Obtener todos los documentos de distritos
    const programas = await Programa.find();

    // Iterar sobre cada documento de distrito
    for (let programa of programas) {
      // Buscar el municipio correspondiente basado en `cve_mpio`
      const area = await Area.findOne({
        id: programa.area_id
      });

      if (programa) {
        // Actualizar el documento de distrito con el `ObjectId` de municipio encontrado
        await Programa.updateOne(
          { _id: programa._id }, // Condición para actualizar el documento correcto
          { $set: { area: area._id } } // Añadir o actualizar el campo `municipio_id`
        );
        console.log(
          `Actualizado programa ${programa._id} con area_id ${area._id}`
        );
      } else {
        console.log(`No se encontró municipio para cve_mpio: ${area._id}`);
      }
    }

    console.log("Proceso completado");
  } catch (error) {
    console.error("Error al actualizar distritos:", error);
  } finally {
    // Desconectar de la base de datos
    mongoose.disconnect();
  }
}

updateDistritosWithMunicipioIds();
