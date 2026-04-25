"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiFetch } from "@/utils/api";
import { Person } from "@/types/person.types";
import { Ticket } from "@/types/ticket.types";

export async function deletePerson(id: string) {
  try {
    await apiFetch(`/person/${id}`, { method: "DELETE" });
    revalidateTag("persons");
    revalidatePath("/admin/persons");
    revalidatePath("/persons");
  } catch (error) {
    console.error("Failed to delete person:", error);
    throw error;
  }
}

export async function createPerson(data: Omit<Person, "id">) {
  try {
    await apiFetch("/person", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("persons");
    revalidatePath("/admin/persons");
    revalidatePath("/persons");
  } catch (error) {
    console.error("Failed to create person:", error);
    throw error;
  }
}

export async function deleteTicket(id: string) {
  try {
    await apiFetch(`/ticket/${id}`, { method: "DELETE" });
    revalidateTag("tickets");
    revalidatePath("/admin/tickets");
    revalidatePath("/tickets");
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    throw error;
  }
}

export async function createTicket(data: any) {
  try {
    await apiFetch("/ticket", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("tickets");
    revalidatePath("/admin/tickets");
    revalidatePath("/tickets");
  } catch (error) {
    console.error("Failed to create ticket:", error);
    throw error;
  }
}

export async function deleteRoom(id: string) {
  try {
    await apiFetch(`/room/${id}`, { method: "DELETE" });
    revalidateTag("rooms");
    revalidatePath("/admin/rooms");
    revalidatePath("/rooms");
  } catch (error) {
    console.error("Failed to delete room:", error);
    throw error;
  }
}

export async function createRoom(data: { name: string; floor: number }) {
  try {
    await apiFetch("/room", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("rooms");
    revalidatePath("/admin/rooms");
    revalidatePath("/rooms");
  } catch (error) {
    console.error("Failed to create room:", error);
    throw error;
  }
}

export async function deleteDevice(id: string) {
  try {
    await apiFetch(`/device/${id}`, { method: "DELETE" });
    revalidateTag("devices");
    revalidatePath("/admin/devices");
    revalidatePath("/devices");
  } catch (error) {
    console.error("Failed to delete device:", error);
    throw error;
  }
}

export async function createDevice(data: { name: string; type: string; serialNumber: string; roomId: string }) {
  try {
    await apiFetch("/device", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("devices");
    revalidatePath("/admin/devices");
    revalidatePath("/devices");
  } catch (error) {
    console.error("Failed to create device:", error);
    throw error;
  }
}
