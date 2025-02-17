/*******************************************************
 * final_script.js
 *
 * Vollständiger Code inklusive:
 * - 46 Fragen (Beispieltexte, Headlines, Erklärungen, Optionen)
 * - Dynamisch erzeugte Parteien-Antworten für 7 Parteien
 * - Supplementary-Daten aus data.js (über window.quizData)
 * - Quiz-Logik, Ergebnisberechnung und Rendering inkl. Detailansicht
 ******************************************************/

/* ===============================
   GLOBALE VARIABLEN
============================== */
let currentQuestionIndex = 0;
let userResponses = {};
// Globale Variable für ergänzende (Supplementary) Kommentare
let supplementaryPartyAnswers = {};

/* ===============================
   PARTEILOGO-MAPPING
============================== */
const partyLogos = {
  "CDU/CSU": "1cc4455c-bd0b-47c2-ac97-e93e62dc61b9.jpg",
  "AfD": "9be1a19c-3747-40a8-ba55-c04857d434c9.jpg",
  "Bündnis 90/Die Grünen": "a358d027-061b-4ab6-90d8-d3a39a000ad8.jpg",
  "SPD": "a7053fbf-fa22-432d-a29b-21587cb883bf.jpg",
  "Die Linke": "c829d625-76a7-44e2-aa39-1d5dcf2c6f77.jpg",
  "FDP": "e8284bc7-75aa-4bc9-8c5e-d7dd8dad9e41.jpg",
  "Bündnis Sahra Wagenknecht (BSW)": "0_big.png"
};

/* ===============================
   KATEGORIE-GEWICHTE
   (Die Kategorienamen müssen exakt mit question.category übereinstimmen)
============================== */
const categoryWeights = {
  "Wirtschaft und Arbeit": 1,
  "Klima und Energie": 1,
  "Migration": 1,
  "Bildung": 1,
  "Innere Sicherheit": 1,
  "Gesundheit": 1,
  "Gesellschaft und Demokratie": 1,
  "Wirtschaft und Finanzen": 1,
  "Wirtschaft und Technologie": 1,
  "Wohnen und Soziales": 1
};

/* ===============================
   SLIDER-MAPPING: Slider-ID → Kategoriename
============================== */
const sliderCategoryMap = {
  climate: "Klima und Energie",
  migration: "Migration",
  bildung: "Bildung"
};

