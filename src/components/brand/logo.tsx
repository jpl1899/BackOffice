// Placeholder de marca — BackOffice todavía no tiene isotipo propio, solo
// wordmark. Reemplazar cuando exista un asset real (ver documentos/ para
// decisiones pendientes de branding).
export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-semibold text-sidebar-foreground">tuDeclaracion</span>
      {' '}
      <span className="font-normal text-sidebar-foreground/70">BackOffice</span>
    </span>
  );
}
