import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from './useMe';

type AdminGateProps = {
  children: ReactNode;
};

export const AdminGate = ({ children }: AdminGateProps) => {
  const { profile } = useMe();

  if (profile?.accountType !== 'ADMIN') {
    return <Navigate to="/settings" replace />;
  }

  return children;
};