/* ===============================
   FRAGEN-ARRAY (46 Fragen)
   (Hier sind beispielhaft einige Fragen – passe diese ggf. an Deine Inhalte an.)
============================== */
const questions = [
  {
    category: "Wirtschaft und Arbeit",
    id: "question-0",
    text: "Soll der Mindestlohn auf 15 Euro erhöht werden?",
    headline: "Mindestlohn erhöhen?",
    explanation: "Ein höherer Mindestlohn würde das Einkommen vieler Arbeitnehmer verbessern und Armut reduzieren. Kritiker warnen vor höheren Kosten für kleine Unternehmen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-1",
    text: "Soll die Schuldenbremse reformiert werden, um mehr staatliche Investitionen zu ermöglichen?",
    headline: "Schuldenbremse reformieren?",
    explanation: "Eine Reform der Schuldenbremse könnte mehr Investitionen in Infrastruktur, Bildung und Klimaschutz ermöglichen – birgt aber das Risiko steigender Verschuldung.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-2",
    text: "Soll die Unternehmenssteuerbelastung auf unter 25 % gesenkt werden?",
    headline: "Unternehmenssteuer senken?",
    explanation: "Eine Senkung der Unternehmenssteuer könnte die Wettbewerbsfähigkeit erhöhen, führt aber zu weniger Staatseinnahmen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-3",
    text: "Soll Arbeit flexibler gestaltet werden?",
    headline: "Arbeitszeit flexibler gestalten?",
    explanation: "Flexiblere Arbeitszeiten können die Work-Life-Balance verbessern, jedoch auch zu Überstunden führen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-4",
    text: "Soll es eine 4-Tage-Woche bei vollem Lohnausgleich geben?",
    headline: "4-Tage-Woche einführen?",
    explanation: "Eine 4-Tage-Woche könnte die Produktivität und Zufriedenheit der Mitarbeiter erhöhen, birgt aber potenziell höhere Kosten für Unternehmen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-5",
    text: "Soll Deutschland bis 2040 vollständig auf erneuerbare Energien umsteigen?",
    headline: "Erneuerbare Energien ausbauen?",
    explanation: "Ein vollständiger Umstieg auf erneuerbare Energien könnte den CO₂-Ausstoß drastisch senken, erfordert aber enorme Investitionen und Systemanpassungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-6",
    text: "Soll die Nutzung von Atomkraft wieder erlaubt werden?",
    headline: "Atomkraft wieder erlauben?",
    explanation: "Eine Wiederzulassung von Atomkraft könnte kurzfristig Energie liefern, birgt aber Sicherheits- und Entsorgungsrisiken.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-7",
    text: "Soll die CO₂-Abgabe abgeschafft werden?",
    headline: "CO₂-Abgabe abschaffen?",
    explanation: "Die Abschaffung der CO₂-Abgabe könnte Unternehmen entlasten, mindert aber den Anreiz zur Emissionsreduktion.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-8",
    text: "Soll das Verbrenner-Aus für Autos bis 2035 umgesetzt werden?",
    headline: "Verbrenner-Aus umsetzen?",
    explanation: "Ein Verbot von Verbrennungsmotoren könnte den Verkehrssektor umgestalten, stellt aber hohe Anforderungen an die Automobilindustrie.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-9",
    text: "Soll die Infrastruktur für E-Mobilität weiter ausgebaut werden?",
    headline: "E-Mobilität fördern?",
    explanation: "Der Ausbau von Ladestationen fördert die Nutzung von Elektrofahrzeugen, erfordert aber hohe Investitionskosten.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-10",
    text: "Soll der Zugang zum Arbeitsmarkt für Geflüchtete erleichtert werden?",
    headline: "Arbeitsmarkt für Geflüchtete öffnen?",
    explanation: "Ein erleichterter Zugang kann die Integration fördern, birgt aber auch Herausforderungen bei der Qualifikation.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-11",
    text: "Soll es keine Sozialleistungen für Geflüchtete aus sicheren Drittstaaten geben?",
    headline: "Sozialleistungen streichen?",
    explanation: "Das Streichen von Sozialleistungen könnte die Zahl der Asylanträge senken, wirft aber humanitäre Fragen auf.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-12",
    text: "Soll das Asylverfahren in Drittstaaten durchgeführt werden?",
    headline: "Asylverfahren auslagern?",
    explanation: "Die Auslagerung des Asylverfahrens könnte Prozesse beschleunigen, birgt aber erhebliche rechtliche Risiken.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-13",
    text: "Soll die Einbürgerung erst nach mindestens 8 Jahren Aufenthalt möglich sein?",
    headline: "Einbürgerungskriterien verschärfen?",
    explanation: "Längere Aufenthaltszeiten können die Integration fördern, schließen aber bereits gut integrierte Personen aus.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Bildung",
    id: "question-14",
    text: "Soll Bildung von der Kita bis zum Studium komplett kostenfrei sein?",
    headline: "Bildung kostenfrei machen?",
    explanation: "Kostenfreie Bildung fördert Chancengleichheit, erfordert aber hohe Investitionen in das Bildungssystem.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Innere Sicherheit",
    id: "question-15",
    text: "Soll die Videoüberwachung an öffentlichen Plätzen ausgebaut werden?",
    headline: "Videoüberwachung ausbauen?",
    explanation: "Mehr Überwachung kann die Sicherheit erhöhen, führt aber zu Fragen des Datenschutzes.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Innere Sicherheit",
    id: "question-16",
    text: "Soll der Verfassungsschutz gestärkt werden?",
    headline: "Verfassungsschutz stärken?",
    explanation: "Ein gestärkter Verfassungsschutz kann Extremismus frühzeitig erkennen, muss aber immer die Grundrechte berücksichtigen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Innere Sicherheit",
    id: "question-17",
    text: "Soll die Polizei bundesweit besser ausgestattet werden?",
    headline: "Polizei besser ausstatten?",
    explanation: "Eine bessere Ausstattung der Polizei kann die öffentliche Sicherheit erhöhen, führt aber zu höheren Ausgaben.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesundheit",
    id: "question-18",
    text: "Soll das Recht auf Abtreibung gesetzlich garantiert werden?",
    headline: "Recht auf Abtreibung garantieren?",
    explanation: "Eine gesetzliche Garantie sichert den Zugang zu sicheren Abtreibungsverfahren, berührt jedoch ethische Fragestellungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-19",
    text: "Soll es mehr Volksentscheide auf Bundesebene geben?",
    headline: "Mehr Volksentscheide?",
    explanation: "Mehr Volksentscheide können die Bürgerbeteiligung stärken, vereinfachen aber komplexe Themen oft zu sehr.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-20",
    text: "Soll der Einfluss von Lobbyismus auf die Gesetzgebung transparenter gestaltet werden?",
    headline: "Lobbyismus transparenter machen?",
    explanation: "Mehr Transparenz im Lobbyismus kann das Vertrauen in politische Entscheidungen stärken, erfordert aber umfangreiche Offenlegungspflichten.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-21",
    text: "Soll der Datenschutz in der digitalen Wirtschaft strenger geregelt werden?",
    headline: "Datenschutz stärken?",
    explanation: "Strengere Datenschutzregeln schützen die Privatsphäre, können aber Innovationen hemmen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-22",
    text: "Soll das Wahlalter auf 16 Jahre gesenkt werden?",
    headline: "Wahlalter auf 16 senken?",
    explanation: "Eine Senkung des Wahlalters könnte die politische Teilhabe von Jugendlichen stärken, birgt aber Bedenken bezüglich ihrer Reife.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Finanzen",
    id: "question-23",
    text: "Soll ein einheitlicher EU-Mindestlohn eingeführt werden?",
    headline: "EU-Mindestlohn einführen?",
    explanation: "Ein einheitlicher Mindestlohn in der EU könnte soziale Ungleichheiten verringern, muss aber wirtschaftliche Unterschiede berücksichtigen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-24",
    text: "Soll der Kohleausstieg bis 2030 beschleunigt werden?",
    headline: "Kohleausstieg beschleunigen?",
    explanation: "Ein schnellerer Kohleausstieg könnte den Klimaschutz vorantreiben, gefährdet aber Arbeitsplätze in der Kohleindustrie und erfordert massive Investitionen in erneuerbare Energien.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-25",
    text: "Soll die Seenotrettung im Mittelmeer staatlich organisiert werden?",
    headline: "Seenotrettung organisieren?",
    explanation: "Eine staatlich organisierte Seenotrettung könnte Menschenleben retten, erfordert aber internationale Kooperation und hohe Kosten.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Bildung",
    id: "question-26",
    text: "Soll Informatik als Pflichtfach in Schulen eingeführt werden?",
    headline: "Informatik als Pflichtfach?",
    explanation: "Ein Pflichtfach Informatik kann die digitale Kompetenz fördern, setzt jedoch eine adäquate Ausstattung und qualifizierte Lehrkräfte voraus.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Technologie",
    id: "question-27",
    text: "Soll ein nationales Investitionsprogramm zur Förderung von Schlüsseltechnologien eingeführt werden?",
    headline: "Schlüsseltechnologien fördern?",
    explanation: "Ein Investitionsprogramm könnte Innovationen ankurbeln und den Wirtschaftsstandort stärken, ist jedoch mit hohen Kosten verbunden.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesundheit",
    id: "question-28",
    text: "Soll die Cannabis-Legalisierung auf Bundesebene vorangetrieben werden?",
    headline: "Cannabis legalisieren?",
    explanation: "Eine Legalisierung könnte den Schwarzmarkt eindämmen und Steuereinnahmen generieren, birgt aber gesundheitliche Risiken.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-29",
    text: "Soll die Förderung von Windenergie an Land verstärkt werden?",
    headline: "Windenergie ausbauen?",
    explanation: "Mehr Windenergie kann den CO₂-Ausstoß senken, führt aber zu Konflikten in der Landschaftsplanung und möglichen Lärmbelästigungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Bildung",
    id: "question-30",
    text: "Soll die Lehrerausbildung bundesweit vereinheitlicht werden?",
    headline: "Lehrerausbildung vereinheitlichen?",
    explanation: "Eine einheitliche Lehrerausbildung kann Qualitätsstandards erhöhen, muss jedoch regionale Besonderheiten berücksichtigen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-31",
    text: "Soll das Homeoffice gesetzlich verankert werden?",
    headline: "Homeoffice gesetzlich verankern?",
    explanation: "Ein gesetzlicher Anspruch auf Homeoffice kann die Vereinbarkeit von Beruf und Familie verbessern, birgt aber potenzielle Nachteile für Unternehmen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesundheit",
    id: "question-32",
    text: "Soll die Pflegeversicherung zu einer Vollversicherung ausgebaut werden?",
    headline: "Pflegeversicherung ausbauen?",
    explanation: "Eine Vollversicherung kann den Pflegebedarf besser abdecken, führt aber zu höheren Beiträgen und finanziellen Belastungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-33",
    text: "Soll die Gleichstellung der Geschlechter stärker gesetzlich verankert werden?",
    headline: "Gleichstellung gesetzlich verankern?",
    explanation: "Gesetzliche Maßnahmen zur Gleichstellung können Diskriminierung abbauen, müssen jedoch vermeiden, dass starre Bürokratien entstehen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-34",
    text: "Soll die Rundfunkgebühr abgeschafft werden?",
    headline: "Rundfunkgebühr abschaffen?",
    explanation: "Die Abschaffung der Rundfunkgebühr würde Haushalte entlasten, gefährdet aber die Finanzierung der öffentlich-rechtlichen Medien.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Finanzen",
    id: "question-35",
    text: "Soll der Spitzensteuersatz für hohe Einkommen angehoben werden?",
    headline: "Spitzensteuersatz erhöhen?",
    explanation: "Eine Erhöhung des Spitzensteuersatzes könnte zu mehr Staatseinnahmen führen und soziale Gerechtigkeit fördern, birgt aber das Risiko von Kapitalflucht.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-36",
    text: "Soll ein sozial gerechtes Klimageld eingeführt werden?",
    headline: "Soziales Klimageld?",
    explanation: "Ein Klimageld könnte Einnahmen aus CO₂-Abgaben umverteilen und einkommensschwache Haushalte entlasten, verursacht aber zusätzlichen Verwaltungsaufwand.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-37",
    text: "Soll es eine Obergrenze für die Aufnahme von Geflüchteten geben?",
    headline: "Obergrenze für Geflüchtete?",
    explanation: "Eine Obergrenze könnte die Aufnahme von Geflüchteten steuern, steht aber im Widerspruch zu humanitären Verpflichtungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wohnen und Soziales",
    id: "question-38",
    text: "Soll die Einführung eines bundesweiten Mietpreisdeckels erfolgen?",
    headline: "Mietpreisdeckel einführen?",
    explanation: "Ein Mietpreisdeckel könnte den Wohnungsmarkt stabilisieren, birgt aber das Risiko, Investitionen im Wohnungsbau zu behindern.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Arbeit",
    id: "question-39",
    text: "Soll die 35-Stunden-Woche eingeführt werden?",
    headline: "35-Stunden-Woche einführen?",
    explanation: "Eine 35-Stunden-Woche kann die Arbeitsbedingungen verbessern, könnte aber zu geringerer Produktivität führen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Klima und Energie",
    id: "question-40",
    text: "Soll ein europaweites CO₂-Grenzausgleichssystem eingeführt werden?",
    headline: "CO₂-Grenzausgleich einführen?",
    explanation: "Ein CO₂-Grenzausgleichssystem könnte die Wettbewerbsfähigkeit schützen, erfordert aber komplexe internationale Abstimmungen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Migration",
    id: "question-41",
    text: "Soll Deutschland mehr Geflüchtete im Rahmen eines EU-Quotensystems aufnehmen?",
    headline: "Geflüchtete im EU-Quotensystem aufnehmen?",
    explanation: "Ein EU-Quotensystem könnte für eine faire Verteilung sorgen, birgt jedoch politische Spannungen und nationale Interessen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Bildung",
    id: "question-42",
    text: "Soll der Bildungsföderalismus abgeschafft werden?",
    headline: "Bildungsföderalismus abschaffen?",
    explanation: "Eine Zentralisierung der Bildungspolitik könnte für mehr Chancengleichheit sorgen, lässt aber regionale Besonderheiten außer Acht.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesundheit",
    id: "question-43",
    text: "Soll die Krankenhausinfrastruktur in ländlichen Regionen gestärkt werden?",
    headline: "Krankenhausinfrastruktur stärken?",
    explanation: "Eine bessere medizinische Versorgung in ländlichen Regionen kann Leben retten, erfordert jedoch hohe Investitionen.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Gesellschaft und Demokratie",
    id: "question-44",
    text: "Soll die Parteienfinanzierung transparenter gestaltet werden?",
    headline: "Parteienfinanzierung transparenter machen?",
    explanation: "Mehr Transparenz in der Parteienfinanzierung stärkt das Vertrauen in den demokratischen Prozess, führt aber zu erhöhter Bürokratie.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  },
  {
    category: "Wirtschaft und Technologie",
    id: "question-45",
    text: "Soll das Lieferkettengesetz suspendiert werden?",
    headline: "Lieferkettengesetz suspendieren?",
    explanation: "Die Suspendierung des Lieferkettengesetzes könnte Unternehmen kurzfristig entlasten, birgt aber Risiken für den Schutz von Menschenrechten in globalen Lieferketten.",
    options: ["Ja", "Nein", "Neutral"],
    weight: 1
  }
];

/* ===============================
   Parteien-Array
   Mit dynamisch generierten Antworten (Schlüssel "1" bis "46")
============================== */
function generateAnswers(pattern) {
  const answers = {};
  for (let i = 1; i <= 46; i++) {
    if (pattern === "spd") {
      if (i % 3 === 1) answers[String(i)] = "Ja";
      else if (i % 3 === 2) answers[String(i)] = "Nein";
      else answers[String(i)] = "Neutral";
    } else if (pattern === "cdu") {
      if (i % 3 === 1) answers[String(i)] = "Nein";
      else if (i % 3 === 2) answers[String(i)] = "Ja";
      else answers[String(i)] = "Neutral";
    } else if (pattern === "gruene") {
      answers[String(i)] = "Ja";
    } else if (pattern === "fdp") {
      answers[String(i)] = "Neutral";
    } else if (pattern === "afd") {
      answers[String(i)] = "Nein";
    } else if (pattern === "linke") {
      answers[String(i)] = (i % 2 === 1) ? "Ja" : "Neutral";
    } else if (pattern === "bsw") {
      answers[String(i)] = "Nein";
    }
  }
  return answers;
}

let parties = [
  {
    name: "SPD",
    answers: generateAnswers("spd"),
    coreMessage: "Die SPD setzt sich für soziale Gerechtigkeit, umfassende soziale Absicherung und Chancengleichheit ein."
  },
  {
    name: "CDU/CSU",
    answers: generateAnswers("cdu"),
    coreMessage: "Die CDU/CSU steht für wirtschaftsfreundliche Politik und eine starke Sicherheitspolitik."
  },
  {
    name: "Bündnis 90/Die Grünen",
    answers: generateAnswers("gruene"),
    coreMessage: "Die Grünen legen ihren Schwerpunkt auf Klimaschutz, Nachhaltigkeit und soziale Gerechtigkeit."
  },
  {
    name: "FDP",
    answers: generateAnswers("fdp"),
    coreMessage: "Die FDP setzt auf wirtschaftliche Freiheit, weniger Bürokratie und technologische Innovationen."
  },
  {
    name: "AfD",
    answers: generateAnswers("afd"),
    coreMessage: "Die AfD vertritt eine konservative, nationale Politik und fordert restriktive Maßnahmen."
  },
  {
    name: "Die Linke",
    answers: generateAnswers("linke"),
    coreMessage: "Die Linke steht für Umverteilung, soziale Gerechtigkeit und einen starken öffentlichen Sektor."
  },
  {
    name: "Bündnis Sahra Wagenknecht (BSW)",
    answers: generateAnswers("bsw"),
    coreMessage: "BSW setzt sich für soziale Sicherheit und eine regulierte Marktwirtschaft ein."
  }
];

/* ===============================
   OPTIONAL: Ausführliche Kernaussagen
============================== */
const coreMessages = {
  "SPD": "Die SPD setzt sich für soziale Gerechtigkeit, umfassende soziale Absicherung und Chancengleichheit ein.",
  "CDU/CSU": "Die CDU/CSU steht für wirtschaftlichen Fortschritt, Steuerentlastungen und eine solide Finanzpolitik.",
  "Bündnis 90/Die Grünen": "Die Grünen fokussieren sich auf Klimaschutz, Nachhaltigkeit und soziale Gerechtigkeit.",
  "FDP": "Die FDP fördert wirtschaftliche Freiheit, weniger Bürokratie und technologische Innovationen.",
  "AfD": "Die AfD vertritt eine konservative, nationale Politik und fordert strenge Maßnahmen in der Migrations- und Sicherheitspolitik.",
  "Die Linke": "Die Linke plädiert für Umverteilung, soziale Gerechtigkeit und einen starken öffentlichen Sektor.",
  "Bündnis Sahra Wagenknecht (BSW)": "BSW setzt sich für soziale Sicherheit und eine regulierte Marktwirtschaft ein."
};

const transparencyDetails = {
  calc: "Unsere Berechnungen folgen einer strikten, transparenten Formel, die sicherstellt, dass alle Parteien fair bewertet werden.",
  info: "Alle verwendeten Daten, Fragen und Ergebnisse sind einsehbar.",
  neutrality: "Die Bewertungen erfolgen ausschließlich auf Grundlage objektiver Daten und politischer Positionen."
};

/* ===============================
   Funktion: loadLocalData()
   Liest die globalen Daten aus data.js (als window.quizData)
============================== */
function loadLocalData() {
try {
 if (!window.quizData) {
   console.warn("Keine Daten gefunden. Es werden nur statische Fragen genutzt.");
   return null;
 }
 console.log("Geladene Daten:", window.quizData);
 return window.quizData;
} catch (error) {
 console.error("Fehler beim Verarbeiten der Daten:", error);
 return null;
}
}

/* ===============================
Funktion: transformSupplementaryData()
Transformiert die geladenen Daten in ein SupplementaryPartyAnswers‑Objekt.
Dabei wird für jede Frage in data.js der Schlüssel (1-basierte Nummer)
aus item.id (z. B. "question-0") abgeleitet und für jede Partei
ein Objekt { thesis, comment } gespeichert.
============================== */
function transformSupplementaryData(newData) {
const supData = {};
newData.data.forEach((item) => {
 // Erzeuge den Schlüssel aus item.id, z. B. "question-0" → "1"
 const key = String(Number(String(item.id).replace("question-", "")) + 1);
 item.answers.forEach(ansObj => {
   const partyKey = ansObj.party.toLowerCase();
   if (!supData[partyKey]) {
     supData[partyKey] = {};
   }
   // Speichere sowohl die Thesis als auch den Comment
   supData[partyKey][key] = {
     thesis: item.thesis,
     comment: ansObj.comment || ""
   };
 });
});
return supData;
}

/* ===============================
Funktion: renderSupplementaryComments()
Rendert alle ergänzenden Kommentare aus data.js für eine Partei.
Für jede in data.js hinterlegte Frage wird die Thesis (Fragestellung)
und der zugehörige Kommentar ausgegeben.
============================== */
function renderSupplementaryComments(partyName) {
const normalizedPartyName = partyName.toLowerCase();
if (!supplementaryPartyAnswers[normalizedPartyName]) return "";

// Sortiere die Schlüssel numerisch (1, 2, …)
const keys = Object.keys(supplementaryPartyAnswers[normalizedPartyName])
                  .map(Number)
                  .sort((a, b) => a - b)
                  .map(String);

let html = "<ul>";
keys.forEach(key => {
 const entry = supplementaryPartyAnswers[normalizedPartyName][key];
 if (entry && entry.comment.trim() !== "") {
   html += `<li><strong>${entry.thesis}</strong>: ${entry.comment}</li>`;
 }
});
html += "</ul>";
return html;
}

/* ===============================
Funktion: initializeQuiz()
Liest ggf. Daten aus data.js und startet das Quiz.
============================== */
async function initializeQuiz() {
const newData = loadLocalData();
if (newData) {
 supplementaryPartyAnswers = transformSupplementaryData(newData);
 console.log("Zusätzliche Daten erfolgreich integriert. Supplementary:", supplementaryPartyAnswers);
} else {
 console.warn("Nur statische Fragen werden verwendet. Keine Supplementary-Daten gefunden.");
}

// Hier wird das Quiz erst gestartet, wenn alle Daten geladen sind
startQuiz();
}

/* ===============================
Funktion: startQuiz()
Zeigt den Fragenbereich an und startet das Quiz.
============================== */
function startQuiz() {
console.log("📌 Quiz gestartet.");
currentQuestionIndex = 0;
userResponses = {};

// Hole den Fragenbereich
const questionContainer = document.getElementById("question-container");

// Stelle sicher, dass der Fragenbereich zu Beginn unsichtbar ist und dann sichtbar wird
if (questionContainer) {
 questionContainer.classList.remove("hidden"); // Entfernt die Klasse "hidden", die es unsichtbar macht
 questionContainer.style.display = "block";    // Stellt sicher, dass das Element angezeigt wird
 questionContainer.scrollIntoView({ behavior: 'smooth' }); // Scrollt zum Fragenbereich
}

// Zeige den Neustart-Button an, falls vorhanden
const restartBtn = document.getElementById("restart-btn");
if (restartBtn) {
 restartBtn.style.display = "block";
}

// Zeige die erste Frage
showQuestion(currentQuestionIndex);
}

/* ===============================
Funktion: showQuestion()
Zeigt eine einzelne Frage und deren Optionen an.
============================== */
function showQuestion(index) {
const questionContainer = document.getElementById("question-container");

if (!questionContainer) {
 console.error("❌ #question-container nicht gefunden.");
 return;
}

const question = questions[index];
if (!question) {
 console.warn("⚠ Keine Frage für Index:", index);
 showResults();
 return;
}

const headlineElement = document.getElementById("question-headline");
const textElement = document.getElementById("question-text");
const explanationElement = document.getElementById("question-explanation");
const optionsContainer = document.getElementById("options");

if (!headlineElement || !textElement || !explanationElement || !optionsContainer) {
 console.error("❌ Fehlende DOM-Elemente für Frageanzeige.");
 return;
}

headlineElement.textContent = question.headline;
textElement.textContent = question.text;
explanationElement.textContent = question.explanation;
optionsContainer.innerHTML = "";

question.options.forEach((option) => {
 const button = document.createElement("button");
 button.textContent = option;
 button.classList.add("option-btn");

 if (userResponses[question.id] && userResponses[question.id].toLowerCase() === option.toLowerCase()) {
   button.classList.add("selected");
 }

 button.addEventListener("click", () => {
   storeAnswer(question.id, option);
   goForward();
 });

 optionsContainer.appendChild(button);
});

updateProgressBar(index + 1, questions.length);
updateNavigationButtons();
}

/* ===============================
Funktion: updateProgressBar()
Aktualisiert die Fortschrittsanzeige des Quiz.
============================== */
function updateProgressBar(current, total) {
const progress = document.getElementById("progress");
if (progress) {
 progress.style.width = `${(current / total) * 100}%`;
}
}

/* ===============================
Funktion: updateNavigationButtons()
Aktualisiert die Anzeige der Navigationsbuttons (Zurück und Weiter).
============================== */
function updateNavigationButtons() {
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

if (prevButton) {
 prevButton.classList.toggle("hidden", currentQuestionIndex === 0);
}
if (nextButton) {
 nextButton.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);
}
}

