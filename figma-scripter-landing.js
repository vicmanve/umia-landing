// =========================================================================
// UMIA 3.0 — Landing Page Builder for Figma Scripter
// Ejecuta este script directamente dentro del plugin "Scripter" en Figma
// =========================================================================

(async () => {
  console.log("Iniciando generación de Landing Page UMIA 3.0...");

  // 1. Carga segura de fuentes con fallback
  async function loadFontSafe(family, style) {
    try {
      await figma.loadFontAsync({ family, style });
      return { family, style };
    } catch (e) {
      try {
        await figma.loadFontAsync({ family: "Inter", style: style === "Bold" ? "Bold" : (style === "Medium" ? "Medium" : "Regular") });
        return { family: "Inter", style: style === "Bold" ? "Bold" : (style === "Medium" ? "Medium" : "Regular") };
      } catch (e2) {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        return { family: "Inter", style: "Regular" };
      }
    }
  }

  // Pre-cargar fuentes principales
  const fontTitle = await loadFontSafe("Newsreader", "Bold");
  const fontBody = await loadFontSafe("DM Sans", "Regular");
  const fontMedium = await loadFontSafe("DM Sans", "Medium");
  const fontBold = await loadFontSafe("DM Sans", "Bold");

  // Helper de Color HEX a Figma RGB (0 a 1)
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const num = parseInt(hex, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
    };
  }

  function solid(hex, opacity = 1) {
    return [{ type: "SOLID", color: hexToRgb(hex), opacity }];
  }

  // Helpers de creación de elementos
  function createFrame(name, parent, x, y, w, h, fillHex, radius = 0) {
    const f = figma.createFrame();
    f.name = name;
    f.x = x;
    f.y = y;
    f.resize(w, h);
    if (fillHex) f.fills = solid(fillHex);
    else f.fills = [];
    f.cornerRadius = radius;
    f.clipsContent = true;
    parent.appendChild(f);
    return f;
  }

  function createRect(name, parent, x, y, w, h, fillHex, radius = 0) {
    const r = figma.createRectangle();
    r.name = name;
    r.x = x;
    r.y = y;
    r.resize(w, h);
    r.fills = solid(fillHex);
    r.cornerRadius = radius;
    parent.appendChild(r);
    return r;
  }

  async function createText(parent, x, y, textString, font, size, colorHex) {
    const t = figma.createText();
    await figma.loadFontAsync(font);
    t.fontName = font;
    t.fontSize = size;
    t.characters = textString;
    t.fills = solid(colorHex);
    t.x = x;
    t.y = y;
    parent.appendChild(t);
    return t;
  }

  // Canvas activo
  const page = figma.currentPage;

  // Frame Maestro de la Landing Page (Desktop 1440px)
  const master = figma.createFrame();
  master.name = "🌐 UMIA 3.0 — Landing Page Oficial (Desktop)";
  master.x = 0;
  master.y = 0;
  master.resize(1440, 7590);
  master.fills = solid("#F5F4F0"); // Warm Canvas
  page.appendChild(master);

  // -------------------------------------------------------------------------
  // 00. TOP PROMO BAR (h: 44px)
  // -------------------------------------------------------------------------
  const topBar = createFrame("00 - Top Promo Bar", master, 0, 0, 1440, 44, "#0C3738");
  await createText(
    topBar,
    380,
    13,
    "🎁 ¿Tienes un código de embajador médico? Activa hoy tus 3 meses de acceso total   →   Canjear código",
    fontMedium,
    13,
    "#DDECED"
  );

  // -------------------------------------------------------------------------
  // 01. HERO SECTION & CHIP NAVBAR (y: 44, h: 780)
  // -------------------------------------------------------------------------
  const hero = createFrame("01 - Hero Section", master, 0, 44, 1440, 780, "#F5F4F0");
  createRect("Atmosphere Mint", hero, 720, 110, 640, 580, "#DDECED", 320);

  // Chip Navbar
  const nav = createFrame("Chip Navbar (Sticky)", hero, 200, 24, 1040, 64, "#FFFEFA", 999);
  nav.strokes = solid("#0C3738", 0.08);
  nav.strokeWeight = 1;

  // Logo UMIA + Tag
  await createText(nav, 36, 20, "UMIA", fontBold, 22, "#0C3738");
  const tag3 = createFrame("Tag 3.0", nav, 106, 22, 38, 20, "#DDECED", 999);
  await createText(tag3, 8, 3, "3.0", fontBold, 11, "#0C3738");

  // Nav links
  const links = ["Ecosistema", "UMI (Agente IA)", "Comparativa", "Planes", "FAQ"];
  for (let i = 0; i < links.length; i++) {
    await createText(nav, 180 + i * 125, 23, links[i], fontMedium, 14, "#444444");
  }

  // CTA Nav
  const ctaNav = createFrame("CTA Iniciar", nav, 860, 10, 160, 44, "#0C3738", 999);
  await createText(ctaNav, 30, 13, "Iniciar consulta", fontMedium, 13, "#FFFEFA");

  // Hero Content Left
  const heroTag = createFrame("Hero Pill Tag", hero, 120, 150, 395, 34, "#DDECED", 999);
  await createText(heroTag, 18, 9, "✨ BIENVENIDO A LA NUEVA ERA MÉDICA EN LATAM", fontMedium, 11, "#194849");

  await createText(
    hero,
    120,
    205,
    "Tecnología enfocada\nen la salud de\ntus pacientes.",
    fontTitle,
    58,
    "#0C3738"
  );

  await createText(
    hero,
    120,
    420,
    "La plataforma clínica con IA que elimina el caos de carpetas\ny chats de WhatsApp. Transcribe consultas en tiempo real,\nredacta notas SOAP y emite récipes con estándar\ninternacional en segundos.",
    fontBody,
    18,
    "#444444"
  );

  // Email Capture Bar (SIN microcopy abajo)
  const emailBar = createFrame("Hero Email Capture Bar", hero, 120, 555, 530, 60, "#FFFEFA", 999);
  emailBar.strokes = solid("#0C3738", 0.1);
  emailBar.strokeWeight = 1;
  await createText(emailBar, 24, 21, "Tu correo médico profesional", fontBody, 14, "#757575");

  const btnHero = createFrame("Btn Hero", emailBar, 290, 6, 234, 48, "#0C3738", 999);
  await createText(btnHero, 36, 15, "Comenzar 14 días gratis", fontMedium, 13, "#FFFEFA");

  await createText(hero, 132, 635, "▷  Ver cómo funciona en 60 seg", fontMedium, 14, "#194849");

  // Hero Live SOAP Mockup Card (Right)
  const soapCard = createFrame("Hero Live SOAP Card", hero, 750, 145, 570, 525, "#FFFEFA", 24);
  soapCard.strokes = solid("#0C3738", 0.08);
  soapCard.strokeWeight = 1;
  await createText(soapCard, 32, 28, "🎙️ Escuchando consulta en vivo...", fontMedium, 13, "#194849");

  const quoteBox = createFrame("Transcript Quote", soapCard, 32, 68, 506, 60, "#F5F4F0", 12);
  await createText(
    quoteBox,
    18,
    21,
    "“Paciente refiere cefalea pulsátil de 3 días de evolución, sin fiebre…”",
    fontBody,
    14,
    "#444444"
  );

  const soapRows = [
    ["S", "Cefalea pulsátil frontotemporal de 3 días de evolución."],
    ["O", "TA 120/80 mmHg · FC 72 lpm · Afebril · Neurológico normal."],
    ["A", "Migraña sin aura (CIE-11: 8A80) · Confirmado por UMI."],
    ["P", "Analgesia pautada + Récipe digital QR + Control en 7 días."],
  ];
  for (let i = 0; i < soapRows.length; i++) {
    const row = createFrame(`SOAP Row ${soapRows[i][0]}`, soapCard, 32, 148 + i * 82, 506, 68, "#F5F4F0", 14);
    const badge = createFrame("Badge", row, 16, 18, 32, 32, "#0C3738", 999);
    await createText(badge, 11, 7, soapRows[i][0], fontBold, 13, "#FFFEFA");
    await createText(row, 62, 24, soapRows[i][1], fontBody, 14, "#171719");
  }

  // Floating HIPAA Pill
  const hipaa = createFrame("HIPAA Floating Pill", hero, 1135, 125, 165, 36, "#0C3738", 999);
  await createText(hipaa, 18, 10, "🛡️ HIPAA Compliant", fontMedium, 12, "#FFFEFA");

  // -------------------------------------------------------------------------
  // 02. TRUST & STANDARDS STRIP (y: 824, h: 130)
  // -------------------------------------------------------------------------
  const trust = createFrame("02 - Trust Strip", master, 0, 824, 1440, 130, "#FFFEFA");
  await createText(
    trust,
    420,
    26,
    "CONSTRUIDO BAJO RIGOR MÉDICO Y ESTÁNDARES INTERNACIONALES DE SALUD",
    fontMedium,
    12,
    "#444444"
  );

  const trustBadges = [
    "🛡️ Certificación HIPAA",
    "🔗 Interoperabilidad HL7",
    "📋 Codificación CIE-10 / CIE-11",
    "🔒 Cifrado End-to-End",
    "🩻 Visor DICOM Integrado",
  ];
  for (let i = 0; i < trustBadges.length; i++) {
    const b = createFrame(`Trust Pill ${i + 1}`, trust, 110 + i * 248, 62, 232, 44, "#F5F4F0", 999);
    await createText(b, 24, 13, trustBadges[i], fontMedium, 13, "#194849");
  }

  // -------------------------------------------------------------------------
  // 03. UMI: LA PRIMERA IA AGÉNTICA (y: 954, h: 760)
  // -------------------------------------------------------------------------
  const umi = createFrame("03 - UMI IA Agéntica", master, 0, 954, 1440, 760, "#0C3738");

  const umiEyebrow = createFrame("UMI Tag", umi, 120, 64, 290, 34, "#194849", 999);
  await createText(umiEyebrow, 18, 9, "✨ LA EVOLUCIÓN DE LA IA EN SALUD", fontMedium, 12, "#B7D8D9");

  // Título exacto solicitado
  await createText(
    umi,
    120,
    116,
    "Te presentamos a UMI: La primera IA\nagéntica para medicina en Latam",
    fontTitle,
    44,
    "#F5F4F0"
  );

  await createText(
    umi,
    120,
    224,
    "Otras herramientas te piden dictar o corregir textos genéricos. UMI actúa: escucha tu\nconsulta y orquesta expediente, récipes y alertas mientras tú miras al paciente a los ojos.",
    fontBody,
    17,
    "#DDECED"
  );

  // Card Hub Central UMI
  const hub = createFrame("UMI Hub Central", umi, 120, 300, 540, 390, "#194849", 28);
  createRect("Beam H", hub, 90, 193, 360, 3, "#B7D8D9", 2);
  createRect("Beam V", hub, 268, 65, 3, 260, "#B7D8D9", 2);

  // Mascota de UMI (búho/gato menta con lentes redondos)
  const mascot = createFrame("Mascota UMI", hub, 195, 120, 150, 150, "#F5F4F0", 999);
  createRect("Chin", mascot, 15, 82, 120, 55, "#B7D8D9", 40);
  const leftLens = createFrame("Lente Izq", mascot, 18, 42, 52, 44, "#0C3738", 22);
  createRect("Ojo Izq", leftLens, 18, 12, 10, 18, "#FFFEFA", 8);
  const rightLens = createFrame("Lente Der", mascot, 80, 42, 52, 44, "#0C3738", 22);
  createRect("Ojo Der", rightLens, 18, 12, 10, 18, "#FFFEFA", 8);
  createRect("Puente", mascot, 68, 58, 14, 6, "#0C3738", 3);
  await createText(mascot, 56, 112, "UMI", fontBold, 16, "#0C3738");

  // Nodos satélite de UMI
  const satNodes = [
    { label: "📄 Nota SOAP", x: 36, y: 36 },
    { label: "🩺 Récipe digital", x: 354, y: 36 },
    { label: "🛡️ Alerta fármacos", x: 36, y: 298 },
    { label: "💬 WhatsApp", x: 354, y: 298 },
  ];
  for (const sn of satNodes) {
    const sf = createFrame(sn.label, hub, sn.x, sn.y, 150, 54, "#0C3738", 16);
    await createText(sf, 16, 18, sn.label, fontMedium, 13, "#DDECED");
  }

  // Right: 4 Agentic Action Cards
  const umiActions = [
    ["Escucha ambiental pasiva", "Conversa natural con tu paciente. UMI extrae síntomas y exploración."],
    ["Alertas farmacológicas", "Cruza alergias y medicación y avisa de interacciones al prescribir."],
    ["Récipes en segundos", "Detecta el plan y deja el récipe listo con posología, MPPS y QR."],
    ["Tú tienes la última palabra", "UMI nunca decide por ti: te entrega el borrador y apruebas con 1 clic."],
  ];
  for (let i = 0; i < umiActions.length; i++) {
    const act = createFrame(`Acción ${i + 1}`, umi, 700, 300 + i * 100, 620, 86, "#194849", 18);
    await createText(act, 24, 18, umiActions[i][0], fontBold, 16, "#FFFEFA");
    await createText(act, 24, 46, umiActions[i][1], fontBody, 13, "#DDECED");
  }

  // -------------------------------------------------------------------------
  // 04. COMPARADOR VISUAL "SIN UMIA VS. CON UMIA" (Opción 3) (y: 1714, h: 680)
  // -------------------------------------------------------------------------
  const comp = createFrame("04 - Comparador Consulta", master, 0, 1714, 1440, 680, "#F5F4F0");
  await createText(comp, 120, 60, "LA TRANSFORMACIÓN DE TU PRÁCTICA MÉDICA", fontMedium, 12, "#194849");
  await createText(comp, 120, 95, "¿Cómo se siente tu consulta hoy vs. con UMIA?", fontTitle, 38, "#0C3738");

  const splitBox = createFrame("Split Comparison Box", comp, 120, 170, 1200, 440, "#FFFEFA", 24);
  splitBox.strokes = solid("#0C3738", 0.08);

  // Lado Izquierdo: SIN UMIA
  const leftSide = createFrame("Lado Sin UMIA", splitBox, 0, 0, 590, 440, "#EBE9E2");
  await createText(leftSide, 40, 36, "❌ SIN UMIA • Consulta Tradicional", fontBold, 18, "#8A3B3B");
  const sinPoints = [
    "15 minutos tecleando de espaldas al paciente en cada consulta.",
    "WhatsApp personal saturado con 47 notas de voz sin registrar.",
    "Carpetas de papel extraviadas y récipes en talonarios manuales.",
    "Sin alertas de interacción medicamentosa en tiempo real.",
    "Sobrecarga y fatiga médica al final del día.",
  ];
  for (let i = 0; i < sinPoints.length; i++) {
    await createText(leftSide, 40, 95 + i * 58, `• ${sinPoints[i]}`, fontBody, 14, "#444444");
  }

  // Lado Derecho: CON UMIA 3.0
  const rightSide = createFrame("Lado Con UMIA", splitBox, 610, 0, 590, 440, "#0C3738");
  await createText(rightSide, 40, 36, "✅ CON UMIA 3.0 • Consulta Asistida por UMI", fontBold, 18, "#B7D8D9");
  const conPoints = [
    "Mirando al paciente a los ojos. UMI transcribe en tiempo real.",
    "Nota SOAP redactada y codificada con CIE-11 en 30 segundos.",
    "Récipe oficial con código QR y validación MPPS directo a WhatsApp.",
    "Alerta farmacológica automática antes de autorizar el récipe.",
    "Finalizas la jornada con todas las historias clínicas al día.",
  ];
  for (let i = 0; i < conPoints.length; i++) {
    await createText(rightSide, 40, 95 + i * 58, `✓ ${conPoints[i]}`, fontBody, 14, "#DDECED");
  }

  // Divisor central slider
  const slider = createFrame("Slider Handle", splitBox, 588, 0, 24, 440, "#FFFEFA");
  const pillHandle = createFrame("Pill Handle", slider, 0, 195, 24, 50, "#0C3738", 12);
  await createText(pillHandle, 4, 15, "↔", fontBold, 14, "#FFFEFA");

  // -------------------------------------------------------------------------
  // 05. ECOSISTEMA MÉDICO INTEGRAL (5 Stacked Cards) (y: 2394, h: 1860)
  // -------------------------------------------------------------------------
  const eco = createFrame("05 - Ecosistema Médico", master, 0, 2394, 1440, 1860, "#F5F4F0");
  await createText(eco, 160, 50, "ECOSISTEMA MÉDICO INTEGRAL", fontMedium, 12, "#194849");
  await createText(eco, 160, 85, "Todo lo que tu consulta necesita en un solo lugar", fontTitle, 40, "#0C3738");

  const cardsData = [
    {
      title: "1. Scribe Clínico con Inteligencia Artificial",
      desc: "Escucha pasiva de la consulta, extracción estructurada de anamnesis, exploración y diagnóstico CIE-11. Genera la nota SOAP en segundos con precisión médica.",
      tag: "Transcripción & SOAP",
    },
    {
      title: "2. Récipes Médicos e Informes con Validación QR",
      desc: "Emisión de prescripciones estandarizadas con firma, sello digital y código QR único verificable por farmacias o pacientes vía WhatsApp y PDF seguro.",
      tag: "Prescripción Digital",
    },
    {
      title: "3. Visor DICOM Nativo Integrado",
      desc: "Visualiza tomografías, resonancias magnéticas y radiografías directo en el navegador sin instalar programas pesados, con herramientas de contraste y zoom.",
      tag: "Imagenología Clínica",
    },
    {
      title: "4. Agenda Multiconsultorio & Recordatorios WhatsApp",
      desc: "Gestión unificada de citas para múltiples centros o clínicas con confirmación automática a pacientes para reducir el ausentismo en consulta al mínimo.",
      tag: "Gestión de Citas",
    },
    {
      title: "5. Seguridad y Privacidad Grado Médico (HIPAA/HL7)",
      desc: "Cifrado de grado bancario en reposo y en tránsito. Cumplimiento estricto con leyes de protección de datos de salud y auditoría de accesos inmutable.",
      tag: "Seguridad & Compliance",
    },
  ];

  for (let i = 0; i < cardsData.length; i++) {
    const cardY = 170 + i * 320;
    const c = createFrame(`Ecosistema Card ${i + 1}`, eco, 160, cardY, 1120, 290, "#FFFEFA", 24);
    c.strokes = solid("#0C3738", 0.08);

    const tag = createFrame("Tag", c, 40, 36, 180, 28, "#DDECED", 999);
    await createText(tag, 14, 6, cardsData[i].tag, fontMedium, 12, "#0C3738");

    await createText(c, 40, 80, cardsData[i].title, fontBold, 22, "#0C3738");
    await createText(c, 40, 125, cardsData[i].desc, fontBody, 15, "#444444");

    // Ilustración UI derecha
    const illus = createFrame("Ilustración UI", c, 680, 36, 400, 218, "#F5F4F0", 18);
    illus.strokes = solid("#0C3738", 0.06);
    createRect("Mini Header", illus, 0, 0, 400, 36, "#0C3738", 0);
    await createText(illus, 20, 10, `UMIA Mockup • ${cardsData[i].tag}`, fontMedium, 12, "#FFFEFA");
    createRect("Line 1", illus, 24, 60, 240, 12, "#194849", 6);
    createRect("Line 2", illus, 24, 85, 340, 8, "#DDECED", 4);
    createRect("Line 3", illus, 24, 105, 300, 8, "#DDECED", 4);
    createRect("Box Mini", illus, 24, 130, 160, 60, "#FFFEFA", 10);
    createRect("Box Mini 2", illus, 200, 130, 160, 60, "#FFFEFA", 10);
  }

  // -------------------------------------------------------------------------
  // 06. CÓMO FUNCIONA EN 3 PASOS (y: 4254, h: 460)
  // -------------------------------------------------------------------------
  const pasos = createFrame("06 - Tres Pasos", master, 0, 4254, 1440, 460, "#0C3738");
  await createText(pasos, 160, 50, "FLUJO CLÍNICO SENCILLO", fontMedium, 12, "#B7D8D9");
  await createText(pasos, 160, 85, "Empieza a atender con UMI en 3 simples pasos", fontTitle, 38, "#F5F4F0");

  const steps = [
    ["01", "Presiona “Iniciar consulta”", "Abre la ficha del paciente desde tu laptop o tablet y deja que UMI escuche en segundo plano."],
    ["02", "Revisa la propuesta de UMI", "Al terminar la conversación, revisa la nota SOAP y los récipes sugeridos generados al instante."],
    ["03", "Aprueba y comparte", "Edita lo que desees con un clic, aprueba el récipe y envíalo automáticamente al WhatsApp del paciente."],
  ];
  for (let i = 0; i < steps.length; i++) {
    const sc = createFrame(`Paso ${steps[i][0]}`, pasos, 160 + i * 386, 170, 350, 220, "#194849", 20);
    const num = createFrame("Num Pill", sc, 24, 24, 44, 44, "#0C3738", 999);
    await createText(num, 13, 11, steps[i][0], fontBold, 16, "#FFFEFA");
    await createText(sc, 24, 85, steps[i][1], fontBold, 18, "#FFFEFA");
    await createText(sc, 24, 125, steps[i][2], fontBody, 13, "#DDECED");
  }

  // -------------------------------------------------------------------------
  // 07. MÉTRICAS DE IMPACTO (y: 4714, h: 440)
  // -------------------------------------------------------------------------
  const metrics = createFrame("07 - Métricas", master, 0, 4714, 1440, 440, "#F5F4F0");
  await createText(metrics, 160, 50, "RESULTADOS COMPROBADOS", fontMedium, 12, "#194849");
  await createText(metrics, 160, 85, "Impacto tangible desde tu primera semana", fontTitle, 38, "#0C3738");

  const statData = [
    ["60%", "Menos tiempo en papeleo", "Ahorra más de 2 horas diarias de transcripción y notas clínicas."],
    ["+30", "Especialidades médicas", "Vocabulario entrenado en cardiología, pediatría, ginecología y más."],
    ["100%", "Cifrado end-to-end", "Tus historias clínicas protegidas bajo los estándares más exigentes."],
  ];
  for (let i = 0; i < statData.length; i++) {
    const st = createFrame(`Stat ${i + 1}`, metrics, 160 + i * 386, 165, 350, 200, "#FFFEFA", 20);
    st.strokes = solid("#0C3738", 0.08);
    await createText(st, 28, 28, statData[i][0], fontBold, 44, "#0C3738");
    await createText(st, 28, 90, statData[i][1], fontBold, 16, "#194849");
    await createText(st, 28, 125, statData[i][2], fontBody, 13, "#444444");
  }

  // -------------------------------------------------------------------------
  // 08. TESTIMONIOS MÉDICOS (y: 5154, h: 460)
  // -------------------------------------------------------------------------
  const test = createFrame("08 - Testimonios", master, 0, 5154, 1440, 460, "#FFFEFA");
  await createText(test, 160, 50, "MÉDICOS QUE YA TRANSFORMARON SU CONSULTA", fontMedium, 12, "#194849");
  await createText(test, 160, 85, "Lo que dicen los especialistas sobre UMIA", fontTitle, 38, "#0C3738");

  const testList = [
    ["Dra. Andrea Briceño", "Pediatra • Caracas", "“Antes pasaba horas tecleando después de consulta. Con UMI salgo puntual y mis pacientes adoran recibir su récipe con QR al WhatsApp.”"],
    ["Dr. Carlos Mendoza", "Medicina Interna • Valencia", "“La precisión de la nota SOAP y la codificación CIE-11 es asombrosa. Me da total tranquilidad jurídica y clínica.”"],
    ["Dra. Valentina Silva", "Cardióloga • Maracaibo", "“Tener el visor DICOM integrado con la historia clínica del paciente en una sola pestaña me cambió por completo el flujo de trabajo.”"],
  ];
  for (let i = 0; i < testList.length; i++) {
    const tc = createFrame(`Testimonio ${i + 1}`, test, 160 + i * 386, 165, 350, 225, "#F5F4F0", 20);
    await createText(tc, 24, 24, "★★★★★", fontBold, 16, "#0C3738");
    await createText(tc, 24, 55, testList[i][2], fontBody, 14, "#444444");
    await createText(tc, 24, 155, testList[i][0], fontBold, 15, "#0C3738");
    await createText(tc, 24, 178, testList[i][1], fontMedium, 12, "#194849");
  }

  // -------------------------------------------------------------------------
  // 09. PLANES Y PRECIOS OFICIALES + CÓDIGO EMBAJADOR (y: 5614, h: 860)
  // -------------------------------------------------------------------------
  const pricing = createFrame("09 - Planes y Precios", master, 0, 5614, 1440, 860, "#F5F4F0");
  await createText(pricing, 160, 50, "PLANES TRANSPARENTES", fontMedium, 12, "#194849");
  await createText(pricing, 160, 85, "Precios diseñados para cada etapa médica", fontTitle, 40, "#0C3738");

  // Toggle Mensual / Anual
  const toggle = createFrame("Toggle Periodo", pricing, 540, 145, 360, 48, "#FFFEFA", 999);
  toggle.strokes = solid("#0C3738", 0.1);
  const pillM = createFrame("Mensual Activo", toggle, 6, 6, 160, 36, "#0C3738", 999);
  await createText(pillM, 50, 10, "Mensual", fontMedium, 13, "#FFFEFA");
  await createText(toggle, 190, 16, "Anual (Ahorra 20%)", fontMedium, 13, "#194849");

  // Card 1: Free
  const cardFree = createFrame("Card Free", pricing, 160, 220, 350, 480, "#FFFEFA", 24);
  cardFree.strokes = solid("#0C3738", 0.08);
  await createText(cardFree, 32, 32, "Free", fontBold, 24, "#0C3738");
  await createText(cardFree, 32, 65, "Para conocer la plataforma", fontBody, 13, "#757575");
  await createText(cardFree, 32, 105, "Free", fontBold, 40, "#0C3738");
  const freeFeat = ["10 GB de almacenamiento", "50h de IA para pruebas", "Acceso básico a la plataforma", "1 usuario", "Soporte de la comunidad"];
  for (let j = 0; j < freeFeat.length; j++) {
    await createText(cardFree, 32, 180 + j * 36, `✓  ${freeFeat[j]}`, fontBody, 13, "#444444");
  }
  const btnFree = createFrame("Btn Free", cardFree, 32, 395, 286, 48, "#F5F4F0", 999);
  await createText(btnFree, 95, 15, "Crear cuenta", fontMedium, 14, "#0C3738");

  // Card 2: Pro (Más elegido)
  const cardPro = createFrame("Card Pro (Destacada)", pricing, 545, 200, 350, 520, "#0C3738", 24);
  const badgePop = createFrame("Badge Popular", cardPro, 32, 24, 120, 26, "#194849", 999);
  await createText(badgePop, 18, 5, "⭐ Más elegido", fontBold, 11, "#B7D8D9");
  await createText(cardPro, 32, 65, "Pro", fontBold, 26, "#FFFEFA");
  await createText(cardPro, 32, 95, "Para médicos independientes", fontBody, 13, "#DDECED");
  await createText(cardPro, 32, 130, "$25 /mes", fontBold, 40, "#FFFEFA");
  await createText(cardPro, 32, 175, "o $240 /año (Ahorras $60)", fontMedium, 12, "#B7D8D9");
  const proFeat = [
    "10 GB de almacenamiento",
    "50h de IA al mes (consultas)",
    "Acceso completo a la plataforma",
    "Plantillas IA · DICOM · PDF",
    "Compartir récipes por correo/WA",
    "Soporte prioritario 24/7",
  ];
  for (let j = 0; j < proFeat.length; j++) {
    await createText(cardPro, 32, 215 + j * 36, `✓  ${proFeat[j]}`, fontBody, 13, "#DDECED");
  }
  const btnPro = createFrame("Btn Pro", cardPro, 32, 445, 286, 50, "#FFFEFA", 999);
  await createText(btnPro, 95, 16, "Crear cuenta", fontBold, 14, "#0C3738");

  // Card 3: Clínicas / API Custom
  const cardClin = createFrame("Card Clínicas", pricing, 930, 220, 350, 480, "#FFFEFA", 24);
  cardClin.strokes = solid("#0C3738", 0.08);
  await createText(cardClin, 32, 32, "Clínicas / API", fontBold, 24, "#0C3738");
  await createText(cardClin, 32, 65, "Integración B2B y on-premise", fontBody, 13, "#757575");
  await createText(cardClin, 32, 105, "Custom", fontBold, 38, "#0C3738");
  const clinFeat = ["Almacenamiento ilimitado", "Horas de IA por volumen", "REST API + Webhooks", "SSO + SLA empresarial", "Onboarding y soporte dedicado"];
  for (let j = 0; j < clinFeat.length; j++) {
    await createText(cardClin, 32, 180 + j * 36, `✓  ${clinFeat[j]}`, fontBody, 13, "#444444");
  }
  const btnClin = createFrame("Btn Clínicas", cardClin, 32, 395, 286, 48, "#0C3738", 999);
  await createText(btnClin, 85, 15, "Hablar con ventas", fontMedium, 14, "#FFFEFA");

  // Caja de Embajador
  const ambBox = createFrame("Caja Embajador", pricing, 280, 750, 880, 70, "#FFFEFA", 999);
  ambBox.strokes = solid("#0C3738", 0.1);
  await createText(ambBox, 36, 24, "🎁 ¿Tienes un código de embajador médico?", fontBold, 14, "#0C3738");
  const ambInput = createFrame("Input Código", ambBox, 400, 12, 220, 46, "#F5F4F0", 999);
  await createText(ambInput, 20, 14, "DRAANDREA3M", fontBold, 13, "#194849");
  const ambBtn = createFrame("Btn Aplicar", ambBox, 635, 12, 230, 46, "#0C3738", 999);
  await createText(ambBtn, 36, 14, "Aplicar 3 meses gratis", fontMedium, 13, "#FFFEFA");

  // -------------------------------------------------------------------------
  // 10. PREGUNTAS FRECUENTES (y: 6474, h: 540)
  // -------------------------------------------------------------------------
  const faq = createFrame("10 - FAQ Clínico", master, 0, 6474, 1440, 540, "#FFFEFA");
  await createText(faq, 160, 50, "RESOLVEMOS TUS DUDAS", fontMedium, 12, "#194849");
  await createText(faq, 160, 85, "Preguntas frecuentes de médicos", fontTitle, 38, "#0C3738");

  const faqs = [
    ["¿Cómo garantiza UMIA la privacidad de los datos de mis pacientes?", "Toda la información se cifra de extremo a extremo bajo protocolos HIPAA y HL7. Los datos nunca se usan para entrenar modelos públicos."],
    ["¿Requiere instalar algún programa en mi computadora?", "No, UMIA es 100% en la nube y funciona en cualquier navegador (Chrome, Safari, Edge) en PC, Mac, iPad o tablet."],
    ["¿UMI sustituye el criterio médico?", "Jamás. UMI actúa como un asistente: genera borradores estructurados que tú siempre revisas, ajustas y apruebas antes de emitir."],
    ["¿Cómo entrego los récipes a mis pacientes?", "Puedes imprimirlos en PDF con membrete y código QR o enviarlos directo a su WhatsApp en un solo clic."],
  ];
  for (let k = 0; k < faqs.length; k++) {
    const fRow = createFrame(`FAQ Row ${k + 1}`, faq, 160, 155 + k * 85, 1120, 72, "#F5F4F0", 16);
    await createText(fRow, 28, 16, faqs[k][0], fontBold, 15, "#0C3738");
    await createText(fRow, 28, 42, faqs[k][1], fontBody, 13, "#444444");
    await createText(fRow, 1070, 24, "▾", fontBold, 18, "#194849");
  }

  // -------------------------------------------------------------------------
  // 11. FINAL CTA BANNER & FOOTER (y: 7014, h: 576)
  // -------------------------------------------------------------------------
  const ctaSec = createFrame("11 - Final CTA & Footer", master, 0, 7014, 1440, 576, "#0C3738");

  // Call to action card
  const ctaCard = createFrame("CTA Card", ctaSec, 160, 40, 1120, 240, "#194849", 28);
  await createText(ctaCard, 80, 50, "Devuélvele a tu práctica médica el tiempo que merece.", fontTitle, 34, "#FFFEFA");
  await createText(ctaCard, 80, 105, "Únete a los especialistas que ya atienden sin estrés de transcripción ni papeles.", fontBody, 16, "#DDECED");
  const ctaBtnFinal = createFrame("Btn Final", ctaCard, 80, 150, 250, 52, "#FFFEFA", 999);
  await createText(ctaBtnFinal, 44, 16, "Comenzar gratis hoy", fontBold, 14, "#0C3738");

  // Footer strip
  const footer = createFrame("Footer Strip", ctaSec, 0, 330, 1440, 246, "#0A2C2D");
  await createText(footer, 160, 40, "UMIA 3.0", fontBold, 22, "#FFFEFA");
  await createText(footer, 160, 75, "La plataforma clínica con IA agéntica para médicos en Latam.", fontBody, 13, "#B7D8D9");
  await createText(footer, 160, 170, "© 2026 UMIA Health Inc. Todos los derechos reservados. HIPAA & HL7 Compliant.", fontBody, 12, "#757575");

  // Columnas de navegación del Footer
  const footCols = [
    { title: "Producto", items: ["Scribe Clínico IA", "Récipes con QR", "Visor DICOM", "Agenda"] },
    { title: "Seguridad", items: ["Certificación HIPAA", "Estándar HL7", "Cifrado 256-bit", "Auditoría"] },
    { title: "Compañía", items: ["Sobre Nosotros", "Contacto", "Embajadores", "Términos & Privacidad"] },
  ];
  for (let c = 0; c < footCols.length; c++) {
    const colX = 680 + c * 200;
    await createText(footer, colX, 40, footCols[c].title, fontBold, 14, "#FFFEFA");
    for (let r = 0; r < footCols[c].items.length; r++) {
      await createText(footer, colX, 75 + r * 26, footCols[c].items[r], fontBody, 13, "#B7D8D9");
    }
  }

  // Zoom al frame generado
  figma.viewport.scrollAndZoomIntoView([master]);
  console.log("✅ Landing Page UMIA 3.0 generada exitosamente en Figma!");
})();
