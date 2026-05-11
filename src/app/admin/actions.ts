"use server";

import { revalidateTag } from "next/cache";
import { httpDelete, httpPatch, httpPost } from "@/utils/server/server.http";
import { Person } from "@/types/person.types";

export async function deletePerson(id: string) {
  try {
    await httpDelete(`/person/${id}`);
    revalidateTag("persons", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to delete person:", error);
    throw error;
  }
}

export async function createPerson(data: Omit<Person, "id">) {
  try {
    await httpPost("/person", data);
    revalidateTag("persons", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to create person:", error);
    throw error;
  }
}

export async function deleteTicket(id: string) {
  try {
    await httpDelete(`/ticket/${id}`);
    revalidateTag("tickets", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    throw error;
  }
}

export async function createTicket(data: any) {
  try {
    await httpPost("/ticket", data);
    revalidateTag("tickets", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to create ticket:", error);
    throw error;
  }
}

export async function deleteRoom(id: string) {
  try {
    await httpDelete(`/room/${id}`);
    revalidateTag("rooms", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to delete room:", error);
    throw error;
  }
}

export async function createRoom(data: { name: string; floor: number }) {
  try {
    await httpPost("/room", data);
    revalidateTag("rooms", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to create room:", error);
    throw error;
  }
}

export async function deleteDevice(id: string) {
  try {
    await httpDelete(`/device/${id}`);
    revalidateTag("devices", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to delete device:", error);
    throw error;
  }
}

export async function createDevice(data: { name: string; type: string; serialNumber: string; roomId: string }) {
  try {
    await httpPost("/device", data);
    revalidateTag("devices", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to create device:", error);
    throw error;
  }
}

export async function updatePerson(id: string, data: Partial<Person>) {
  try {
    await httpPatch(`/person/${id}`, data);
    revalidateTag("persons", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to update person:", error);
    throw error;
  }
}

export async function updateTicket(id: string, data: any) {
  try {
    await httpPatch(`/ticket/${id}`, data);
    revalidateTag("tickets", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to update ticket:", error);
    throw error;
  }
}

export async function updateRoom(id: string, data: { name: string; floor: number }) {
  try {
    await httpPatch(`/room/${id}`, data);
    revalidateTag("rooms", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to update room:", error);
    throw error;
  }
}

export async function updateDevice(id: string, data: { name: string; type: string; serialNumber: string; roomId: string }) {
  try {
    await httpPatch(`/device/${id}`, data);
    revalidateTag("devices", "hours");
    revalidateTag("dashboard", "hours");
  } catch (error) {
    console.error("Failed to update device:", error);
    throw error;
  }
}
