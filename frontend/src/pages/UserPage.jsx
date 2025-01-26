import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Avatar, Stack } from "@chakra-ui/react";

const UserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                if (data.error) {
                    // Handle error
                    return;
                }
                setUser(data);
                setLoading(false);
            } catch (error) {
                // Handle error
            }
        };
        fetchUser();
    }, [username]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Text>User not found</Text>;
    }

    return (
        <Box>
            <Stack spacing={4} align="center">
                <Avatar size="xl" src={user.profilePic} />
                <Text fontSize="2xl">{user.username}</Text>
                <Text>{user.bio}</Text>
            </Stack>
        </Box>
    );
};

export default UserPage;