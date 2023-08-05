import axios from "axios";

// cookies
import Cookie from "js-cookie";

import type { Directory, DirectoryForm } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fingerPrint = Cookie.get("finger_print");

export const getProjectDirectories = async (
  projectSlug: string
): Promise<Directory[]> => {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/directories/project/${projectSlug}/`,
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

export const getDirectoryById = async (id: string): Promise<Directory> => {
  try {
    const { data } = await axios.get(`${baseURL}/api/directories/${id}/`, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const createDirectory = async (
  projectSlug: string,
  formData: DirectoryForm
): Promise<Directory> => {
  try {
    const { data } = await axios.post(
      `${baseURL}/api/directories/project/${projectSlug}/`,
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

export const updateDirectory = async (
  id: string,
  formData: DirectoryForm
): Promise<Directory> => {
  try {
    const { data } = await axios.put(
      `${baseURL}/api/directories/${id}/`,
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

export const deleteDirectory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/api/directories/${id}/`, {
      headers: {
        Authorization: `FingerPrint ${fingerPrint}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
