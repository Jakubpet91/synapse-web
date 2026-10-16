# Synapse Web | Oficiální prezentační a marketingový web

Prezentační a marketingový web pro klinickou aplikaci **Synapse Clinical Transcribe** – nástroj pro verbatim 1:1 přepis sezení, strukturovanou AI syntézu (SOAP, BIRP, KBT), Zero-Knowledge šifrování na zařízení lékaře (AES-256-GCM) a multi-locale PII filtry.

---

## 🌐 Odkazy na prostředí aplikace Synapse

- **Živá produkční aplikace:** [https://clinical-transcribe.onrender.com/](https://clinical-transcribe.onrender.com/)
- **Testovací prostředí (stage):** [https://clinical-transcribe-test.onrender.com/](https://clinical-transcribe-test.onrender.com/)

---

## ⚡ Klíčové prvky prezentačního webu

1. **Interaktivní klinický simulátor (Live Demo)**:
   - Výběr ze 3 reálných klinických případů (KBT panická porucha, psychiatrická kontrola s titrací SSRI, psychoterapie syndromu vyhoření).
   - Živá vizualizace zvukové stopy se simulací přehrávání audia.
   - Doslovný přepis mluveného slova s **přepínačem PII neutralizace** (ukazuje náhradu rodných čísel, adres a jmen placeholdery před odesláním do AI).
   - Okamžité přepínání výstupních klinických formátů: **SOAP**, **BIRP** a **Lékařská zpráva**.

2. **Kalkulačka návratnosti a úspory času (ROI Calculator)**:
   - 3 posuvníky: Počet sezení týdně, současná doba manuálního zápisu, terapeutická hodinová sazba.
   - Dynamický výpočet: Ušetřený čas v hodinách za týden a měsíc, ekvivalent v pracovních dnech a finanční hodnota získaného času.

3. **Průvodce pracovním postupem (Workflow Stepper)**:
   - 4 interaktivní kroky: Diktát na mobilu &rarr; Real-time přenos přes WebSockets &rarr; Zero-Knowledge AI syntéza &rarr; Export do Wordu (.DOCX) a ambulantních programů (PC DOKTOR, SmartMedix).
   - Dynamická změna reálných snímků obrazovky.

4. **Reálná fotogalerie rozhraní aplikace (Lightbox)**:
   - Autentické snímky z produkčního a testovacího prostředí:
     * Pracovní plocha a kartotéka v tmavém režimu
     * AI syntéza sezení
     * Split-View zobrazení
     * Trvalý kontext klienta (anamnézy, medikace, cíle terapie)
     * Dávkové zpracování (Batch Processing)
     * Anonymní telemetrie efektivity

5. **Právní garance a bezpečnost (čl. 9 & čl. 28 GDPR)**:
   - Detailní vysvětlení klientského šifrování AES-256-GCM (Zero-Knowledge).
   - Elektronická Zpracovatelská smlouva (DPA) dostupná přímo v aplikaci.
   - Smluvní záruka nulového trénování AI modelů (Zero-Data-Retention).

6. **Férový ceník s přepínačem roční/měsíční platby**:
   - FREE plán (30 sezení měsíčně zdarma).
   - PRO Therapist (490 Kč měsíčně / 390 Kč při roční platbě).
   - Klinika a týmy (individuální nabídka).

7. **Interaktivní FAQ (Často kladené otázky)**:
   - Plynulý akordeon s odpověďmi na klíčové otázky lékařů a psychoterapeutů.

8. **Přepínač tmavého a světlého režimu (Dark / Light Mode)** s ukládáním do `localStorage`.

---

## 🚀 Spuštění a vývoj

Projekt je navržen tak, aby fungoval jak s moderním bundlerem **Vite**, tak i jako **čistý statický web bez nutnosti kompilace** (přímým otevřením `index.html` v prohlížeči).

### Varianta A: Spuštění přes Vite (Doporučeno)

```bash
# 1. Instalace závislostí
npm install

# 2. Spuštění lokálního vývojového serveru
npm run dev

# 3. Produkční build (vygeneruje složku dist/)
npm run build

# 4. Náhled produkčního buildu
npm run preview
```

### Varianta B: Statické otevření

Jednoduše otevřete soubor `index.html` v libovolném moderním webovém prohlížeči.

---

## 🌐 Nasazení na web (Deployment)

Díky statické architektuře lze web nasadit na libovolnou platformu během několika sekund:

- **Cloudflare Pages**: Zvolte repozitář `synapse-web`, build command: `npm run build`, output directory: `dist`.
- **Vercel**: Framework preset: `Vite`, output directory: `dist`.
- **Netlify**: Publish directory: `dist`.
- **GitHub Pages**: V nastavení repozitáře aktivujte GitHub Pages ze složky `/` nebo z větve `gh-pages`.

---

## 🎨 Design systém a typografie

- **Barevná paleta**:
  - Medical Sage (`#2f473c`, `#38594b`, `#ccdcd3`, `#f4f7f5`)
  - Warm Sand (`#fcfbf9`, `#f7f5f0`, `#eee9df`)
  - Dark Slate (`#0c1412`, `#131d1a`, `#152420`)
  - Emerald Verification (`#10b981`)
  - Amber Accent (`#f59e0b`)
- **Písma**:
  - Nadpisy: `Newsreader` (elegantní redakční medicínský patkový font)
  - Text a UI prvky: `Plus Jakarta Sans` (čistý a vysoce čitelný bezpatkový font)
  - Kód a PII anonymizace: `JetBrains Mono`

---

## 📄 Licence

Tento projekt je chráněn licencí ISC. Všechna práva vyhrazena pro Synapse Clinical Transcribe.
