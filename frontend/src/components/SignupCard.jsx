import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    Stack,
    Text,
    Link,
    Flex,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const SignupCard = ({ onSignup }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [areasOfInterest, setAreasOfInterest] = useState([]);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await onSignup({ name, email, username, password, areasOfInterest });
            navigate("/suggested-users");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Text fontSize={"4xl"}>Sign up for an account</Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="areasOfInterest">
                            <FormLabel>Areas of Interest</FormLabel>
                            <Menu closeOnSelect={false}>
                                <MenuButton as={Button} colorScheme="blue">
                                    Select Areas of Interest
                                </MenuButton>
                                <MenuList>
                                    <MenuOptionGroup
                                        defaultValue={areasOfInterest}
                                        title="Interests"
                                        type="checkbox"
                                        onChange={(values) => setAreasOfInterest(values)}
                                    >
                                        <MenuItemOption value="Technology">Technology</MenuItemOption>
                                        <MenuItemOption value="Science">Science</MenuItemOption>
                                        <MenuItemOption value="Art">Art</MenuItemOption>
                                        <MenuItemOption value="Music">Music</MenuItemOption>
                                        <MenuItemOption value="Sports">Sports</MenuItemOption>
                                    </MenuOptionGroup>
                                </MenuList>
                            </Menu>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SignupCard;