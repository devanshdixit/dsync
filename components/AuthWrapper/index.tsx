// components/AuthWrapper.tsx
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../../store/userSlice';

interface AuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            dispatch(setUser({
                id: decoded.id,
                email: decoded.email,
                fullName: decoded.fullName,
                token,
            }));
        }
        setLoading(false);
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthWrapper;
