import { useAuth } from "@/context/AuthProvider";

function UserPage() {
  const { user } = useAuth();

  return <>Hola</>;
}

export { UserPage };
