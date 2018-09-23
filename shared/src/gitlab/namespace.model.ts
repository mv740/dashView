export interface Namespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id: number | null;
}