# Zhodnocení aktuálního stavu projektu (Detailed Sum-up)

Projekt **Helpdesk Portal (Public + Admin)** je strukturován jako moderní webová aplikace s využitím frameworku **Next.js (App Router) a TypeScriptu**.

## Co již máme připravené a dostupné:
1. **Dokumentace zadání (`context/zadani.md`)**:
   - Definuje základní funkční a technické požadavky (Next.js, Server Components, minimalizace fetch requestů pomocí cachování, SSG/ISR pro public část, CRUD pro admin část).
   - Odkazuje na API (`https://zmrd.ondrejpetera.cz/api/v1`) a zdůrazňuje nutnost ochrany API klíče a limitů (rate limiting).
2. **UI a Design parametry (`context/stitch_helpdesk_inventory_portal/`)**:
   - Bubbly iOS Modern: specifikace barev (Dark blue, pink, bílé povrchy), typografie (Plus Jakarta Sans) a celkového „bubbly/squircle" vjemu s měkkými stíny a zaoblením.
   - K dispozici jsou HTML a grafické podklady pro *Helpdesk Dashboard* a *Inventory List Devices*.
3. **Základní aplikační struktura (`src/`)**:
   - Jsou aktivní prvotní page routy pro `person` a `tickets`.
   - V `src/components/` jsou složky pro komponenty jako `navbar`, `person` a obecné `ui` stavebnicové bloky.
   - V `src/types/` existují počáteční definice jako `error.types.ts`, `person.types.ts`, `person-actions.types.ts`.
4. **Technologický stak a spuštění**:
   - Nastavený ekosystém kolem balíčkového manažeru (zřejmě pnpm), nastavení typescriptu (`tsconfig.json`), linting pravidla. Projekt se dál staví na Next.js 15+ a Reactu s `globals.css` a Tailwindem.

---

# Step-by-Step Implementation Plan

Tento plán popisuje logickou posloupnost při dalším vývoji projektu. Celá stavba respektuje existující strukturu a soustředí se na postupné splnění zadaných úkolů bez přetrhání stávající architektury.

## Krok 1: Inicializace Design Systému a UI Základů
- **Cíl**: Zahrnout specifikaci *Bubbly iOS Modern* napříč aplikací.
- **Akce**:
  - Přizpůsobit config tailwindu (ošetřit barvy z `DESIGN.md`, vytvořit custom shadings, přidat rodinu písma *Plus Jakarta Sans* a rounded utility class odpovídající *squircle* formám).
  - Převést makety z HTML do znovupoužitelných `src/components/ui/` React komponent za využití Server a Client Components logiky s ohledem na design stíny a mezery.
  - Vytvořit hlavní Layout (vč. plovoucího navbaru).

## Krok 2: Backendová integrace - API Wrapper a Datové Typy
- **Cíl**: Zabezpečit obslužnou funkčnost pro API komunikaci se Swagger endpointy.
- **Akce**:
  - Doplnit veškeré TypeScriptové typy i DTOs do složky `src/types/` (v případě nejasností u Swagger modelu API *zastavím a vyžádám chybějící podklady od uživatele*).
  - Vytvořit robustní `fetchWrapper` v `src/utils/` poskytující základní handling HTTP odpovědí, timeouty a načítání autorizačního klíče bezpečně uloženého v `.env`.

## Krok 3: Caching a implementace „Vyhledávacích funkcí"
- **Cíl**: Minimalizace request rate-limitů podle pokynů v zadání.
- **Akce**:
  - Využití Next.js Cache funkcionalit: Naimplementovat wrapper metody z `use cache`, nastavit parametry `cacheLife` (zvážit časové platnosti) a označit požadavky specifickým `cacheTag` (pro např. `persons`, `tickets`).
  - Nastavení filtru pro vyhledávání, kde Client Component (vyhledávací pole) updatuje URL Params (při potvrzení eventem např. Enter, NE při každém písmenu) a ten propíše re-render Server Component, která data fetchuje s parametry.

## Krok 4: Zpracování Veřejné a ISR sekce (Read-only)
- **Cíl**: Rozhodit frontové moduly pro čtení ze systému.
- **Akce**:
  - Navrhnout Dashboard/Landing Page jako plně statickou aplikaci (SSG s definovaným intervalem `revalidate` / ISR), kde poběží agregovaná data (počty entit).
  - Doplnit přehledové listingové views pro `/persons`, `/rooms`, `/devices` a `/tickets`. Pokud je záznamů přes limit, implementovat elementární stránkování (bonus ze zadání).

## Krok 5: Administrace a Autorizační mechanismy
- **Cíl**: Oddělení veřejné a chráněné zóny.
- **Akce**:
  - Implementovat jednoduchou `fake` login routu `/admin` pro přístup.
  - Vytvořit vnořené layouty nebo speciální guard mechanismus (např. middleware) přesměrovávají nepřihlášeného usera do veřejné sekce.

## Krok 6: CRUD formuláře a `revalidateTag`
- **Cíl**: Možnost vytvářet a modifikovat entity přímo v systému.
- **Akce**:
  - Vybudovat znovupoužitelné editační Client-Components pod hlavičkou admin-modulu pro tvoření / editaci `Osob`, `Místností`, `Zařízení` a `Ticketů`.
  - Formuláře musí podporovat nativní validaci, zachytávat API Errors (Zod validation a server actions).
  - Důležité propojení funkcionality server-side mutací: Po úspěšném odeslání CREATE / UPDATE / DELETE bude zavolán `revalidateTag('persons')` / `tickets` atd. pro okamžitý drop cashované verze a překreslení dat v systému.

## Krok 7: Závěrečný Polish, SEO a Optimalizace
- **Cíl**: Příprava k odevzdání a produkční spuštění.
- **Akce**:
  - Doplnění Loading / Skeletových komponent pro čekání na Server Component fetch.
  - Tvorba čistých `error.tsx` stran na míru.
  - Údržba metadat (`layout.tsx`), vytvoření generických SEO configů jako `robots.txt` a automatické sitemapy.
  - Finální úprava README souboru specifikovanými odstavci z požadavků (kde SSG vs SSR, use cache atd.).

> **Poznámka pro AI agenta a vývojáře**: Jakmile v průběhu některého kroku narazíme na bod týkajících se přesné adresace Swagger models (JSON data struktura pro zařízení atd.), vyzveme uživatele k nahrání API documentace.
