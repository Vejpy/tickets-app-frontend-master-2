"use server";

import { cacheLife, cacheTag } from "next/cache";
import { apiFetch } from "./api";
import { Person } from "@/types/person.types";
import { Room } from "@/types/room.types";
import { Device } from "@/types/device.types";
import { Ticket } from "@/types/ticket.types";

export async function getPersons() {
  "use cache";
  cacheLife("hours");
  cacheTag("persons");
  return apiFetch<Person[]>("/person");
}

export async function getPersonByEmail(email: string) {
  return apiFetch<Person>("/person/by-email", {
    query: { email }
  });
}

export async function getRooms() {
  "use cache";
  cacheLife("hours");
  cacheTag("rooms");
  return apiFetch<Room[]>("/room");
}

export async function getDevices() {
  "use cache";
  cacheLife("hours");
  cacheTag("devices");
  return apiFetch<Device[]>("/device");
}

export async function getTickets() {
  "use cache";
  cacheLife("hours");
  cacheTag("tickets");
  return apiFetch<Ticket[]>("/ticket");
}

// Funkce pro agregace na dashboardu
export async function getDashboardStats() {
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

