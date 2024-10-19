const mongoose = require("mongoose");
const Beneficiario = require("./models/beneficiario.model"); // Asegúrate de importar el modelo correcto
const Municipio = require("./models/municipio.model"); // Importa el modelo de municipios
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
    const beneficiarios = await Beneficiario.find();
    var num = 1;
    // Iterar sobre cada documento de distrito
    for (let beneficiario of beneficiarios) {
      // Buscar el municipio correspondiente basado en `cve_mpio`
      const municipio = await Municipio.findOne({
        cve_mpio_full: beneficiario.clave_municipio
      });

      if (municipio) {
        // Actualizar el documento de distrito con el `ObjectId` de municipio encontrado
        await Beneficiario.updateOne(
          { _id: beneficiario._id }, // Condición para actualizar el documento correcto
          { $set: { municipio: municipio._id } } // Añadir o actualizar el campo `municipio_id`
        );
        console.log(
          `${num} Actualizado beneficiario ${beneficiario._id} con municipio_id ${municipio._id}`
        );
      } else {
        console.log(
          `No se encontró municipio para cve_mpio: ${beneficiario.clave_municipio}`
        );
      }

      num++;
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
