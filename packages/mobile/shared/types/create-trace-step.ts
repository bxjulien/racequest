export type CreateTraceStep = {
  id: number;
  title: string;
  subtitle?: string;
  headerComponent?: React.ReactNode;
  component: React.ReactNode;
  footer: React.ReactNode;
};
