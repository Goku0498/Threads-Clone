import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    Avatar,
    useColorModeValue,
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const SuggestedUsers = () => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const showToast = useShowToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setSuggestedUsers(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        };
        fetchSuggestedUsers();
    }, [showToast]);

    const handleFollow = async (userId) => {
        try {
            const res = await fetch(`/api/users/follow/${userId}`, {
                method: "PUT",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "User followed successfully", "success");
            setSuggestedUsers(suggestedUsers.filter((user) => user._id !== userId));
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
                    <Text fontSize={"4xl"}>Suggested Users to Follow</Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        {suggestedUsers.map((user) => (
                            <Flex key={user._id} align={"center"} justify={"space-between"}>
                                <Flex align={"center"}>
                                    <Avatar src={user.profilePic} />
                                    <Text ml={4}>{user.username}</Text>
                                </Flex>
                                <Button
                                    colorScheme="blue"
                                    onClick={() => handleFollow(user._id)}
                                >
                                    Follow
                                </Button>
                            </Flex>
                        ))}
                        {suggestedUsers.length === 0 && (
                            <Text>No more users to suggest</Text>
                        )}
                        <Button
                            mt={4}
                            colorScheme="teal"
                            onClick={() => navigate("/home")}
                        >
                            Go to Home
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SuggestedUsers;