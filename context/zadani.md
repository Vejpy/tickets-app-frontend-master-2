# Projekt: Helpdesk Portal (Public + Admin)

Vaším cílem je vytvořit webovou aplikaci pro ticketovací a inventární systém – přehled osob, místností, zařízení a ticketů.  
Část webu je veřejná (read-only přehledy), část je administrace (vytváření záznamů přes API).

---

## ⚠️ Důležité omezení – počet requestů

- Omezení počtu requestů za minutu na jeden API klíč
- Minimalizujte počet volání:
  - cache
  - ISR
  - stránkování
- Nedělejte „fetch na každé písmeno“ při vyhledávání
- UI musí mít rozumné chování:
  - search až po Enter
  - filtr až po potvrzení

---

## 🌐 API

- API URL: https://zmrd.ondrejpetera.cz/api/v1  
- Swagger dokumentace: https://zmrd.ondrejpetera.cz/api/v1/docs  

---

## 🛠 Povinné technologie a pravidla

- Next.js (App Router) + TypeScript
- Primárně **Server Components**
- Client Components pouze když nutné:
  - formuláře
  - interaktivní filtry
  - toasty
- Data tahat přes backend dle Swagger dokumentace
- Použijte základ ze cvičení:
  - struktura app routeru
  - fetch wrapper
  - error handling

---

## 🔑 API klíč

- Každý dostane vlastní API klíč (nesdělovat!)
- Omezený počet requestů za minutu
- Každý vidí pouze své záznamy
- Přidává se do hlavičky:

- Uložit do `.env` (NE `NEXT_PUBLIC`)

---

# 📌 Funkční požadavky – veřejná část (bez API key)

## 1) Landing page (SSG)

- Statická úvodní stránka
- Popis systému + dashboard tiles
- Zobrazit agregace:
- počet osob
- počet místností
- počet ticketů
- počet zařízení

**SSG/ISR:**
- generovat staticky
- použít `revalidate`

---

## 2) Přehledové stránky (ISR)

Samostatné stránky:

- Osoby
- Místnosti
- Zařízení
- Tickety

### Požadavky:

- Vyhledávání / filtrování
- UI může být client, ale data tahat serverově
- ISR (např. 60–300 s)

**Bonus:**
- stránkování

---

# 🔐 Administrace (s API key)

## 3) Admin login

- Route: `/admin`
- Login:
- nemusí být řešen nebo pouze „fake“
- API nepodporuje JWT
- Fokus:
- SSR / SSG / ISR
- práce s API

---

## 4) Admin CRUD

### Operace:

- Create
- Update
- Delete

Pro entity:

- osoba
- místnost
- zařízení
- ticket

### Požadavky:

- Validace formulářů:
- required
- typy
- Veřejné stránky musí vidět změny (revalidace)

---

# ⚙️ Povinné: SSG / SSR / ISR

- Použít všechny přístupy:
- SSG
- SSR
- ISR
- Client pouze pokud nutné
- V README vysvětlit:
- kde co používáte
- proč

---

# ⚡ Povinné: Next caching

## A) use cache + cacheLife + cacheTag

- Vyberte min. 3 funkce:
- `getPersons()`
- `getRooms()`
- `getDevices()`
- `getTickets()`

- Implementovat caching na serveru

---

## B) revalidateTag

Po vytvoření entity:

- osoba → `revalidateTag("persons")`
- ticket → `revalidateTag("tickets")`

### Požadavky:

- Serverová implementace:
- Server Action nebo Route Handler
- Musí reálně aktualizovat data

---

# 🔍 SEO

- Základní metadata
- Sitemap
- robots.txt

---

# 🎨 UX a kvalita

- Loading stavy
- Error stavy
- Responzivita
- Čisté routy:

---

# 📦 Odevzdání

- Git repo (README povinné)
- Neposílat `.env`
- Repo odevzdat do Classroom komentáře

---

## README musí obsahovat:

- Jak projekt spustit
- Jak funguje admin login
- Kde používáte:
- SSG / SSR / ISR
- Kde používáte:
- use cache
- cacheLife
- cacheTag
- revalidateTag

---

# ⭐ Bonus (nepovinné)

- Stránkování
- Nasazení (např. Vercel)