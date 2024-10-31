export interface Municipio {
    _id: string;
    nombre: string;
}

export interface Programa {
    _id: string;
    nombre: string;
}

export interface Beneficiario {
    _id: string;
    ejercicio: string;
    nombre: string;
    papellido: string;
    sapellido: string;
    sexo: string;
    genero: string;
    programa_id: number;
    monto: number;
    clave_municipio: string;
    edad: number;
    municipio: Municipio;
    programa: Programa;
}
