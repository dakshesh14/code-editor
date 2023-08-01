import axios from "axios";

// cookies
import Cookie from "js-cookie";

import type { Project, ProjectForm } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fingerPrint = Cookie.get("finger_print");

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await axios.get(`${baseURL}/api/projects/`, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  try {
    const { data } = await axios.get(`${baseURL}/api/projects/${slug}/`, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const createProject = async (
  formData: ProjectForm
): Promise<Project> => {
  try {
    const { data } = await axios.post(`${baseURL}/api/projects/`, formData, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateProject = async (
  slug: string,
  formData: ProjectForm
): Promise<Project> => {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/projects/${slug}/`,
      formData,
      {
        headers: {
          Authorization: `FingerPrint ${fingerPrint}`,
        },
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteProject = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/api/projects/${slug}/`, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
