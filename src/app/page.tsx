import { redirect } from 'next/navigation';

// Sin dashboard en el MVP1 (ver .context/Project Foundation.md § Scope) —
// la landing por defecto es el listado de usuarios.
export default function RootPage() {
  redirect('/usuarios');
}
