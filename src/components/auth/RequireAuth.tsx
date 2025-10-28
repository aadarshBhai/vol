import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthed(!!token);
  }, []);

  if (isAuthed === null) return null;

  if (!isAuthed) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signup?redirect=${redirect}`} replace />;
  }

  return <>{children}</>;
}
