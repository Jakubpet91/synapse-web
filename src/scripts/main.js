/**
 * @file main.js
 * @description Interactive functionality for Synapse Presentation Website.
 * Features: Audio & Transcribe Simulator, ROI Calculator, Workflow Walkthrough,
 * Pricing Switcher, FAQ Accordion, Screenshot Lightbox, and Theme Toggle.
 */

// ==========================================
// 1. THEME TOGGLE (Dark / Light Mode)
// ==========================================
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
      localStorage.setItem('synapse_web_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
      localStorage.setItem('synapse_web_theme', 'light');
    }
  }

  const saved = localStorage.getItem('synapse_web_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  applyTheme(isDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentDark = document.documentElement.classList.contains('dark');
      applyTheme(!currentDark);
    });
  }
}

// ==========================================
// 2. MOBILE NAVIGATION DRAWER
// ==========================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggleBtn');
  const closeBtn = document.getElementById('mobileNavCloseBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = drawer?.querySelectorAll('a');

  function openNav() {
    drawer?.classList.remove('translate-x-full');
    backdrop?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeNav() {
    drawer?.classList.add('translate-x-full');
    backdrop?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  backdrop?.addEventListener('click', closeNav);

  navLinks?.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

// ==========================================
// 3. CLINICAL DEMO & TRANSCRIBE SIMULATOR
// ==========================================
const CLINICAL_CASES = {
  case1: {
    title: 'KBT – Panická porucha s agorafobií',
    patient: 'Martin D. (42 let)',
    diagnosis: 'F41.0 Panická porucha, F40.00 Agorafobie bez panické poruchy',
    audioDuration: '03:14',
    rawTranscript: `Dobrý den pane doktore, přicházím na kontrolu po čtrnácti dnech. Ty ataky se objevily znova hlavně v úterý, když jsem stál v tramvaji číslo 9 na Andělu. Začalo mi bušit srdce, pocit dušení, musel jsem hned na další zastávce vystoupit. Bydlím stále na adrese Úvoz 24 v Brně a včera jsem si musel vzít Lexaurin půl tablety. Zkoušel jsem to dechové cvičení čtyři z doby nádechu a sedm zadržení dechu, co jsme trénovali minule, a to mi docela pomohlo stáhnout tu paniku z devítky na pětku. Moje rodné číslo je 820614/1234, pokud to potřebujete do té zprávy pro praktika MUDr. Černého.`,
    redactedTranscript: `Dobrý den pane doktore, přicházím na kontrolu po čtrnácti dnech. Ty ataky se objevily znova hlavně v úterý, když jsem stál v tramvaji číslo 9 na <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[LOKALITA: Zastávka MHD]</span>. Začalo mi bušit srdce, pocit dušení, musel jsem hned na další zastávce vystoupit. Bydlím stále na adrese <span class="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-rose-300 dark:border-rose-800">[BYDLIŠTĚ / ADRESA]</span> a včera jsem si musel vzít anxiolytikum půl tablety. Zkoušel jsem to dechové cvičení 4-7-8, co jsme trénovali minule, a to mi pomohlo stáhnout paniku z 9/10 na 5/10. Moje rodné číslo je <span class="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-emerald-300 dark:border-emerald-800">[RODNÉ ČÍSLO: MOD11 OK]</span>, pokud to potřebujete do zprávy pro <span class="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-indigo-300 dark:border-indigo-800">[OŠETŘUJÍCÍ LÉKAŘ]</span>.`,
    soap: `### S (Subjektivní údaje)
- Klient referuje recidivu panické ataky v MHD (Anděl, tramvaj č. 9) s typickou vegetativní symptomatologií (tachykardie, dyspnoe, anticipační tíseň).
- Pozitivní odezva na KBT nácvik: dechová kotva (technika 4-7-8) vedla k subjektivnímu poklesu distresu ze škály 9/10 na 5/10.
- Jednorázová farmakologická intervence: anxiolytikum (Lexaurin 1,5 mg p.o.).

### O (Objektivní nález)
- Klient lucidní, plně orientovaný všemi směry, spolupracující.
- Euthymní ladění s mírnou anticipační tenzí při expozici MHD. Myšlení koherentní, bez poruch vnímání.

### A (Klinické zhodnocení)
- F41.0 Panická porucha s lehkou agorafobickou složkou v rekonvalescenci. Zřetelný náhled a efektivní osvojení seberegulačních kognitivně-behaviorálních technik.

### P (Terapeutický plán)
1. Pokračovat v systematické in vivo desenzibilizaci (jízda MHD mimo špičku s doprovodem).
2. Nácvik kognitivní restrukturalizace katastrofických myšlenek.
3. Kontrolní KBT sezení za 14 dní.`,
    birp: `### B (Behavior - Chování a symptomy)
- Klient popisuje epizodu akutní paniky v tramvaji. Projevila se tachykardie, dechová tíseň a nutkání k úniku (vystoupení na nejbližší zastávce).

### I (Intervention - Intervence terapeuta)
- Nácvik progresivní svalové relaxace a dechové stabilizace 4-7-8.
- Validace prožívání, edukace o fyziologické podstatě panické reakce (sympatikus vs. parasympatikus).

### R (Response - Reakce klienta)
- Klient demonstroval správné provedení dechové techniky v ordinaci, deklaruje pokles úzkostné škály na 5/10.

### P (Plan - Další postup)
- Plánována odstupňovaná expozice cestování MHD, vedení záznamového KBT deníku. Kontrola za 2 týdny.`,
    report: `**KLINICKÁ KONTROLNÍ ZPRÁVA**
**Diagnóza:** F41.0 Panická porucha, F40.00 Agorafobie

**Anamnéza a nynější stav:**
Klient přichází na pravidelnou kontrolu. V uplynulém období zaznamenána ojedinělá exacerbace úzkostné symptomatologie v dopravním prostředku, zvládnuta s využitím nácvikových dechových technik s poklesem tenze z 9/10 na 5/10. Využita jednorázová dávka anxiolytika.

**Závěr a doporučení:**
Stav kompenzován, doporučena pokračující psychoterapeutická péče KBT směru. Schopen běžné denní a pracovní zátěže.`
  },
  case2: {
    title: 'Psychiatrie – Depresivní epizoda, titrace SSRI',
    patient: 'Jana V. (35 let)',
    diagnosis: 'F32.1 Středně těžká depresivní epizoda',
    audioDuration: '02:40',
    rawTranscript: `Dobrý den paní doktorko, beru ten Sertralin padesátku už třetí týden. Ranní nevolnosti už naštěstí přešly a cítím, že ten nejhorší kámen na hrudi povolil. Pořád se ale budím kolem čtvrté ráno a nemůžu zabrat, myšlenky na práci v bance mě děsí. Chuť k jídlu se trochu zlepšila, zhubla jsem od minule jen kilo. Bydlíme pořád v Praze 6 na Břevnově. Ráda bych věděla, jestli nezvedneme dávku, jak jsme minule říkali, aby mi to pomohlo i s tou ranní energií.`,
    redactedTranscript: `Dobrý den paní doktorko, beru ten Sertralin 50 mg p.o. už třetí týden. Ranní nevolnosti odezněly a pacientka referuje částečnou úlevu od tíže na hrudi. Přetrvává insomnie s časným ranním probouzením kolem 4:00 s ruminacemi ohledně pracovního vytížení v <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[SEKTOR: Finanční služby]</span>. Chuť k jídlu stabilizována, váhový úbytek mírný. Bydliště v <span class="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-rose-300 dark:border-rose-800">[LOKALITA: Městská část]</span>. Zvažována titrace farmakoterapie pro posílení ranní psychomotoriky.`,
    soap: `### S (Subjektivní údaje)
- Pacientka referuje nástup terapeutického účinku Sertralinu (50 mg 1-0-0), gastrointestinální iniciální obtíže odezněly.
- Dominují reziduální spánkové obtíže (předčasná ranní probuzení se sklonem k ruminaci).
- Chuť k jídlu uspokojivá, suicidální úvahy neguje.

### O (Objektivní nález)
- Klidná, spolupracující, psychomotorické tempo mírně zbrzděné, řeč tichá, koherentní.
- Afektivita oploštělá, afektivní rezonance však přítomna. Intelekt v normě.

### A (Klinické zhodnocení)
- F32.1 Středně těžká depresivní epizoda, příznivý parciální nástup odezvy na SSRI medikaci.

### P (Terapeutický plán)
1. Titrace Sertralin na 100 mg 1-0-0 od zítřejšího dne.
2. Krátkodobě pro úpravu spánkové architektury Triticco AC 75 mg 0-0-1/3 až 2/3 tbl.
3. Kontrola v ambulanci za 3 týdny.`,
    birp: `### B (Behavior)
- Pacientka přichází včas, upravená. Znatelné uvolnění oproti iniciálnímu vyšetření, přetrvává ranní hypoaktivita a úzkost z pracovního návratu.

### I (Intervention)
- Edukace o dynamice působení SSRI a časovém okně plného efektu (4–6 týdnů). Doporučení zásad spánkové hygieny.

### R (Response)
- Pacientka souhlasí s navýšením dávky antidepresiva a vyjadřuje úlevu z odeznění somatických nežádoucích účinků.

### P (Plan)
- Navýšení Sertralinu na 100 mg ráno, přidání trazodonu na noc. Kontrola za 21 dní.`,
    report: `**LÉKAŘSKÁ ZPRÁVA – KONTROLNÍ VYŠETŘENÍ**
**Dg:** F32.1 Depressio gradus mediocris

Pacientka po 3 týdnech na terapii Sertralin 50 mg p.o. Stav s patrnou iniciální pozitivní dynamikou, odeznívání gastrointestinálních nežádoucích účinků. Reziduálně insomnie terminálního typu.
Doporučena titrace Sertralin na 100 mg ráno, přidán Trazodon 50-75 mg na noc. Kontrola za 3 týdny.`
  },
  case3: {
    title: 'Psychoterapie – Syndrom vyhoření a asertivita',
    patient: 'Petr K. (38 let)',
    diagnosis: 'Z73.0 Syndrom vyhoření, F43.2 Porucha přizpůsobení',
    audioDuration: '02:15',
    rawTranscript: `Minulý týden byl v práci opět šílený. Šéf mi hodil na stůl projekt za kolegu a já jsem zase nedokázal říct ne. Přišel jsem domů v devět večer, byl jsem protivný na manželku i děti a pak jsem do dvou do rána zíral do stropu. Uvědomil jsem si, jak jste říkal, že ten pocit zodpovědnosti za všechny ostatní mě úplně ničí. Chci si nastavit jasné hranice a naučit se říkat: tohle už je nad rámec mé kapacity.`,
    redactedTranscript: `Minulý týden byl v práci opět náročný. Nadřízený delegoval projekt nepřítomného kolegy na <span class="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-indigo-300 dark:border-indigo-800">[ROLE: Klient]</span>, který nedokázal vymezit asertivní hranici. Následovaly pozdní návraty, tenze v rodinném prostředí s <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[RODINNÍ PŘÍSLUŠNÍCI]</span> a insomnie. Klient si plně uvědomuje maladaptivní schéma nadměrné zodpovědnosti a definuje cíl: nácvik asertivního odmítnutí při překročení reálné pracovní kapacity.`,
    soap: `### S (Subjektivní údaje)
- Klient líčí selhání v asertivní komunikaci vůči nadřízenému. Reakce v podobě chronické únavy, vnitřního vzteku ventilovaného v primární rodině a sekundární nespavosti.
- Vyjádřena silná motivace k nácviku asertivního vymezení hranic.

### O (Objektivní nález)
- Klient v dobrém kontaktu, orientovaný, přítomna zvýšená tenze v obličejové mimice a postuře. Schopnost sebereflexe a propojení tělesných signálů se stresem.

### A (Klinické zhodnocení)
- Z73.0 Syndrom vyhoření v terénu anankastických rysů osobnosti (nadměrný pocit odpovědnosti, perfekcionismus).

### P (Terapeutický plán)
1. Hraní rolí (role-play): modelové odmítnutí neadekvátního pracovního požadavku.
2. Identifikace automatických negativních myšlenek typu „když odmítnu, zklamu“.
3. Pokračování v individuální psychoterapii za 7 dní.`,
    birp: `### B (Behavior)
- Přetížení, submisivní chování vůči nadřízenému, následná podrážděnost v domácím prostředí a spánková deprivace.

### I (Intervention)
- Kognitivní restrukturalizace schématu odpovědnosti, nácvik asertivního „já-sdělení“ a techniky přeskakující gramodesky.

### R (Response)
- Klient v nácviku dokázal zformulovat pevné, ale neagresivní odmítnutí úkolu. Zaznamenána úleva a posílení pocitu kompetence.

### P (Plan)
- Aplikace natrénované věty v reálné pracovní situaci do příštího sezení. Kontrola za týden.`,
    report: `**ZPRÁVA Z PSYCHOTERAPEUTICKÉHO SEZENÍ**
**Téma:** Z73.0 Syndrom vyhoření, nácvik asertivity
Práce zaměřena na maladaptivní vzorce nadměrné odpovědnosti. Proveden nácvik asertivních technik pro vymezení hranic vůči pracovnímu přetížení. Klient aktivně spolupracuje s výbornou prognózou pro stabilizaci životního balancu.`
  }
};

let currentCaseKey = 'case1';
let currentFormat = 'soap';
let isPiiRedacted = true;
let isAudioPlaying = false;
let audioTimer = null;
let currentSeconds = 0;

function initClinicalSimulator() {
  const caseSelectBtns = document.querySelectorAll('.simulator-case-btn');
  const formatBtns = document.querySelectorAll('.simulator-format-btn');
  const playBtn = document.getElementById('simulatorPlayBtn');
  const playIcon = document.getElementById('simulatorPlayIcon');
  const pauseIcon = document.getElementById('simulatorPauseIcon');
  const timerDisplay = document.getElementById('simulatorTimer');
  const waveBars = document.querySelectorAll('.wave-bar');
  const piiToggle = document.getElementById('simulatorPiiToggle');
  const rawTextContainer = document.getElementById('simulatorRawText');
  const synthTextContainer = document.getElementById('simulatorSynthText');
  const caseTitle = document.getElementById('simulatorCaseTitle');
  const caseMeta = document.getElementById('simulatorCaseMeta');

  function renderCase() {
    const c = CLINICAL_CASES[currentCaseKey];
    if (!c) return;

    if (caseTitle) caseTitle.textContent = c.title;
    if (caseMeta) caseMeta.textContent = `${c.patient} | ${c.diagnosis} | Délka: ${c.audioDuration}`;

    // Render Raw or PII Sanitized Text
    if (rawTextContainer) {
      rawTextContainer.innerHTML = isPiiRedacted ? c.redactedTranscript : c.rawTranscript;
    }

    // Render Selected Synthesis Format
    if (synthTextContainer) {
      let content = c.soap;
      if (currentFormat === 'birp') content = c.birp;
      if (currentFormat === 'report') content = c.report;
      synthTextContainer.innerHTML = content.replace(/\n/g, '<br>');
    }
  }

  // Switch Case
  caseSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      caseSelectBtns.forEach(b => {
        b.classList.remove('bg-sage-800', 'text-white', 'dark:bg-emerald-700');
        b.classList.add('bg-white', 'text-slate-700', 'dark:bg-[#141f1c]', 'dark:text-slate-300');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'dark:bg-[#141f1c]', 'dark:text-slate-300');
      btn.classList.add('bg-sage-800', 'text-white', 'dark:bg-emerald-700');

      currentCaseKey = btn.getAttribute('data-case') || 'case1';
      stopAudio();
      renderCase();
    });
  });

  // Switch Format
  formatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formatBtns.forEach(b => {
        b.classList.remove('border-sage-800', 'bg-sage-50', 'text-sage-900', 'dark:bg-emerald-950/40', 'dark:border-emerald-500', 'dark:text-emerald-200');
        b.classList.add('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      });
      btn.classList.remove('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      btn.classList.add('border-sage-800', 'bg-sage-50', 'text-sage-900', 'dark:bg-emerald-950/40', 'dark:border-emerald-500', 'dark:text-emerald-200');

      currentFormat = btn.getAttribute('data-format') || 'soap';
      renderCase();
    });
  });

  // Toggle PII
  piiToggle?.addEventListener('change', (e) => {
    isPiiRedacted = e.target.checked;
    renderCase();
  });

  // Play / Pause Simulation
  function startAudio() {
    isAudioPlaying = true;
    playIcon?.classList.add('hidden');
    pauseIcon?.classList.remove('hidden');
    waveBars.forEach(b => b.classList.add('active'));

    audioTimer = setInterval(() => {
      currentSeconds++;
      const m = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
      const s = (currentSeconds % 60).toString().padStart(2, '0');
      if (timerDisplay) timerDisplay.textContent = `${m}:${s}`;
    }, 1000);
  }

  function stopAudio() {
    isAudioPlaying = false;
    playIcon?.classList.remove('hidden');
    pauseIcon?.classList.add('hidden');
    waveBars.forEach(b => b.classList.remove('active'));
    if (audioTimer) clearInterval(audioTimer);
    currentSeconds = 0;
    if (timerDisplay) timerDisplay.textContent = '00:00';
  }

  playBtn?.addEventListener('click', () => {
    if (isAudioPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  });

  renderCase();
}

// ==========================================
// 4. INTERACTIVE ROI & TIME SAVINGS CALCULATOR
// ==========================================
function initRoiCalculator() {
  const clientsSlider = document.getElementById('calcClientsSlider');
  const timeSlider = document.getElementById('calcTimeSlider');
  const rateSlider = document.getElementById('calcRateSlider');

  const clientsVal = document.getElementById('calcClientsVal');
  const timeVal = document.getElementById('calcTimeVal');
  const rateVal = document.getElementById('calcRateVal');

  const weeklyHoursOut = document.getElementById('calcWeeklyHoursOut');
  const monthlyHoursOut = document.getElementById('calcMonthlyHoursOut');
  const monthlyDaysOut = document.getElementById('calcMonthlyDaysOut');
  const monthlySavingsOut = document.getElementById('calcMonthlySavingsOut');

  function calculate() {
    const clients = parseInt(clientsSlider?.value || '20', 10);
    const manualMinutes = parseInt(timeSlider?.value || '20', 10);
    const hourlyRate = parseInt(rateSlider?.value || '1400', 10);

    if (clientsVal) clientsVal.textContent = `${clients} sezení`;
    if (timeVal) timeVal.textContent = `${manualMinutes} min`;
    if (rateVal) rateVal.textContent = `${hourlyRate.toLocaleString('cs-CZ')} Kč/hod`;

    // Synapse reduces documentation time by 75% (e.g. 20 min -> 5 min, saving 15 min per session)
    const savedMinutesPerSession = manualMinutes * 0.75;
    const totalSavedMinutesWeek = clients * savedMinutesPerSession;
    const weeklyHours = (totalSavedMinutesWeek / 60);
    const monthlyHours = weeklyHours * 4.33;
    const monthlyDays = (monthlyHours / 8);
    const monthlyMoney = monthlyHours * hourlyRate;

    if (weeklyHoursOut) weeklyHoursOut.textContent = `${weeklyHours.toFixed(1)} hod`;
    if (monthlyHoursOut) monthlyHoursOut.textContent = `${Math.round(monthlyHours)} hodin`;
    if (monthlyDaysOut) monthlyDaysOut.textContent = `${monthlyDays.toFixed(1)} prac. dny`;
    if (monthlySavingsOut) monthlySavingsOut.textContent = `${Math.round(monthlyMoney).toLocaleString('cs-CZ')} Kč`;
  }

  clientsSlider?.addEventListener('input', calculate);
  timeSlider?.addEventListener('input', calculate);
  rateSlider?.addEventListener('input', calculate);

  calculate();
}

// ==========================================
// 5. WORKFLOW STEPPER (Mobile -> Desktop -> AI -> Export)
// ==========================================
function initWorkflowStepper() {
  const stepBtns = document.querySelectorAll('.workflow-step-btn');
  const stepImage = document.getElementById('workflowImage');
  const stepTitle = document.getElementById('workflowTitle');
  const stepDesc = document.getElementById('workflowDesc');
  const stepBadge = document.getElementById('workflowBadge');

  const STEP_DATA = {
    step1: {
      title: '1. Diktát sezení na mobilu v ordinaci',
      desc: 'Lékař nebo terapeut mluví přirozeným tempem do mobilu či tabletu. Aplikace běží jako offline PWA i bez signálu a živě vizualizuje zvukovou stopu. Žádné zdržování klienta.',
      image: '/screenshots/mobile-editor.png',
      badge: 'MOBILNÍ DIKTÁT'
    },
    step2: {
      title: '2. Okamžitý přenos do počítače přes WebSockets',
      desc: 'Jakmile se vrátíte k pracovnímu stolu, text je již v reálném čase přenesen na obrazovce stolního počítače. Žádné posílání e-mailem, žádné kabely, nulová manuální práce.',
      image: '/screenshots/workspace-dark.png',
      badge: 'REAL-TIME CLOUD SYNC'
    },
    step3: {
      title: '3. Pre-Flight PII filtrace a AI syntéza',
      desc: 'Klientský engine provede deterministickou kontrolu PII (rodná čísla Modulo 11, PESEL, adresy, banky) a odešle anonymizovaný text do AI. Zápis je zformátován dle zvoleného schématu (SOAP, BIRP).',
      image: '/screenshots/ai-synthesis.png',
      badge: 'ZERO-KNOWLEDGE AI'
    },
    step4: {
      title: '4. Export do Wordu (.docx) či ambulantního softwaru',
      desc: 'Jedním klikem exportujete čistý .docx soubor s hlavičkou ordinace a číslem licence ČLK, nebo obsah vložíte přímo do vašeho ambulantního softwaru (PC DOKTOR, SmartMedix apod.).',
      image: '/screenshots/split-view.png',
      badge: 'EXPORT & ARCHIV'
    }
  };

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stepBtns.forEach(b => {
        b.classList.remove('border-sage-800', 'bg-sage-50', 'text-sage-900', 'dark:bg-emerald-950/40', 'dark:border-emerald-500', 'dark:text-emerald-200');
        b.classList.add('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      });
      btn.classList.remove('border-slate-200', 'dark:border-slate-800', 'text-slate-600', 'dark:text-slate-400');
      btn.classList.add('border-sage-800', 'bg-sage-50', 'text-sage-900', 'dark:bg-emerald-950/40', 'dark:border-emerald-500', 'dark:text-emerald-200');

      const stepKey = btn.getAttribute('data-step') || 'step1';
      const data = STEP_DATA[stepKey];
      if (data) {
        if (stepTitle) stepTitle.textContent = data.title;
        if (stepDesc) stepDesc.textContent = data.desc;
        if (stepBadge) stepBadge.textContent = data.badge;
        if (stepImage) {
          stepImage.style.opacity = '0';
          setTimeout(() => {
            stepImage.setAttribute('src', data.image);
            stepImage.style.opacity = '1';
          }, 150);
        }
      }
    });
  });
}

