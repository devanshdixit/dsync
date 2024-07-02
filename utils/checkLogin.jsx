const CheckLogin = () => {
    const { authUser } = useAuth();
    if (authUser) {
        return true;
    } else {
        return false;
    }
}

export default CheckLogin;