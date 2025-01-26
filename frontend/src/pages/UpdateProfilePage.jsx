/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    CheckboxGroup,
    Checkbox,
    Stack,
    Text,
    Flex,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const UpdateProfilePage = () => {
    const user = useRecoilValue(userAtom);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [areasOfInterest, setAreasOfInterest] = useState(user.areasOfInterest || []);
    const [isEditing, setIsEditing] = useState(false);
    const showToast = useShowToast();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, username, bio, areasOfInterest }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Profile updated successfully", "success");
            setIsEditing(false);
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
                    <Text fontSize={"4xl"}>Update Profile</Text>
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
                        <FormControl id="bio">
                            <FormLabel>Bio</FormLabel>
                            <Input
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="areasOfInterest">
                            <FormLabel>Areas of Interest</FormLabel>
                            {isEditing ? (
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button} colorScheme="blue">
                                        Edit Areas of Interest
                                    </MenuButton>
                                    <MenuList>
                                        <MenuOptionGroup
                                            defaultValue={areasOfInterest}
                                            title="Interests"
                                            type="checkbox"
                                            onChange={setAreasOfInterest}
                                        >
                                            <MenuItemOption value="Technology">Technology</MenuItemOption>
                                            <MenuItemOption value="Science">Science</MenuItemOption>
                                            <MenuItemOption value="Art">Art</MenuItemOption>
                                            <MenuItemOption value="Music">Music</MenuItemOption>
                                            <MenuItemOption value="Sports">Sports</MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <Stack spacing={2}>
                                    {areasOfInterest.map((interest) => (
                                        <Text key={interest}>{interest}</Text>
                                    ))}
                                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                                </Stack>
                            )}
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
                                onClick={handleUpdate}
                            >
                                Update Profile
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default UpdateProfilePage;