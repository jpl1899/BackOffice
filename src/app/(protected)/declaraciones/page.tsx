// Skeleton de página. Vista read-only de una declaración por empresa+período
// (src/modules/declaraciones/) — sin affordance de edición, ver Project
// Foundation.md § Declaración support view.
export default function DeclaracionesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Declaraciones</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lookup read-only de declaración + asientos por empresa/período — pendiente de
        implementación (ver src/modules/declaraciones/).
      </p>
    </div>
  );
}
