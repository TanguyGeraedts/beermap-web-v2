import { Button } from '../../shared/ui';
import { useAuth } from './useAuth';

export const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Button className="w-full" size="lg" onClick={loginWithGoogle}>
      Continue with Google
    </Button>
  );
};
