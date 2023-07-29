export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  project_type: "python" | "vanilla_js" | "react" | "cpp";
  created_by: string;

  created_at: string;
  updated_at: string;
}

export interface ProjectForm {
  name: string;
  description: string;
  project_type: "python" | "vanilla_js" | "react" | "cpp" | null;
  non_field_errors?: string[];
}
