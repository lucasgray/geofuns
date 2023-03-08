import { Uuid } from './index';

export default interface Classification {
  id: Uuid;
  label: string;
  description: string;
  slug: string;
  priority: number;
}
