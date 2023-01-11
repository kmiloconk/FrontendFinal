import { useState } from "react"
import { Container, Heading, Button, Input, Stack, FormControl, FormLabel } from "@chakra-ui/react"
import Swal from "sweetalert2"
import { login, checkToken } from "../data/usuario"
import { useRouter } from "next/router"
import Cookie from "js-cookie"

export const getServerSideProps = async (context) => {
	try {
		const response = await checkToken(context.req.headers.cookie)
		if (response.status === 200) {
			return {
				redirect: {
					destination: "/publicaciones",
					permanent: false
				}
			}
		}
	} catch (error) {
		console.log(error)
		return {
			props: {}
		}
	}
}

const Home = ({ data }) => {

	const [usuario, setUser] = useState({
		rut: "",
		password: ""
	})

	const router = useRouter()
	const handleChange = (e) => {
		setUser({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await login(usuario.rut, usuario.password)
			if (response.status === 200) {
				Cookie.set("token", response.data.token, { expires: 1 })
				router.push("/publicaciones")
			}
		} catch (error) {
			console.log(error)
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Algo salio mal!"
			})
		}
	}

	return (
		<Container maxW="container.md">
			<Heading as="h1" size="2xl" textAlign="center" my={10}>Inicio de sesion</Heading>
			<Stack>
				<FormControl>
					<FormLabel>Rut</FormLabel>
					<Input type="rut" name="rut" onChange={handleChange} />
				</FormControl>
				<FormControl>
					<FormLabel>Contraseña</FormLabel>
					<Input type="password" name="password" onChange={handleChange} />
				</FormControl>
			</Stack>
			<Button my={10} colorScheme={"blue"} onClick={onSubmit}>Iniciar sesion</Button>
		</Container>
	)
}

export default Home