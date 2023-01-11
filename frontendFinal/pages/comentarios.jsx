import { useState, useEffect } from "react";
import axios from "axios";
import { Button,Container,Heading,HStack,Input,Stack,Table,Thead,Tr,Td,Th,Tbody } from "@chakra-ui/react";
import { getComentarios} from '../data/comentarios';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { deleteComentario } from "../data/comentarios";

const comentarios = () => {
    const [comentarios, setComentarios] = useState([
      {
        id: "",
        nombre: "",
        descripcion: "",
        publicacion_a_comentar:""
      }
    ]);
    
    const router = useRouter()

    const delCom = async(id) => {
        const response = await deleteComentario(id)
        router.reload()
    }

    const contentTable = () => {
        return comentarios.map((comentario) => {
          return (
            <Tr key={comentario._id}>
              <Td>{comentario.nombre}</Td>
              <Td>{comentario.descripcion}</Td>
              <Td>{comentario.publicacion_a_comentar}</Td>
              <Td>
                <HStack>
                  <Button colorScheme="red" onClick={()=>delCom(comentario._id)}>Eliminar</Button>
                </HStack>
              </Td>
            </Tr>
    
          );
        });
    }

    useEffect(() => {
        getComentarios().then(res => {
        setComentarios(res.data)
        })
    }, []);

    return (
        <>
        <Container maxW="container.xl">
            <Heading as="h1" size="2xl" textAlign="center" mt="10">Listado de comentarios</Heading>
            <HStack>
            <Button colorScheme="cyan" mt="10" mb="10" onClick={() => router.push(`../comentario/crearComentario`)}>Agregar Comentario</Button>
            <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/')}>Volver</Button>
            </HStack>
            <Stack spacing={4} mt="10">
            <Table variant="simple">
                <Thead>
                <Tr>
                    <Td>nombre</Td>
                    <Td>Descripcion</Td>
                    <Td>Publicacion comentada</Td>
                </Tr>
                </Thead>
                <Tbody>
                {contentTable()}
                </Tbody>
            </Table>
            </Stack>
        </Container>
        </>
    );
};

export default comentarios;