type Props = {
  title: string;
  message: string;
  role?: "alert" | "status";
};

export function StatusPanel({ title, message, role = "status" }: Props) {
  return (
    <section className="status-panel" role={role}>
      <strong>{title}</strong>
      <span>{message}</span>
    </section>
  );
}
