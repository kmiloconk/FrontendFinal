import { useState, useEffect } from "react";
import axios from "axios";
import { Button,Container,Heading,HStack,Input,Stack,Table,Thead,Tr,Td,Th,Tbody } from "@chakra-ui/react";
import { getPublicaciones} from '../data/publicaciones';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([
    {
      id: "",
      titulo: "",
      autor: "",
      descripcion: "",
      correo: "",
      domicilio: ""
    }
  ]);

  const router = useRouter()

  const contentTable = () => {
    return publicaciones.map((publicacion) => {
      return (
        <Tr key={publicacion._id}>
          <Td>{publicacion.titulo}</Td>
          <Td>{publicacion.autor}</Td>
          <Td>{publicacion.domicilio}</Td>
          <Td>
            <HStack>
              <Button colorScheme="orange" onClick={() => router.push(`../publicacion/ver/${publicacion._id}`)}>Ver</Button>
              <Button colorScheme="cyan" onClick={() => router.push(`../publicacion/actualizar/${publicacion._id}`)}>Editar</Button>
              <Button colorScheme="red" onClick={() => router.push(`/`)}>Eliminar</Button>
            </HStack>
          </Td>
        </Tr>

      );
    });
  }

  useEffect(() => {
    getPublicaciones().then(res => {
      setPublicaciones(res.data)
    })
  }, []);


  const cerrar = async () => {
    await axios.get(`${process.env.SERVIDOR}/logout`)
    Cookies.remove("token")
    router.push("/")
  }

  return (
    <>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mt="10">Listado de publicaciones</Heading>
        <HStack>
          <Button colorScheme={"red"} onClick={cerrar}>Cerrar sesion</Button>
          <Button colorScheme="cyan" mt="10" mb="10" onClick={() => router.push(`../publicacion/crear`)}>Agregar publicacion</Button>
          <Button colorScheme="green" onClick={() => router.push(`../comentarios`)}>comentarios</Button>
        </HStack>
        <Stack spacing={4} mt="10">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Td>Titulo</Td>
                <Td>autor</Td>
                <Td>domicilio</Td>
                <Td>Acciones</Td>
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
export default publicaciones;
