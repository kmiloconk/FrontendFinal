import axios from 'axios'

const getPublicaciones = async ( token ) => {
    const response = await axios.get(`${process.env.SERVIDOR}/publicaciones`, { headers: { cookie: token } });
    return response
};

const createPublicacion = async (publicacion) => {
    //console.log("console log de post", publicacion)
    const response = await axios.post(`${process.env.SERVIDOR}/publicacion`, publicacion);
    return response

}

const getPublicacion = async (id) => {
    console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/publicacion/search/${id}`);
    return response
}

const updatePublicacion = (id, publicacion) => {
    console.log(id)
    const response = axios.put(`${process.env.SERVIDOR}/publicacion/update/${id}`, publicacion);
    return response
}

const deletePublicacion = (id, publicacion) => {
    console.log(id)
    const response = axios.delete(`${process.env.SERVIDOR}/publicacion/delete/${id}`, publicacion);
    return response
}
module.exports = {
    getPublicaciones,
    createPublicacion,
    getPublicacion,
    updatePublicacion,
    deletePublicacion
}