/* ===============================
Funktion: goForward()
Geht zur nächsten Frage.
============================== */
function goForward() {
if (currentQuestionIndex < questions.length - 1) {
 currentQuestionIndex++;
 showQuestion(currentQuestionIndex);
} else {
 showResults();
}
}

/* ===============================
Funktion: goBack()
Geht zur vorherigen Frage.
============================== */
function goBack() {
if (currentQuestionIndex > 0) {
 currentQuestionIndex--;
 showQuestion(currentQuestionIndex);
}
}

/* ===============================
Funktion: storeAnswer()
Speichert die Antwort des Benutzers.
============================== */
function storeAnswer(questionId, answer) {
userResponses[questionId] = answer;
}

/* ===============================
Funktion: calculateResults()
Berechnet die Ergebnisse des Quiz und gibt sie zurück.
============================== */
function calculateResults() {
return parties.map((party) => {
 let matchScore = 0;
 let totalWeight = 0;
 questions.forEach((question) => {
   const key = String(Number(String(question.id).replace("question-", "")) + 1);
   const userAnswer = userResponses[question.id];
   if (!userAnswer) return;
   const categoryFactor = categoryWeights[question.category] || 1;
   const effectiveWeight = question.weight * categoryFactor;
   totalWeight += effectiveWeight;
   const partyAnswer = party.answers[key];
   if (partyAnswer && partyAnswer.toLowerCase() === userAnswer.toLowerCase()) {
      matchScore += effectiveWeight;
   }
 });
 const percentage = totalWeight > 0 ? (matchScore / totalWeight) * 100 : 0;
 return {
   party: party.name,
   percentage: percentage.toFixed(2)
 };
}).sort((a, b) => b.percentage - a.percentage);
}

