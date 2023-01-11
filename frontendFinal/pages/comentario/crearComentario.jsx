import { useState } from 'react'
import { Button,Container,Heading,HStack,Input,Stack,FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { createComentario } from '../../data/comentarios'
import InputForm from '/components/InputForm'
import TextareaInput from '../../components/TextareaInput'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const crear = () => {
    const router = useRouter()
    const [comentario, setComentario] = useState({
        nombre: "",
        descripcion: "",
        publicacion_a_comentar:""
    })

    const handleChange = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const submitComentario = async (e) => {
        e.preventDefault()
        const response = await createComentario(comentario)
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Comentario creado',
                showConfirmButton: true,
                text: 'El Comentario se creó correctamente'
            }).then(() => {
                router.push('/')
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: true,
                text: 'Ocurrió un error al crear el Comentario'
            })
        }
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Comentario</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm label="nombre" handleChange={handleChange} name="nombre" placeholder="nombre" type="text" value={comentario.nombre}/>
                <InputForm label="publicacion a comentar" handleChange={handleChange} name="publicacion_a_comentar" placeholder="publicacion a comentar" type="text" value={comentario.publicacion_a_comentar}/>
                <TextareaInput label="Descripcion" handleChange={handleChange} name="descripcion" placeholder="Descripcion" type="text" value={comentario.descripcion}/>
            </Stack>
            <HStack>
                <Button colorScheme="cyan" mt="10" mb="10" onClick={submitComentario} >Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/comentarios')}>Volver</Button>
            </HStack>
        </Container>
    )
}



export default crear