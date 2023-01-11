import { useState } from 'react'
import { getComentario} from '../../../data/comentarios'
import { Button, Container, Heading, HStack, Stack } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, StackDivider, Box, Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context) => {
    const response = await getComentario(context.query.comentarioF)
    return {
        props: {
            data: response.data
        }
    }
}

const ver = ({ data }) => {

    const [comentario] = useState(data)
    const router = useRouter()

    return (
        <Container maxW="container.xl" mt={10}>
            <Card>
            <CardHeader>
                <Heading size='md'>{comentario.Nombre}</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Anuncio
                    </Heading>
                    <Text pt='2' fontSize='xl'>{comentario.descripcion}</Text>
                </Box>
                <HStack>
                    <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Autor
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    {comentario.rut}
                    </Text>
                </Box>
                </HStack>
                </Stack>
            </CardBody>
            </Card>
            <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/')}>Volver</Button>
        </Container>
    )
}

export default ver