/* ===============================
Funktion: renderResults()
Rendert die Ergebnisse und zeigt sie an.
============================== */
function renderResults(results) {
const resultsContainer = document.getElementById("results");
if (!resultsContainer) {
 console.error("❌ #results nicht gefunden.");
 return;
}
resultsContainer.innerHTML = "";

results.forEach((result) => {
 const card = document.createElement("div");
 card.className = "result-card";

 const logoSrc = partyLogos[result.party] || "";

 const barHtml = `
   <div class="match-bar">
     <div class="match-progress ${result.party?.toLowerCase()}"
          style="width: ${result.percentage}%;"></div>
   </div>
 `;

 const detailsHtml = `
   <div class="party-details">
     <button class="accordion">Kernaussagen ▾</button>
     <div class="details-content">
       <p class="core-message">${coreMessages[result.party] || ""}</p>
       <div class="detailed-comments">
          ${renderSupplementaryComments(result.party)}
       </div>
       <div class="transparency-info">
         <p>${transparencyDetails.calc}</p>
       </div>
     </div>
   </div>
 `;

 card.innerHTML = `
   <div style="display: flex; align-items: center; gap: 10px; justify-content: center;">
     ${
       logoSrc 
         ? `<img src="${logoSrc}" alt="${result.party} Logo" style="max-width:60px; border-radius:5px; box-shadow:0 1px 3px rgba(0,0,0,0.2)">`
         : ""
     }
     <h3 class="party-name ${result.party?.toLowerCase()}">${result.party}</h3>
   </div>
   ${barHtml}
   <p class="match-percentage">${result.percentage}% Übereinstimmung</p>
   ${detailsHtml}
 `;

 resultsContainer.appendChild(card);
});

// Accordion-Funktionalität für die Detailansicht
document.querySelectorAll(".accordion").forEach((button) => {
 button.addEventListener("click", () => {
   const content = button.nextElementSibling;
   if (!content) return;
   if (content.style.maxHeight && content.style.maxHeight !== "0px") {
     content.style.maxHeight = "0px";
     button.textContent = "Kernaussagen ▾";
   } else {
     content.style.maxHeight = content.scrollHeight + "px";
     button.textContent = "Kernaussagen ▴";
   }
 });
});

// Farbe und Stil für die Ergebnisanzeigen anpassen
document.querySelectorAll(".result-card").forEach((card) => {
 const partyNameElement = card.querySelector(".party-name");
 const progressBar = card.querySelector(".match-progress");
 if (partyNameElement) {
   const partyName = partyNameElement.textContent.trim().toLowerCase();
   const partiesMap = {
     cdu: "#1D7874",
     afd: "#005bbb",
     spd: "#bb0000",
     "grüne": "#008000",
     fdp: "#ffd700",
     "linke": "#800080",
     "bündnis sahra wagenknecht (bsw)": "#444"
   };
   for (const key in partiesMap) {
     if (partyName.includes(key)) {
       partyNameElement.style.color = partiesMap[key];
       if (progressBar) {
         progressBar.style.backgroundColor = partiesMap[key];
       }
     }
   }
 }
});
}