// ==========================================
// 6. PRICING BILLING SWITCHER (Monthly / Yearly)
// ==========================================
function initPricingSwitcher() {
  const billingToggle = document.getElementById('billingPeriodToggle');
  const proPriceEl = document.getElementById('proPriceAmount');
  const proPeriodEl = document.getElementById('proPricePeriod');
  const proBilledEl = document.getElementById('proBilledNote');

  billingToggle?.addEventListener('change', (e) => {
    const isYearly = e.target.checked;
    if (isYearly) {
      if (proPriceEl) proPriceEl.textContent = '390 Kč';
      if (proPeriodEl) proPeriodEl.textContent = '/ měsíc';
      if (proBilledEl) proBilledEl.textContent = 'Účtováno ročně (4 680 Kč / rok – ušetříte 1 200 Kč)';
    } else {
      if (proPriceEl) proPriceEl.textContent = '490 Kč';
      if (proPeriodEl) proPeriodEl.textContent = '/ měsíc';
      if (proBilledEl) proBilledEl.textContent = 'Fakturováno měsíčně bez závazků, zrušení kdykoliv';
    }
  });
}

// ==========================================
// 7. FAQ ACCORDION
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const chevron = item.querySelector('.faq-chevron');

    trigger?.addEventListener('click', () => {
      const isExpanded = content?.classList.contains('hidden') === false;

      // Close all other FAQs
      faqItems.forEach(other => {
        other.querySelector('.faq-content')?.classList.add('hidden');
        other.querySelector('.faq-chevron')?.classList.remove('rotate-180');
      });

      if (!isExpanded) {
        content?.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });
  });
}

// ==========================================
// 8. SCREENSHOT LIGHTBOX
// ==========================================
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  function openLightbox(src, title) {
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Snímek aplikace Synapse';
    lightboxModal?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeLightbox() {
    lightboxModal?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-img') || trigger.querySelector('img')?.getAttribute('src');
      const title = trigger.getAttribute('data-title') || trigger.querySelector('img')?.getAttribute('alt');
      if (src) openLightbox(src, title);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal?.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

// ==========================================
// INIT ALL MODULES ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initClinicalSimulator();
  initRoiCalculator();
  initWorkflowStepper();
  initPricingSwitcher();
  initFaqAccordion();
  initLightbox();
});
