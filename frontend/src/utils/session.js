export const checkSession = async () => {
    try {
        const response = await fetch("/users/check_session");
        if (!response.ok) {
            throw new Error("failed to fetch check_session");
        }
        const data = await response.json();
        return {
            loggedIn: data.loggedIn,
            username: data.username
        };
    } catch (error) {
        console.error("Error checking session: ", error);
        return false;
    }
}