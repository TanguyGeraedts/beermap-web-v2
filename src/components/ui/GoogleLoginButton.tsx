import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Button className="w-full" size="lg" onClick={loginWithGoogle}>
      Continue with Google
    </Button>
  );
};