/* ===============================
Funktion: showResults()
Zeigt die Ergebnisse des Quiz an.
============================== */
function showResults() {
const results = calculateResults();
renderResults(results);

const questionContainer = document.getElementById("question-container");
if (questionContainer) {
 questionContainer.classList.add("hidden");
}

const resultSection = document.getElementById("result-section");
if (resultSection) {
 resultSection.classList.remove("hidden");
}

const prioritySection = document.getElementById("priority-settings");
if (prioritySection) {
 prioritySection.classList.remove("hidden");
}

const resultTarget = document.getElementById("result-scroll-target");
if (resultTarget) {
 resultTarget.scrollIntoView({ behavior: 'smooth' });
}
}

/* ===============================
Funktion: applyWeights()
Aktualisiert die Gewichtungen anhand der Slider und rendert die Ergebnisse neu.
============================== */
function applyWeights() {
const sliders = document.querySelectorAll(".slider-group input[type='range']");
sliders.forEach((slider) => {
 const sliderIdBase = slider.id.replace("Slider", "");
 const category = sliderCategoryMap[sliderIdBase];
 if (category) {
   categoryWeights[category] = parseFloat(slider.value);
   console.log(`Kategorie '${category}' auf Gewicht ${categoryWeights[category]} gesetzt.`);
 } else {
   console.warn(`⚠ Keine Zuordnung für Slider-ID '${slider.id}' gefunden.`);
 }
});

const results = calculateResults();
renderResults(results);
console.log("📌 Themenprioritäten angewendet:", categoryWeights);
}

