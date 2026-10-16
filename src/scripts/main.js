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
    title: 'KBT â€“ PanickĂˇ porucha s agorafobiĂ­',
    patient: 'Martin D. (42 let)',
    diagnosis: 'F41.0 PanickĂˇ porucha, F40.00 Agorafobie bez panickĂ© poruchy',
    audioDuration: '03:14',
    rawTranscript: `DobrĂ˝ den pane doktore, pĹ™ichĂˇzĂ­m na kontrolu po ÄŤtrnĂˇcti dnech. Ty ataky se objevily znova hlavnÄ› v ĂşterĂ˝, kdyĹľ jsem stĂˇl v tramvaji ÄŤĂ­slo 9 na AndÄ›lu. ZaÄŤalo mi buĹˇit srdce, pocit duĹˇenĂ­, musel jsem hned na dalĹˇĂ­ zastĂˇvce vystoupit. BydlĂ­m stĂˇle na adrese Ăšvoz 24 v BrnÄ› a vÄŤera jsem si musel vzĂ­t Lexaurin pĹŻl tablety. ZkouĹˇel jsem to dechovĂ© cviÄŤenĂ­ ÄŤtyĹ™i z doby nĂˇdechu a sedm zadrĹľenĂ­ dechu, co jsme trĂ©novali minule, a to mi docela pomohlo stĂˇhnout tu paniku z devĂ­tky na pÄ›tku. Moje rodnĂ© ÄŤĂ­slo je 820614/1234, pokud to potĹ™ebujete do tĂ© zprĂˇvy pro praktika MUDr. ÄŚernĂ©ho.`,
    redactedTranscript: `DobrĂ˝ den pane doktore, pĹ™ichĂˇzĂ­m na kontrolu po ÄŤtrnĂˇcti dnech. Ty ataky se objevily znova hlavnÄ› v ĂşterĂ˝, kdyĹľ jsem stĂˇl v tramvaji ÄŤĂ­slo 9 na <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[LOKALITA: ZastĂˇvka MHD]</span>. ZaÄŤalo mi buĹˇit srdce, pocit duĹˇenĂ­, musel jsem hned na dalĹˇĂ­ zastĂˇvce vystoupit. BydlĂ­m stĂˇle na adrese <span class="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-rose-300 dark:border-rose-800">[BYDLIĹ TÄš / ADRESA]</span> a vÄŤera jsem si musel vzĂ­t anxiolytikum pĹŻl tablety. ZkouĹˇel jsem to dechovĂ© cviÄŤenĂ­ 4-7-8, co jsme trĂ©novali minule, a to mi pomohlo stĂˇhnout paniku z 9/10 na 5/10. Moje rodnĂ© ÄŤĂ­slo je <span class="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-emerald-300 dark:border-emerald-800">[RODNĂ‰ ÄŚĂŤSLO: MOD11 OK]</span>, pokud to potĹ™ebujete do zprĂˇvy pro <span class="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-indigo-300 dark:border-indigo-800">[OĹ ETĹUJĂŤCĂŤ LĂ‰KAĹ]</span>.`,
    soap: `### S (SubjektivnĂ­ Ăşdaje)
- Klient referuje recidivu panickĂ© ataky v MHD (AndÄ›l, tramvaj ÄŤ. 9) s typickou vegetativnĂ­ symptomatologiĂ­ (tachykardie, dyspnoe, anticipaÄŤnĂ­ tĂ­seĹ).
- PozitivnĂ­ odezva na KBT nĂˇcvik: dechovĂˇ kotva (technika 4-7-8) vedla k subjektivnĂ­mu poklesu distresu ze ĹˇkĂˇly 9/10 na 5/10.
- JednorĂˇzovĂˇ farmakologickĂˇ intervence: anxiolytikum (Lexaurin 1,5 mg p.o.).

### O (ObjektivnĂ­ nĂˇlez)
- Klient lucidnĂ­, plnÄ› orientovanĂ˝ vĹˇemi smÄ›ry, spolupracujĂ­cĂ­.
- EuthymnĂ­ ladÄ›nĂ­ s mĂ­rnou anticipaÄŤnĂ­ tenzĂ­ pĹ™i expozici MHD. MyĹˇlenĂ­ koherentnĂ­, bez poruch vnĂ­mĂˇnĂ­.

### A (KlinickĂ© zhodnocenĂ­)
- F41.0 PanickĂˇ porucha s lehkou agorafobickou sloĹľkou v rekonvalescenci. ZĹ™etelnĂ˝ nĂˇhled a efektivnĂ­ osvojenĂ­ seberegulaÄŤnĂ­ch kognitivnÄ›-behaviorĂˇlnĂ­ch technik.

### P (TerapeutickĂ˝ plĂˇn)
1. PokraÄŤovat v systematickĂ© in vivo desenzibilizaci (jĂ­zda MHD mimo ĹˇpiÄŤku s doprovodem).
2. NĂˇcvik kognitivnĂ­ restrukturalizace katastrofickĂ˝ch myĹˇlenek.
3. KontrolnĂ­ KBT sezenĂ­ za 14 dnĂ­.`,
    birp: `### B (Behavior - ChovĂˇnĂ­ a symptomy)
- Klient popisuje epizodu akutnĂ­ paniky v tramvaji. Projevila se tachykardie, dechovĂˇ tĂ­seĹ a nutkĂˇnĂ­ k Ăşniku (vystoupenĂ­ na nejbliĹľĹˇĂ­ zastĂˇvce).

### I (Intervention - Intervence terapeuta)
- NĂˇcvik progresivnĂ­ svalovĂ© relaxace a dechovĂ© stabilizace 4-7-8.
- Validace proĹľĂ­vĂˇnĂ­, edukace o fyziologickĂ© podstatÄ› panickĂ© reakce (sympatikus vs. parasympatikus).

### R (Response - Reakce klienta)
- Klient demonstroval sprĂˇvnĂ© provedenĂ­ dechovĂ© techniky v ordinaci, deklaruje pokles ĂşzkostnĂ© ĹˇkĂˇly na 5/10.

### P (Plan - DalĹˇĂ­ postup)
- PlĂˇnovĂˇna odstupĹovanĂˇ expozice cestovĂˇnĂ­ MHD, vedenĂ­ zĂˇznamovĂ©ho KBT denĂ­ku. Kontrola za 2 tĂ˝dny.`,
    report: `**KLINICKĂ KONTROLNĂŤ ZPRĂVA**
**DiagnĂłza:** F41.0 PanickĂˇ porucha, F40.00 Agorafobie

**AnamnĂ©za a nynÄ›jĹˇĂ­ stav:**
Klient pĹ™ichĂˇzĂ­ na pravidelnou kontrolu. V uplynulĂ©m obdobĂ­ zaznamenĂˇna ojedinÄ›lĂˇ exacerbace ĂşzkostnĂ© symptomatologie v dopravnĂ­m prostĹ™edku, zvlĂˇdnuta s vyuĹľitĂ­m nĂˇcvikovĂ˝ch dechovĂ˝ch technik s poklesem tenze z 9/10 na 5/10. VyuĹľita jednorĂˇzovĂˇ dĂˇvka anxiolytika.

**ZĂˇvÄ›r a doporuÄŤenĂ­:**
Stav kompenzovĂˇn, doporuÄŤena pokraÄŤujĂ­cĂ­ psychoterapeutickĂˇ pĂ©ÄŤe KBT smÄ›ru. Schopen bÄ›ĹľnĂ© dennĂ­ a pracovnĂ­ zĂˇtÄ›Ĺľe.`
  },
  case2: {
    title: 'Psychiatrie â€“ DepresivnĂ­ epizoda, titrace SSRI',
    patient: 'Jana V. (35 let)',
    diagnosis: 'F32.1 StĹ™ednÄ› tÄ›ĹľkĂˇ depresivnĂ­ epizoda',
    audioDuration: '02:40',
    rawTranscript: `DobrĂ˝ den panĂ­ doktorko, beru ten Sertralin padesĂˇtku uĹľ tĹ™etĂ­ tĂ˝den. RannĂ­ nevolnosti uĹľ naĹˇtÄ›stĂ­ pĹ™eĹˇly a cĂ­tĂ­m, Ĺľe ten nejhorĹˇĂ­ kĂˇmen na hrudi povolil. PoĹ™Ăˇd se ale budĂ­m kolem ÄŤtvrtĂ© rĂˇno a nemĹŻĹľu zabrat, myĹˇlenky na prĂˇci v bance mÄ› dÄ›sĂ­. ChuĹĄ k jĂ­dlu se trochu zlepĹˇila, zhubla jsem od minule jen kilo. BydlĂ­me poĹ™Ăˇd v Praze 6 na BĹ™evnovÄ›. RĂˇda bych vÄ›dÄ›la, jestli nezvedneme dĂˇvku, jak jsme minule Ĺ™Ă­kali, aby mi to pomohlo i s tou rannĂ­ energiĂ­.`,
    redactedTranscript: `DobrĂ˝ den panĂ­ doktorko, beru ten Sertralin 50 mg p.o. uĹľ tĹ™etĂ­ tĂ˝den. RannĂ­ nevolnosti odeznÄ›ly a pacientka referuje ÄŤĂˇsteÄŤnou Ăşlevu od tĂ­Ĺľe na hrudi. PĹ™etrvĂˇvĂˇ insomnie s ÄŤasnĂ˝m rannĂ­m probouzenĂ­m kolem 4:00 s ruminacemi ohlednÄ› pracovnĂ­ho vytĂ­ĹľenĂ­ v <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[SEKTOR: FinanÄŤnĂ­ sluĹľby]</span>. ChuĹĄ k jĂ­dlu stabilizovĂˇna, vĂˇhovĂ˝ Ăşbytek mĂ­rnĂ˝. BydliĹˇtÄ› v <span class="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-rose-300 dark:border-rose-800">[LOKALITA: MÄ›stskĂˇ ÄŤĂˇst]</span>. ZvaĹľovĂˇna titrace farmakoterapie pro posĂ­lenĂ­ rannĂ­ psychomotoriky.`,
    soap: `### S (SubjektivnĂ­ Ăşdaje)
- Pacientka referuje nĂˇstup terapeutickĂ©ho ĂşÄŤinku Sertralinu (50 mg 1-0-0), gastrointestinĂˇlnĂ­ iniciĂˇlnĂ­ obtĂ­Ĺľe odeznÄ›ly.
- DominujĂ­ reziduĂˇlnĂ­ spĂˇnkovĂ© obtĂ­Ĺľe (pĹ™edÄŤasnĂˇ rannĂ­ probuzenĂ­ se sklonem k ruminaci).
- ChuĹĄ k jĂ­dlu uspokojivĂˇ, suicidĂˇlnĂ­ Ăşvahy neguje.

### O (ObjektivnĂ­ nĂˇlez)
- KlidnĂˇ, spolupracujĂ­cĂ­, psychomotorickĂ© tempo mĂ­rnÄ› zbrzdÄ›nĂ©, Ĺ™eÄŤ tichĂˇ, koherentnĂ­.
- Afektivita oploĹˇtÄ›lĂˇ, afektivnĂ­ rezonance vĹˇak pĹ™Ă­tomna. Intelekt v normÄ›.

### A (KlinickĂ© zhodnocenĂ­)
- F32.1 StĹ™ednÄ› tÄ›ĹľkĂˇ depresivnĂ­ epizoda, pĹ™Ă­znivĂ˝ parciĂˇlnĂ­ nĂˇstup odezvy na SSRI medikaci.

### P (TerapeutickĂ˝ plĂˇn)
1. Titrace Sertralin na 100 mg 1-0-0 od zĂ­tĹ™ejĹˇĂ­ho dne.
2. KrĂˇtkodobÄ› pro Ăşpravu spĂˇnkovĂ© architektury Triticco AC 75 mg 0-0-1/3 aĹľ 2/3 tbl.
3. Kontrola v ambulanci za 3 tĂ˝dny.`,
    birp: `### B (Behavior)
- Pacientka pĹ™ichĂˇzĂ­ vÄŤas, upravenĂˇ. ZnatelnĂ© uvolnÄ›nĂ­ oproti iniciĂˇlnĂ­mu vyĹˇetĹ™enĂ­, pĹ™etrvĂˇvĂˇ rannĂ­ hypoaktivita a Ăşzkost z pracovnĂ­ho nĂˇvratu.

### I (Intervention)
- Edukace o dynamice pĹŻsobenĂ­ SSRI a ÄŤasovĂ©m oknÄ› plnĂ©ho efektu (4â€“6 tĂ˝dnĹŻ). DoporuÄŤenĂ­ zĂˇsad spĂˇnkovĂ© hygieny.

### R (Response)
- Pacientka souhlasĂ­ s navĂ˝ĹˇenĂ­m dĂˇvky antidepresiva a vyjadĹ™uje Ăşlevu z odeznÄ›nĂ­ somatickĂ˝ch neĹľĂˇdoucĂ­ch ĂşÄŤinkĹŻ.

### P (Plan)
- NavĂ˝ĹˇenĂ­ Sertralinu na 100 mg rĂˇno, pĹ™idĂˇnĂ­ trazodonu na noc. Kontrola za 21 dnĂ­.`,
    report: `**LĂ‰KAĹSKĂ ZPRĂVA â€“ KONTROLNĂŤ VYĹ ETĹENĂŤ**
**Dg:** F32.1 Depressio gradus mediocris

Pacientka po 3 tĂ˝dnech na terapii Sertralin 50 mg p.o. Stav s patrnou iniciĂˇlnĂ­ pozitivnĂ­ dynamikou, odeznĂ­vĂˇnĂ­ gastrointestinĂˇlnĂ­ch neĹľĂˇdoucĂ­ch ĂşÄŤinkĹŻ. ReziduĂˇlnÄ› insomnie terminĂˇlnĂ­ho typu.
DoporuÄŤena titrace Sertralin na 100 mg rĂˇno, pĹ™idĂˇn Trazodon 50-75 mg na noc. Kontrola za 3 tĂ˝dny.`
  },
  case3: {
    title: 'Psychoterapie â€“ Syndrom vyhoĹ™enĂ­ a asertivita',
    patient: 'Petr K. (38 let)',
    diagnosis: 'Z73.0 Syndrom vyhoĹ™enĂ­, F43.2 Porucha pĹ™izpĹŻsobenĂ­',
    audioDuration: '02:15',
    rawTranscript: `MinulĂ˝ tĂ˝den byl v prĂˇci opÄ›t ĹˇĂ­lenĂ˝. Ĺ Ă©f mi hodil na stĹŻl projekt za kolegu a jĂˇ jsem zase nedokĂˇzal Ĺ™Ă­ct ne. PĹ™iĹˇel jsem domĹŻ v devÄ›t veÄŤer, byl jsem protivnĂ˝ na manĹľelku i dÄ›ti a pak jsem do dvou do rĂˇna zĂ­ral do stropu. UvÄ›domil jsem si, jak jste Ĺ™Ă­kal, Ĺľe ten pocit zodpovÄ›dnosti za vĹˇechny ostatnĂ­ mÄ› ĂşplnÄ› niÄŤĂ­. Chci si nastavit jasnĂ© hranice a nauÄŤit se Ĺ™Ă­kat: tohle uĹľ je nad rĂˇmec mĂ© kapacity.`,
    redactedTranscript: `MinulĂ˝ tĂ˝den byl v prĂˇci opÄ›t nĂˇroÄŤnĂ˝. NadĹ™Ă­zenĂ˝ delegoval projekt nepĹ™Ă­tomnĂ©ho kolegy na <span class="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-indigo-300 dark:border-indigo-800">[ROLE: Klient]</span>, kterĂ˝ nedokĂˇzal vymezit asertivnĂ­ hranici. NĂˇsledovaly pozdnĂ­ nĂˇvraty, tenze v rodinnĂ©m prostĹ™edĂ­ s <span class="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-mono text-[11px] font-bold border border-amber-300 dark:border-amber-800">[RODINNĂŤ PĹĂŤSLUĹ NĂŤCI]</span> a insomnie. Klient si plnÄ› uvÄ›domuje maladaptivnĂ­ schĂ©ma nadmÄ›rnĂ© zodpovÄ›dnosti a definuje cĂ­l: nĂˇcvik asertivnĂ­ho odmĂ­tnutĂ­ pĹ™i pĹ™ekroÄŤenĂ­ reĂˇlnĂ© pracovnĂ­ kapacity.`,
    soap: `### S (SubjektivnĂ­ Ăşdaje)
- Klient lĂ­ÄŤĂ­ selhĂˇnĂ­ v asertivnĂ­ komunikaci vĹŻÄŤi nadĹ™Ă­zenĂ©mu. Reakce v podobÄ› chronickĂ© Ăşnavy, vnitĹ™nĂ­ho vzteku ventilovanĂ©ho v primĂˇrnĂ­ rodinÄ› a sekundĂˇrnĂ­ nespavosti.
- VyjĂˇdĹ™ena silnĂˇ motivace k nĂˇcviku asertivnĂ­ho vymezenĂ­ hranic.

### O (ObjektivnĂ­ nĂˇlez)
- Klient v dobrĂ©m kontaktu, orientovanĂ˝, pĹ™Ă­tomna zvĂ˝ĹˇenĂˇ tenze v obliÄŤejovĂ© mimice a postuĹ™e. Schopnost sebereflexe a propojenĂ­ tÄ›lesnĂ˝ch signĂˇlĹŻ se stresem.

### A (KlinickĂ© zhodnocenĂ­)
- Z73.0 Syndrom vyhoĹ™enĂ­ v terĂ©nu anankastickĂ˝ch rysĹŻ osobnosti (nadmÄ›rnĂ˝ pocit odpovÄ›dnosti, perfekcionismus).

### P (TerapeutickĂ˝ plĂˇn)
1. HranĂ­ rolĂ­ (role-play): modelovĂ© odmĂ­tnutĂ­ neadekvĂˇtnĂ­ho pracovnĂ­ho poĹľadavku.
2. Identifikace automatickĂ˝ch negativnĂ­ch myĹˇlenek typu â€žkdyĹľ odmĂ­tnu, zklamuâ€ś.
3. PokraÄŤovĂˇnĂ­ v individuĂˇlnĂ­ psychoterapii za 7 dnĂ­.`,
    birp: `### B (Behavior)
- PĹ™etĂ­ĹľenĂ­, submisivnĂ­ chovĂˇnĂ­ vĹŻÄŤi nadĹ™Ă­zenĂ©mu, nĂˇslednĂˇ podrĂˇĹľdÄ›nost v domĂˇcĂ­m prostĹ™edĂ­ a spĂˇnkovĂˇ deprivace.

### I (Intervention)
- KognitivnĂ­ restrukturalizace schĂ©matu odpovÄ›dnosti, nĂˇcvik asertivnĂ­ho â€žjĂˇ-sdÄ›lenĂ­â€ś a techniky pĹ™eskakujĂ­cĂ­ gramodesky.

### R (Response)
- Klient v nĂˇcviku dokĂˇzal zformulovat pevnĂ©, ale neagresivnĂ­ odmĂ­tnutĂ­ Ăşkolu. ZaznamenĂˇna Ăşleva a posĂ­lenĂ­ pocitu kompetence.

### P (Plan)
- Aplikace natrĂ©novanĂ© vÄ›ty v reĂˇlnĂ© pracovnĂ­ situaci do pĹ™Ă­ĹˇtĂ­ho sezenĂ­. Kontrola za tĂ˝den.`,
    report: `**ZPRĂVA Z PSYCHOTERAPEUTICKĂ‰HO SEZENĂŤ**
**TĂ©ma:** Z73.0 Syndrom vyhoĹ™enĂ­, nĂˇcvik asertivity
PrĂˇce zamÄ›Ĺ™ena na maladaptivnĂ­ vzorce nadmÄ›rnĂ© odpovÄ›dnosti. Proveden nĂˇcvik asertivnĂ­ch technik pro vymezenĂ­ hranic vĹŻÄŤi pracovnĂ­mu pĹ™etĂ­ĹľenĂ­. Klient aktivnÄ› spolupracuje s vĂ˝bornou prognĂłzou pro stabilizaci ĹľivotnĂ­ho balancu.`
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
    if (caseMeta) caseMeta.textContent = `${c.patient} | ${c.diagnosis} | DĂ©lka: ${c.audioDuration}`;

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

    if (clientsVal) clientsVal.textContent = `${clients} sezenĂ­`;
    if (timeVal) timeVal.textContent = `${manualMinutes} min`;
    if (rateVal) rateVal.textContent = `${hourlyRate.toLocaleString('cs-CZ')} KÄŤ/hod`;

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
    if (monthlySavingsOut) monthlySavingsOut.textContent = `${Math.round(monthlyMoney).toLocaleString('cs-CZ')} KÄŤ`;
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
      title: '1. DiktĂˇt sezenĂ­ na mobilu v ordinaci',
      desc: 'LĂ©kaĹ™ nebo terapeut mluvĂ­ pĹ™irozenĂ˝m tempem do mobilu ÄŤi tabletu. Aplikace bÄ›ĹľĂ­ jako offline PWA i bez signĂˇlu a ĹľivÄ› vizualizuje zvukovou stopu. Ĺ˝ĂˇdnĂ© zdrĹľovĂˇnĂ­ klienta.',
      image: './screenshots/mobile-editor.png',
      badge: 'MOBILNĂŤ DIKTĂT'
    },
    step2: {
      title: '2. OkamĹľitĂ˝ pĹ™enos do poÄŤĂ­taÄŤe pĹ™es WebSockets',
      desc: 'Jakmile se vrĂˇtĂ­te k pracovnĂ­mu stolu, text je jiĹľ v reĂˇlnĂ©m ÄŤase pĹ™enesen na obrazovce stolnĂ­ho poÄŤĂ­taÄŤe. Ĺ˝ĂˇdnĂ© posĂ­lĂˇnĂ­ e-mailem, ĹľĂˇdnĂ© kabely, nulovĂˇ manuĂˇlnĂ­ prĂˇce.',
      image: './screenshots/workspace-dark.png',
      badge: 'REAL-TIME CLOUD SYNC'
    },
    step3: {
      title: '3. Pre-Flight PII filtrace a AI syntĂ©za',
      desc: 'KlientskĂ˝ engine provede deterministickou kontrolu PII (rodnĂˇ ÄŤĂ­sla Modulo 11, PESEL, adresy, banky) a odeĹˇle anonymizovanĂ˝ text do AI. ZĂˇpis je zformĂˇtovĂˇn dle zvolenĂ©ho schĂ©matu (SOAP, BIRP).',
      image: './screenshots/ai-synthesis.png',
      badge: 'ZERO-KNOWLEDGE AI'
    },
    step4: {
      title: '4. Export do Wordu (.docx) ÄŤi ambulantnĂ­ho softwaru',
      desc: 'JednĂ­m klikem exportujete ÄŤistĂ˝ .docx soubor s hlaviÄŤkou ordinace a ÄŤĂ­slem licence ÄŚLK, nebo obsah vloĹľĂ­te pĹ™Ă­mo do vaĹˇeho ambulantnĂ­ho softwaru (PC DOKTOR, SmartMedix apod.).',
      image: './screenshots/split-view.png',
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
      if (proPriceEl) proPriceEl.textContent = '390 KÄŤ';
      if (proPeriodEl) proPeriodEl.textContent = '/ mÄ›sĂ­c';
      if (proBilledEl) proBilledEl.textContent = 'ĂšÄŤtovĂˇno roÄŤnÄ› (4 680 KÄŤ / rok â€“ uĹˇetĹ™Ă­te 1 200 KÄŤ)';
    } else {
      if (proPriceEl) proPriceEl.textContent = '490 KÄŤ';
      if (proPeriodEl) proPeriodEl.textContent = '/ mÄ›sĂ­c';
      if (proBilledEl) proBilledEl.textContent = 'FakturovĂˇno mÄ›sĂ­ÄŤnÄ› bez zĂˇvazkĹŻ, zruĹˇenĂ­ kdykoliv';
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
    if (lightboxTitle) lightboxTitle.textContent = title || 'SnĂ­mek aplikace Synapse';
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

