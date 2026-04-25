# Helpdesk Portal

Komplexní webová aplikace vyvinutá pomocí **Next.js (App Router)** pro správu a evidenci zařízení, místností, osob a ticketů. Aplikace spojuje veřejnou (read-only) informační část a soukromou administrační konzoli pro plnohodnotné řízení přes API.

---

## 🚀 Jak projekt spustit

1. **Instalace závislostí:**
   ```bash
   pnpm install
   # nebo
   npm install
   ```

2. **Klíče a Proměnné (Environment Variables):**
   Pro komunikaci s API musíte vytvořit `.env` soubor v hlavním adresáři (`/`) a nastavit váš unikátní klíč:
   ```env
   # API_KEY je čistě privátní, proto není prefixováno kódem NEXT_PUBLIC
   API_KEY=vložte_svůj_tajný_klíč_zde
   ```

3. **Spuštění:**
   Aplikaci spustíte pro lokální vývoj na `http://localhost:3000` příkazem:
   ```bash
   pnpm run dev
   # nebo
   npm run dev
   ```

---

## 🔐 Logika Administrátorského Loginu

Administrativní rozhraní (přes `/admin`) je zpřístupněno pro vizuální CRUD operace. Jelikož samotné backend API prozatím nedisponuje plnohodnotným podepsaným JWT tokenem, login je řešen asynchronně a je uložen pro relaci přímo pod záštitou robustního *Client Component* loginu do prohlížeče (`sessionStorage`). 

**Běžní uživatelé** se přihlašují (kvůli trackingu lístků v `Tickets`) svým ověřeným e-mailem v rámci backend databáze přes routu `/login`.

---

## ⚙️ Architektura a Renderování: Kde a proč je používáno

Aplikace maximálně těží z nativních funkcionalit Next.js pro zvýšení rychlosti načítání a drastické redukování zátěže dotazů na vzdálené backend API s omezeným limit ratingem.

* **SSG (Static Site Generation):** 
  Využito na domovské stránce (`/`). Stránka je bez parametru generována čistě staticky a dodává rychlý přehled s Dashboard rychlostními boxy (počet osob/počet lístků/etc.).
  
* **ISR (Incremental Static Regeneration):**
  Použito na veřejných přehledových seznamech (stránky `/devices`, `/persons`, `/rooms` a `/tickets`). Data z API jsou stažena a chována ve statické vyrovnávací paměti (`cache`) pomocí nového tagovaného frameworku (Next 15+). Next.js tato data neustále zobrazuje staticky dalším návštěvníkům, než obdrží povel k jejich refrešnutí. Šetří tím signifikantně počet HTTP odeslání.
  
* **SSR (Server-Side Rendering):** 
  Vyhrazeno především pro **Administraci** (`/admin/*`) a funkce vyhledávání. Veškeré listování skrze vyhledávací pole je vyhodnocováno na serveru za podpory URL parametrů (`?query=`), zajišťující dynamický a aktuální výsledek na základě vstupu z Client stromu.

* **Client Components:**
  Ponechány výhradně a pro komponenty přímo vyžadující prohlížeč (Hooks): Toasty/Alerts, Navbar, Tlačítka a Formuláře (vytvářecí `input`, stavy `useState`).

---

## ⚡ Implementace Caching a Tags API

Next caching technologie výrazně napomohla stabilizaci aplikace:

* **`use cache` a `cacheLife()`**: Tyto nové směrnice jsou implementovány ve všech serverových fetch wrapperech (uvnitř *`src/utils/services.ts`*). Snižují tlak na backend automatickým cachováním pro `getPersons()`, `getRooms()`, `getDevices()`, a `getTickets()`. Paměť má garantovanou `cacheLife("hours")`.

* **`cacheTag` a `revalidateTag()`**: Jednotlivé API "fetch" fce obdržely unikátní značky (např. `cacheTag("persons")`). Když administrátor úspěšně vyhotoví CRUD operaci (vytvoření nového ticketu nebo zařízení) přes soubor *`src/app/admin/actions.ts`*, systém spustí terčovaný `revalidateTag()`. Ten zajistí přesné a okamžité pročistění cache pouze a exkluzivně pro poškozenou routu, přičemž veřejné listingy se re-generují z API bez nutnosti mačkat F5.

---

## 🔍 SEO & Metadata
Projekt pro nejlepší indexování a dohledatelnost automaticky tvoří XML sitemapy a poskytuje detailní instrukce web crawlerům:
* Zázemí v `src/app/sitemap.ts` dynamicky generuje konfigurované URL struktury.
* Zázemí v `src/app/robots.ts` navádí roboty s povolením pro přístup všude jinde než do interní složky `/admin`.
