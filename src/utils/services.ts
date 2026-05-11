"use server";

import { cacheLife, cacheTag } from "next/cache";
import { httpGet } from "@/utils/server/server.http";
import { Person } from "@/types/person.types";
import { Room } from "@/types/room.types";
import { Device } from "@/types/device.types";
import { Ticket } from "@/types/ticket.types";

export async function getPersons() {
  "use cache";
  cacheLife("hours");
  cacheTag("persons", "hours");
  return httpGet<Person[]>("/person");
}

export async function getPersonByEmail(email: string) {
  return httpGet<Person>("/person/by-email", {
    params: { email }
  });
}

export async function getRooms() {
  "use cache";
  cacheLife("hours");
  cacheTag("rooms", "hours");
  return httpGet<Room[]>("/room");
}

export async function getDevices() {
  "use cache";
  cacheLife("hours");
  cacheTag("devices", "hours");
  return httpGet<Device[]>("/device");
}

export async function getTickets() {
  "use cache";
  cacheLife("hours");
  cacheTag("tickets", "hours");
  return httpGet<Ticket[]>("/ticket");
}

export async function getPersonById(id: string) {
  return httpGet<Person>(`/person/${id}`);
}

export async function getRoomById(id: string) {
  return httpGet<Room>(`/room/${id}`);
}

export async function getDeviceById(id: string) {
  return httpGet<Device>(`/device/${id}`);
}

export async function getTicketById(id: string) {
  return httpGet<Ticket>(`/ticket/${id}`);
}

// Funkce pro agregace na dashboardu (SSG-like caching)
export async function getDashboardStats() {
  "use cache";
  cacheLife("days"); // Dashboard stats cache longer for SSG feel
  cacheTag("dashboard", "hours");

  const [persons, rooms, devices, tickets] = await Promise.all([
    getPersons(),
    getRooms(),
    getDevices(),
    getTickets(),
  ]);

  return {
    personsCount: persons.length,
    roomsCount: rooms.length,
    devicesCount: devices.length,
    ticketsCount: tickets.length,
  };
}
