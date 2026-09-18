import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from './actions';

const ERROR_MESSAGES: Record<string, string> = {
  'unauthorized': 'Tu cuenta no tiene acceso a este backoffice.',
  'invalid-credentials': 'Email o contraseña incorrectos.',
  'missing-credentials': 'Completá email y contraseña.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Ingresar a BackOffice</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@tudeclaracion.com" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {errorMessage && (
              <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
            )}
            <Button className="mt-2 w-full" type="submit">Ingresar</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
