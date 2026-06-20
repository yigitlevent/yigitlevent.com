"use client";

import type { Forms } from "@/types/api/request";
import type { Routes } from "@/types/api/routes";


function NormalizeResponse<T>(payload: unknown): { data: T; } {
  if (payload && typeof payload === "object" && "data" in payload) {
    const wrapped = payload as { data: T; };
    return { data: wrapped.data };
  }

  return { data: payload as T };
}


export async function GenericGet<T>(path: Routes): Promise<{ data: T; }> {
  const response = await fetch(path, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const payload = await response.json() as unknown;
  return NormalizeResponse<T>(payload);
}

export async function GenericPost<T>(path: Routes, formData: Forms | null): Promise<{ data: T; }> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: formData ? JSON.stringify(formData) : null
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const payload = await response.json() as unknown;
  return NormalizeResponse<T>(payload);
}

export async function GenericDelete<T>(path: Routes): Promise<{ data: T; }> {
  const response = await fetch(path, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const payload = await response.json() as unknown;
  return NormalizeResponse<T>(payload);
}

export async function GenericPut<T>(path: Routes, formData: Forms | null): Promise<{ data: T; }> {
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: formData ? JSON.stringify(formData) : null
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const payload = await response.json() as unknown;
  return NormalizeResponse<T>(payload);
}
