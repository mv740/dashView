import { Access } from './access.model';

export interface Permissions {
  project_access: Access | null;
  group_access: Access | null;
}