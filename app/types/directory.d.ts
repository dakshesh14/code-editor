export interface Directory {
  id: number;
  children: Directory[];
  name: string;
  content: string;
  file_type: string;
  created_at: Date;
  last_modified: Date;
  project: number;
  parent: number | null;
}
