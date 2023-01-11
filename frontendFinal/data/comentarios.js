import axios from 'axios'

const getComentarios = async ( token ) => {
    const response = await axios.get(`${process.env.SERVIDOR}/comentarios`, {headers: { cookie: token }});
    return response
};

const createComentario = async (comentario) => {
    const response = await axios.post(`${process.env.SERVIDOR}/comentario`, comentario);
    return response
}

const deleteComentario = (id) => {
    console.log(id)
    const response = axios.delete(`${process.env.SERVIDOR}/comentario/delete/${id}`);
    return response
}

module.exports = {
    getComentarios,
    createComentario,
    deleteComentario
}