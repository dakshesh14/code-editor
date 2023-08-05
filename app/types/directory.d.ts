export interface Directory {
  id: string;
  name: string;
  content: string | null;
  file_type: string;
  created_at: Date;
  last_modified: Date;
  project: string;
  parent: string | null;
  path_name: string;
}

export interface DirectoryForm {
  name: string;
  content: string | null;
  parent: string | null;
  project: string;
}
