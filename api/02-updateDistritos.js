const mongoose = require("mongoose");
const Distrito = require("./models/distrito.model"); // Asegúrate de importar el modelo correcto
const Municipio = require("./models/municipio.model"); // Importa el modelo de municipios

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
    const distritos = await Distrito.find();

    // Iterar sobre cada documento de distrito
    for (let distrito of distritos) {
      // Buscar el municipio correspondiente basado en `cve_mpio`
      const municipio = await Municipio.findOne({
        cve_mpio_full: distrito.cve_mpio_full
      });

      if (municipio) {
        // Actualizar el documento de distrito con el `ObjectId` de municipio encontrado
        await Distrito.updateOne(
          { _id: distrito._id }, // Condición para actualizar el documento correcto
          { $set: { municipio: municipio._id } } // Añadir o actualizar el campo `municipio_id`
        );
        console.log(
          `Actualizado distrito ${distrito._id} con municipio_id ${municipio._id}`
        );
      } else {
        console.log(
          `No se encontró municipio para cve_mpio: ${distrito.cve_mpio_full}`
        );
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
