import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Skeleton de página — reusa Supabase Auth del mismo proyecto que tuDeclaracion.
// La lógica real de login (server action) se implementa en /sprint-development,
// no en /project-bootstrap (ver anti-patrón B1 de la skill: mantener el límite
// entre scaffolding y feature work).
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Ingresar a BackOffice</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@tudeclaracion.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="mt-2 w-full" type="submit">Ingresar</Button>
        </CardContent>
      </Card>
    </main>
  );
}