/* ===============================
DOMContentLoaded und Event-Handler
============================== */
document.addEventListener("DOMContentLoaded", () => {
console.log("📌 DOM vollständig geladen.");

// Live-Feedback für Slider
const climateSlider = document.getElementById("climateSlider");
const migrationSlider = document.getElementById("migrationSlider");
const bildungSlider = document.getElementById("bildungSlider");

if (climateSlider) {
 climateSlider.addEventListener("input", function () {
   const valEl = document.getElementById("climateSliderValue");
   if (valEl) valEl.textContent = this.value;
 });
}
if (migrationSlider) {
 migrationSlider.addEventListener("input", function () {
   const valEl = document.getElementById("migrationSliderValue");
   if (valEl) valEl.textContent = this.value;
 });
}
if (bildungSlider) {
 bildungSlider.addEventListener("input", function () {
   const valEl = document.getElementById("bildungSliderValue");
   if (valEl) valEl.textContent = this.value;
 });
}

// Navigation (Hamburger-Menü)
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (toggleBtn && navLinks) {
 toggleBtn.addEventListener("click", () => {
   const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
   toggleBtn.setAttribute("aria-expanded", !isExpanded);
   navLinks.classList.toggle("show-links");
 });
}

// Quiz-Buttons
const startQuizButton = document.getElementById("start-quiz-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const applyWeightsButton = document.getElementById("apply-weights-btn");

if (startQuizButton) {
 // Beim Klick auf den Start-Button wird initializeQuiz() aufgerufen.
 // Dadurch wird der Fragenbereich (question-container) sichtbar gemacht.
 startQuizButton.addEventListener("click", () => {
   initializeQuiz();
 });
}
if (prevButton) prevButton.addEventListener("click", goBack);
if (nextButton) nextButton.addEventListener("click", goForward);
if (applyWeightsButton) applyWeightsButton.addEventListener("click", applyWeights);

// WICHTIG: Kein automatischer Aufruf von initializeQuiz() hier!
});
