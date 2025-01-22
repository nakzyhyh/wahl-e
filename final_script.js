// Vollständiger Fragenkatalog und Parteienzuordnung
let currentQuestionIndex = 0;
let userResponses = {};

const questions = [
    {
        category: "Wirtschaft und Arbeit",
        id: 1,
        text: "Soll der Mindestlohn auf 15 Euro erhöht werden?",
        headline: "Mindestlohn erhöhen?",
        explanation: "Ein höherer Mindestlohn würde das Einkommen von Millionen Arbeitern verbessern, insbesondere im Niedriglohnsektor. Dies könnte die Lebensqualität vieler Menschen erheblich steigern, insbesondere in wirtschaftlich schwachen Regionen. Gleichzeitig könnten Unternehmen, insbesondere kleine und mittlere Betriebe, durch höhere Lohnkosten belastet werden, was potenziell zu einem Rückgang von Arbeitsplätzen oder steigenden Preisen führen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 2,
        text: "Soll die Schuldenbremse reformiert werden, um mehr staatliche Investitionen zu ermöglichen?",
        headline: "Schuldenbremse reformieren?",
        explanation: "Eine Reform der Schuldenbremse könnte es dem Staat ermöglichen, mehr in Infrastruktur, Bildung und Klimaschutz zu investieren, was langfristig wirtschaftliches Wachstum fördern könnte. Kritiker befürchten jedoch, dass dies zu einer höheren Staatsverschuldung führt, die zukünftige Generationen belasten könnte. Befürworter argumentieren, dass Investitionen in nachhaltige Projekte höhere Schulden rechtfertigen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 3,
        text: "Soll die Unternehmenssteuerbelastung auf unter 25 % gesenkt werden?",
        headline: "Unternehmenssteuer senken?",
        explanation: "Eine Senkung der Unternehmenssteuer könnte die Wettbewerbsfähigkeit von Unternehmen stärken und Investitionen anregen, was positive Effekte auf den Arbeitsmarkt haben könnte. Gleichzeitig könnten dadurch Steuereinnahmen des Staates sinken, was weniger finanzielle Mittel für öffentliche Projekte und Dienstleistungen bedeuten könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 4,
        text: "Soll Arbeit flexibler gestaltet werden, etwa durch eine wöchentliche statt tägliche Höchstarbeitszeit?",
        headline: "Arbeitszeit flexibler gestalten?",
        explanation: "Flexiblere Arbeitszeiten könnten Arbeitnehmern helfen, ihre beruflichen und privaten Verpflichtungen besser zu vereinbaren, und könnten die Produktivität durch eine Anpassung an individuelle Arbeitsrhythmen steigern. Kritiker warnen jedoch, dass dies den Druck auf Arbeitnehmer erhöhen könnte, Überstunden zu leisten, und die Erholung beeinträchtigen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 5,
        text: "Soll es eine 4-Tage-Woche bei vollem Lohnausgleich geben?",
        headline: "4-Tage-Woche einführen?",
        explanation: "Die Einführung einer 4-Tage-Woche könnte die Work-Life-Balance verbessern, Stress reduzieren und die Produktivität steigern. Kritiker argumentieren, dass dies für Unternehmen kostspielig sein könnte, insbesondere in arbeitsintensiven Branchen, und dass eine solche Maßnahme ohne Produktivitätssteigerung wirtschaftlich schwer tragbar wäre.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 6,
        text: "Soll Deutschland bis 2040 zu 100 % auf erneuerbare Energien umsteigen?",
        headline: "Erneuerbare Energien ausbauen?",
        explanation: "Ein vollständiger Umstieg auf erneuerbare Energien könnte einen entscheidenden Beitrag zum Klimaschutz leisten und die Abhängigkeit von fossilen Brennstoffen reduzieren. Allerdings wären massive Investitionen in Infrastruktur und Technologien notwendig, und die Stabilität des Energiesystems müsste trotz der schwankenden Verfügbarkeit erneuerbarer Energien gewährleistet werden.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 7,
        text: "Soll die Nutzung von Atomkraft wieder erlaubt werden?",
        headline: "Atomkraft wieder erlauben?",
        explanation: "Atomkraft könnte als emissionsarme Energiequelle dazu beitragen, den Übergang zu einem CO₂-neutralen Energiesystem zu beschleunigen. Kritiker weisen jedoch auf die Risiken von Unfällen, die ungelöste Frage der Endlagerung von Atommüll und die hohen Kosten für Bau und Rückbau von Atomkraftwerken hin.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 8,
        text: "Soll die CO₂-Abgabe abgeschafft werden?",
        headline: "CO₂-Abgabe abschaffen?",
        explanation: "Die Abschaffung der CO₂-Abgabe könnte Unternehmen finanziell entlasten und wirtschaftliches Wachstum fördern, insbesondere in energieintensiven Branchen. Gleichzeitig könnte dies die Anreize zur Nutzung umweltfreundlicher Technologien und Verhaltensweisen schwächen, was den Klimaschutz beeinträchtigen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 9,
        text: "Soll das Verbrenner-Aus für Autos bis 2035 umgesetzt werden?",
        headline: "Verbrenner-Aus umsetzen?",
        explanation: "Ein Verbot von Verbrennungsmotoren könnte den Übergang zu emissionsarmen Fahrzeugen beschleunigen und die CO₂-Emissionen im Verkehr senken. Andererseits könnten Verbraucher und Industrie vor erheblichen Herausforderungen bei der Umstellung stehen, insbesondere in Regionen mit starker Automobilindustrie.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 10,
        text: "Soll die Infrastruktur für E-Mobilität weiter ausgebaut werden?",
        headline: "E-Mobilität fördern?",
        explanation: "Der Ausbau der Ladeinfrastruktur könnte die Akzeptanz von Elektrofahrzeugen steigern und die Energiewende im Verkehr unterstützen. Kritiker weisen jedoch auf die hohen Kosten, die ungleiche Verteilung von Ladestationen und potenzielle technische Herausforderungen hin.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 11,
        text: "Soll der Zugang zum Arbeitsmarkt für Geflüchtete erleichtert werden?",
        headline: "Arbeitsmarkt für Geflüchtete öffnen?",
        explanation: "Ein erleichterter Zugang zum Arbeitsmarkt könnte Geflüchteten die Integration in die Gesellschaft erleichtern und den bestehenden Fachkräftemangel in Deutschland abmildern. Dies könnte auch zur finanziellen Selbstständigkeit der Geflüchteten beitragen und die öffentlichen Ausgaben für Sozialleistungen senken. Kritiker warnen jedoch, dass ein erhöhter Wettbewerb auf dem Arbeitsmarkt für Spannungen sorgen könnte und es Herausforderungen bei der Qualifikationsanerkennung und Sprachbarrieren gibt.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 12,
        text: "Soll es keine Sozialleistungen für Geflüchtete geben, die aus sicheren Drittstaaten nach Deutschland einreisen?",
        headline: "Sozialleistungen für Geflüchtete streichen?",
        explanation: "Das Streichen von Sozialleistungen für Geflüchtete aus sicheren Drittstaaten könnte die Attraktivität Deutschlands als Ziel für Migration verringern und staatliche Ausgaben reduzieren. Allerdings könnten humanitäre Standards dadurch beeinträchtigt werden, was das internationale Ansehen Deutschlands schädigen könnte. Zudem könnte es die Integration erschweren und soziale Spannungen verstärken.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 13,
        text: "Soll Asylverfahren in Drittstaaten durchgeführt werden?",
        headline: "Asylverfahren auslagern?",
        explanation: "Die Verlagerung von Asylverfahren in Drittstaaten könnte das deutsche Asylsystem entlasten und die Verfahren beschleunigen. Allerdings gibt es rechtliche und ethische Bedenken hinsichtlich der Bedingungen in den Drittstaaten und der Verantwortung Deutschlands für den Schutz von Geflüchteten. Befürworter argumentieren, dass dies zu mehr Effizienz führen könnte, während Kritiker die Einhaltung internationaler Menschenrechtsstandards infrage stellen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 14,
        text: "Soll die Einbürgerung erst nach mindestens 8 Jahren Aufenthalt möglich sein?",
        headline: "Einbürgerungskriterien verschärfen?",
        explanation: "Strengere Einbürgerungskriterien könnten sicherstellen, dass Migranten besser in die Gesellschaft integriert sind, bevor sie die deutsche Staatsbürgerschaft erhalten. Kritiker argumentieren jedoch, dass längere Wartezeiten Migranten von der gesellschaftlichen Teilhabe ausschließen könnten, obwohl sie bereits lange in Deutschland leben und gut integriert sind.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Bildung",
        id: 15,
        text: "Soll Bildung von der Kita bis zum Studium komplett kostenfrei sein?",
        headline: "Bildung kostenfrei machen?",
        explanation: "Kostenfreie Bildung könnte Chancengleichheit fördern und sicherstellen, dass finanzielle Hürden keinen Einfluss auf den Bildungserfolg haben. Kritiker bemängeln jedoch die hohen Kosten für den Staat und mögliche Einschnitte bei der Bildungsqualität. Zusätzlich stellt sich die Frage, wie die Qualität und die Infrastruktur des Bildungssystems finanziert werden sollen, wenn keine Studien- oder Kitabeiträge erhoben werden.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Innere Sicherheit",
        id: 16,
        text: "Soll die Videoüberwachung an öffentlichen Plätzen ausgebaut werden?",
        headline: "Videoüberwachung ausbauen?",
        explanation: "Der Ausbau der Videoüberwachung an öffentlichen Plätzen könnte die Sicherheit erhöhen, indem Straftaten schneller erkannt und aufgeklärt werden. Kritiker sehen jedoch die Gefahr eines Eingriffs in die Privatsphäre und die Möglichkeit eines Missbrauchs der gesammelten Daten. Zudem könnte eine übermäßige Überwachung das Gefühl von Kontrolle und Unfreiheit in der Bevölkerung verstärken.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Innere Sicherheit",
        id: 17,
        text: "Soll der Verfassungsschutz gestärkt werden?",
        headline: "Verfassungsschutz stärken?",
        explanation: "Ein gestärkter Verfassungsschutz könnte dabei helfen, extremistisches Gedankengut frühzeitig zu erkennen und demokratische Strukturen besser zu schützen. Kritiker warnen jedoch vor möglichen Eingriffen in Grundrechte und befürchten, dass dies zu einer Überwachung und Stigmatisierung unbescholtener Bürger führen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Innere Sicherheit",
        id: 18,
        text: "Soll die Polizei bundesweit besser ausgestattet werden?",
        headline: "Polizei besser ausstatten?",
        explanation: "Eine bessere Ausstattung der Polizei könnte die öffentliche Sicherheit erhöhen und eine effektivere Verbrechensbekämpfung ermöglichen. Dies könnte auch die Arbeitsbedingungen der Polizisten verbessern. Kritiker warnen jedoch vor steigenden Kosten, einer möglichen Militarisierung der Polizei und dem Risiko, dass vermehrte Überwachung die Privatsphäre der Bürger beeinträchtigen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesundheit",
        id: 19,
        text: "Soll das Recht auf Abtreibung gesetzlich garantiert werden?",
        headline: "Recht auf Abtreibung garantieren?",
        explanation: "Die gesetzliche Garantie des Rechts auf Abtreibung könnte Frauen eine größere Selbstbestimmung und Sicherheit in Bezug auf ihre reproduktiven Rechte geben. Sie würde gewährleisten, dass Frauen Zugang zu sicheren und legalen Verfahren haben, unabhängig von ihrer finanziellen oder sozialen Lage. Kritiker argumentieren, dass dies ethische und religiöse Überzeugungen verletzen könnte und gesellschaftliche Spannungen erzeugen kann. Zudem könnte die Debatte darüber Einfluss auf die Finanzierung und Organisation des Gesundheitssystems haben.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 20,
        text: "Soll es mehr Volksentscheide auf Bundesebene geben?",
        headline: "Mehr Volksentscheide?",
        explanation: "Mehr Volksentscheide auf Bundesebene könnten die Bürgerbeteiligung stärken und das Vertrauen in die Demokratie fördern. Befürworter sehen darin eine Möglichkeit, die politischen Entscheidungen direkter an den Willen der Bevölkerung anzupassen. Kritiker warnen jedoch, dass komplexe politische Themen durch populistische Kampagnen vereinfacht werden könnten und dass Minderheiteninteressen in solchen Abstimmungen unterrepräsentiert sein könnten.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 21,
        text: "Soll der Einfluss von Lobbyismus auf die Gesetzgebung transparenter gestaltet werden?",
        headline: "Lobbyismus transparenter machen?",
        explanation: "Mehr Transparenz im Lobbyismus könnte das Vertrauen in politische Entscheidungen stärken und Interessenskonflikte aufdecken. Dies könnte durch verpflichtende Lobbyregister oder strengere Regeln für Treffen zwischen Lobbyisten und Entscheidungsträgern erreicht werden. Kritiker warnen jedoch, dass solche Maßnahmen zu einem hohen bürokratischen Aufwand führen könnten und möglicherweise nicht alle Einflussnahmen effektiv aufdecken.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 22,
        text: "Soll der Datenschutz in der digitalen Wirtschaft strenger geregelt werden?",
        headline: "Datenschutz stärken?",
        explanation: "Strengere Datenschutzregelungen könnten die Privatsphäre der Verbraucher besser schützen und das Vertrauen in digitale Dienste stärken. Dies könnte durch höhere Sicherheitsanforderungen oder strengere Regeln für den Umgang mit persönlichen Daten erreicht werden. Kritiker befürchten jedoch, dass solche Regelungen Innovationen hemmen könnten und die Wettbewerbsfähigkeit digitaler Unternehmen beeinträchtigen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 23,
        text: "Soll das Wahlalter auf 16 Jahre gesenkt werden?",
        headline: "Wahlalter auf 16 Jahre senken?",
        explanation: "Eine Senkung des Wahlalters könnte die politische Teilhabe von Jugendlichen stärken und ihre Interessen stärker in der Politik berücksichtigen. Befürworter argumentieren, dass junge Menschen durch moderne Bildungssysteme und den Zugang zu Informationen gut vorbereitet seien, politische Entscheidungen zu treffen. Kritiker sehen die Gefahr, dass viele Jugendliche nicht über die nötige politische Reife verfügen könnten, um fundierte Entscheidungen zu treffen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Finanzen",
        id: 24,
        text: "Soll ein einheitlicher EU-Mindestlohn eingeführt werden?",
        headline: "EU-Mindestlohn einführen?",
        explanation: "Ein einheitlicher EU-Mindestlohn könnte soziale Ungleichheiten zwischen den Mitgliedsstaaten reduzieren und den Lebensstandard vieler Arbeitnehmer verbessern. Dies könnte jedoch auch die Wettbewerbsfähigkeit von Unternehmen in Ländern mit niedrigeren Löhnen beeinträchtigen und regionale wirtschaftliche Unterschiede verstärken, da die Lebenshaltungskosten in der EU stark variieren.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 25,
        text: "Soll der Kohleausstieg bis 2030 beschleunigt werden?",
        headline: "Kohleausstieg beschleunigen?",
        explanation: "Ein schnellerer Kohleausstieg könnte die CO₂-Emissionen erheblich reduzieren und ein wichtiges Signal für den Klimaschutz senden. Kritiker befürchten jedoch, dass dies Arbeitsplätze in der Kohleindustrie gefährden und die Energieversorgungssicherheit beeinträchtigen könnte. Ein schnellerer Ausstieg erfordert zudem erhebliche Investitionen in alternative Energien und Infrastruktur.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 27,
        text: "Soll die Seenotrettung im Mittelmeer staatlich organisiert werden?",
        headline: "Seenotrettung staatlich organisieren?",
        explanation: "Eine staatlich organisierte Seenotrettung könnte dazu beitragen, Menschenleben zu retten und humanitäre Verpflichtungen zu erfüllen. Kritiker argumentieren jedoch, dass dies als Anreiz für mehr Migration über gefährliche Routen dienen könnte und eine umfassendere europäische Lösung erforderlich wäre, um die Ursachen der Migration zu bekämpfen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Bildung",
        id: 28,
        text: "Soll Informatik als Pflichtfach in Schulen eingeführt werden?",
        headline: "Informatik als Pflichtfach?",
        explanation: "Ein Pflichtfach Informatik könnte die digitale Kompetenz von Schülern stärken und sie besser auf die Anforderungen eines zunehmend digitalisierten Arbeitsmarktes vorbereiten. Kritiker bemängeln jedoch, dass der Lehrermangel und fehlende technische Ausstattung die Umsetzung erschweren könnten.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Technologie",
        id: 29,
        text: "Soll ein nationales Investitionsprogramm zur Förderung von Schlüsseltechnologien wie KI, Quantencomputing und Biotechnologie eingeführt werden?",
        headline: "Schlüsseltechnologien fördern?",
        explanation: "Ein nationales Investitionsprogramm könnte Deutschlands internationale Wettbewerbsfähigkeit in Schlüsseltechnologien wie KI, Quantencomputing und Biotechnologie sichern. Dies könnte nicht nur Innovationen fördern, sondern auch neue Arbeitsplätze schaffen und den Wirtschaftsstandort Deutschland stärken. Kritiker befürchten jedoch hohe Kosten und die Gefahr, dass Gelder ineffizient eingesetzt werden.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesundheit",
        id: 30,
        text: "Soll die Cannabis-Legalisierung auf Bundesebene vorangetrieben werden?",
        headline: "Cannabis legalisieren?",
        explanation: "Die Legalisierung von Cannabis könnte den Schwarzmarkt eindämmen, Steuereinnahmen generieren und die Qualitätssicherung verbessern. Kritiker warnen jedoch vor möglichen gesundheitlichen Folgen, insbesondere bei Jugendlichen, und einer erhöhten gesellschaftlichen Akzeptanz des Konsums.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 31,
        text: "Soll die Förderung von Windenergie an Land verstärkt werden?",
        headline: "Windenergie fördern?",
        explanation: "Die verstärkte Förderung von Windenergie an Land könnte die Energieunabhängigkeit Deutschlands erhöhen und einen wesentlichen Beitrag zum Klimaschutz leisten. Befürworter argumentieren, dass die Nutzung von Windkraft eine saubere und kostengünstige Energiequelle darstellt. Kritiker hingegen bemängeln den hohen Platzbedarf von Windrädern, potenzielle Lärmbelästigung und die Beeinträchtigung des Landschaftsbildes. Außerdem gibt es Widerstände aus der Bevölkerung, insbesondere in dicht besiedelten Regionen, und Fragen zur Entsorgung von alten Windturbinen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Bildung",
        id: 32,
        text: "Soll die Lehrerausbildung bundesweit vereinheitlicht werden?",
        headline: "Lehrerausbildung vereinheitlichen?",
        explanation: "Eine bundesweit einheitliche Lehrerausbildung könnte dazu beitragen, Qualitätsstandards zu heben und die Mobilität von Lehrkräften zwischen Bundesländern zu erleichtern. Befürworter sehen darin eine Möglichkeit, Unterschiede im Bildungssystem der Länder auszugleichen und die Chancengleichheit für Schüler zu verbessern. Kritiker warnen jedoch, dass eine Vereinheitlichung die regionalen Besonderheiten und spezifischen Bedürfnisse der Bundesländer vernachlässigen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 33,
        text: "Soll das Homeoffice gesetzlich verankert werden?",
        headline: "Homeoffice gesetzlich verankern?",
        explanation: "Eine gesetzliche Regelung für das Homeoffice könnte die Vereinbarkeit von Beruf und Familie verbessern und Pendelzeiten sowie Umweltbelastungen durch Verkehr reduzieren. Kritiker befürchten jedoch, dass ein gesetzlicher Anspruch auf Homeoffice die Flexibilität von Unternehmen einschränken und zu höheren Kosten für technische Ausstattung und Datenschutzmaßnahmen führen könnte. Außerdem könnte die soziale Isolation von Arbeitnehmern zunehmen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesundheit",
        id: 34,
        text: "Soll die Pflegeversicherung zu einer Vollversicherung ausgebaut werden?",
        headline: "Pflegeversicherung ausbauen?",
        explanation: "Ein Ausbau der Pflegeversicherung zu einer Vollversicherung könnte die finanzielle Belastung von Pflegebedürftigen und deren Familien erheblich reduzieren. Dies würde jedoch auch höhere Beiträge für alle Versicherten bedeuten und könnte das Finanzierungsmodell der Pflegeversicherung belasten. Kritiker warnen, dass eine Vollversicherung nicht zwangsläufig die Qualität der Pflege verbessert und innovative Ansätze zur Kostensenkung verdrängen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 35,
        text: "Soll die Gleichstellung der Geschlechter stärker gesetzlich verankert werden?",
        headline: "Gleichstellung gesetzlich verankern?",
        explanation: "Eine stärkere gesetzliche Verankerung der Gleichstellung der Geschlechter könnte dazu beitragen, Diskriminierung abzubauen und Frauen bessere Chancen in Beruf und Gesellschaft zu bieten. Befürworter sehen darin einen wichtigen Schritt hin zu mehr Gerechtigkeit. Kritiker argumentieren, dass gesetzliche Vorgaben allein nicht ausreichen, um gesellschaftliche Strukturen zu ändern, und dass solche Maßnahmen zu Bürokratisierung und möglicherweise neuen Ungerechtigkeiten führen könnten.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 36,
        text: "Soll die Rundfunkgebühr abgeschafft werden?",
        headline: "Rundfunkgebühr abschaffen?",
        explanation: "Die Abschaffung der Rundfunkgebühr könnte die finanzielle Belastung der Haushalte reduzieren. Kritiker warnen jedoch, dass dies die Unabhängigkeit und Qualität der öffentlich-rechtlichen Medien gefährden könnte. Ohne ausreichende Finanzierung könnten wichtige Bildungs- und Informationsangebote eingeschränkt werden, was langfristig die Medienvielfalt beeinträchtigen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Finanzen",
        id: 37,
        text: "Soll der Spitzensteuersatz für hohe Einkommen angehoben werden?",
        headline: "Spitzensteuersatz erhöhen?",
        explanation: "Eine Erhöhung des Spitzensteuersatzes könnte die staatlichen Einnahmen steigern und soziale Ungleichheiten verringern. Kritiker argumentieren, dass dies Investitionen hemmen und zur Abwanderung von Fachkräften und Kapital ins Ausland führen könnte. Befürworter sehen darin jedoch eine Möglichkeit, mehr Mittel für Bildung, Infrastruktur und soziale Projekte bereitzustellen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 38,
        text: "Soll ein sozial gerechtes Klimageld eingeführt werden?",
        headline: "Soziales Klimageld?",
        explanation: "Ein sozial gerechtes Klimageld könnte dazu beitragen, Einnahmen aus CO₂-Abgaben an die Bürger umzuverteilen und einkommensschwache Haushalte zu entlasten. Kritiker befürchten jedoch, dass die Verwaltungskosten hoch sein könnten und die Maßnahme allein nicht ausreicht, um klimapolitische Ziele zu erreichen. Zudem gibt es Diskussionen darüber, wie eine gerechte Verteilung gestaltet werden könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 39,
        text: "Soll es eine Obergrenze für die Aufnahme von Geflüchteten geben?",
        headline: "Obergrenze für Geflüchtete?",
        explanation: "Eine Obergrenze könnte die Aufnahmekapazitäten des Landes klar definieren und die Organisation von Ressourcen erleichtern. Kritiker argumentieren jedoch, dass eine Obergrenze gegen das individuelle Recht auf Asyl verstoßen könnte und dass humanitäre Verpflichtungen internationaler Abkommen missachtet werden könnten. Befürworter sehen darin eine Möglichkeit, die Zuwanderung besser zu steuern.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wohnen und Soziales",
        id: 40,
        text: "Soll die Einführung eines bundesweiten Mietpreisdeckels in angespannten Wohngebieten erfolgen?",
        headline: "Mietpreisdeckel einführen?",
        explanation: "Ein Mietpreisdeckel könnte Menschen in angespannten Wohngebieten vor übermäßigen Mietsteigerungen schützen und den Zugang zu bezahlbarem Wohnraum sichern. Kritiker argumentieren, dass dies Investitionen in den Wohnungsbau hemmen und den Wohnraummangel langfristig verschärfen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Wirtschaft und Arbeit",
        id: 41,
        text: "Soll die 35-Stunden-Woche eingeführt werden?",
        headline: "35-Stunden-Woche einführen?",
        explanation: "Kürzere Arbeitszeiten könnten die Work-Life-Balance der Arbeitnehmer verbessern und zu weniger Stress und Burnout führen. Kritiker befürchten jedoch, dass dies zu Produktivitätsverlusten und höheren Kosten für Unternehmen führen könnte, insbesondere in der Industrie.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Klima und Energie",
        id: 42,
        text: "Soll ein europaweites CO₂-Grenzausgleichssystem eingeführt werden?",
        headline: "CO₂-Grenzausgleich einführen?",
        explanation: "Ein CO₂-Grenzausgleich könnte europäische Hersteller vor Wettbewerbsvorteilen von Ländern ohne Klimaschutzmaßnahmen schützen. Kritiker befürchten jedoch, dass dies zu Handelskonflikten und höheren Kosten für Importe führen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Migration",
        id: 43,
        text: "Soll Deutschland mehr Geflüchtete im Rahmen eines EU-Quotensystems aufnehmen?",
        headline: "Geflüchtete im EU-Quotensystem aufnehmen?",
        explanation: "Eine gerechte Verteilung von Geflüchteten innerhalb der EU könnte humanitäre Verantwortung und Solidarität stärken. Kritiker sehen darin jedoch einen Anreiz für mehr Migration und befürchten eine Überlastung der Sozialsysteme.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Bildung",
        id: 44,
        text: "Soll der Bildungsföderalismus abgeschafft werden?",
        headline: "Bildungsföderalismus abschaffen?",
        explanation: "Eine Zentralisierung der Bildungspolitik könnte die Chancengleichheit verbessern und Unterschiede zwischen den Bundesländern reduzieren. Gegner argumentieren jedoch, dass regionale Besonderheiten und Bedürfnisse nicht mehr ausreichend berücksichtigt würden.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesundheit",
        id: 45,
        text: "Soll die Krankenhausinfrastruktur in ländlichen Regionen gestärkt werden?",
        headline: "Krankenhausinfrastruktur stärken?",
        explanation: "Die Stärkung der Krankenhausinfrastruktur in ländlichen Regionen könnte die medizinische Versorgung verbessern und gesundheitliche Ungleichheiten abbauen. Kritiker bemängeln jedoch, dass dies hohe Kosten verursachen könnte und eine effizientere Nutzung bestehender Ressourcen sinnvoller wäre.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        category: "Gesellschaft und Demokratie",
        id: 46,
        text: "Soll die Parteienfinanzierung transparenter gestaltet werden?",
        headline: "Parteienfinanzierung transparenter machen?",
        explanation: "Mehr Transparenz in der Parteienfinanzierung könnte das Vertrauen in politische Prozesse stärken und Interessenkonflikte offenlegen. Kritiker warnen jedoch vor einem erhöhten bürokratischen Aufwand und der Gefahr, dass dies zu einer Einschränkung der Finanzierungsmöglichkeiten führt.",
        options: ["Ja", "Nein", "Neutral"]
    }
];

const parties = [
    {
        name: "SPD",
        answers: {
            "1": "Ja", "2": "Ja", "3": "Neutral", "4": "Ja", "5": "Nein",
            "6": "Ja", "7": "Nein", "8": "Nein", "9": "Ja", "10": "Ja",
            "11": "Ja", "12": "Nein", "13": "Nein", "14": "Ja", "15": "Ja",
            "16": "Ja", "17": "Ja", "18": "Ja", "19": "Ja", "20": "Ja",
            "21": "Ja", "22": "Ja", "23": "Ja", "24": "Ja", "25": "Ja",
            "26": "Ja",  // <---- ACHTUNG: Frage 26 fehlt momentan.
            "27": "Ja", "28": "Ja", "29": "Nein", "30": "Ja",
            "31": "Ja", "32": "Ja", "33": "Ja", "34": "Ja", "35": "Ja",
            "36": "Nein", "37": "Ja", "38": "Ja", "39": "Ja", "40": "Ja",
            "41": "Ja", "42": "Ja", "43": "Ja", "44": "Ja", "45": "Ja",
            "46": "Ja"
        },
        coreMessage: "Die SPD setzt auf soziale Gerechtigkeit, Mindestlohn, Chancengleichheit und eine solidarische Gesellschaft."
    },
    {
        name: "CDU/CSU",
        answers: {
            "1": "Nein", "2": "Nein", "3": "Ja", "4": "Nein", "5": "Ja",
            "6": "Nein", "7": "Ja", "8": "Nein", "9": "Nein", "10": "Nein",
            "11": "Nein", "12": "Ja", "13": "Ja", "14": "Ja", "15": "Nein",
            "16": "Nein", "17": "Neutral", "18": "Nein", "19": "Nein",
            "20": "Nein", "21": "Neutral", "22": "Neutral", "23": "Nein",
            "24": "Neutral", "25": "Nein", "26": "Ja",  // <---- Hier ebenfalls
            "27": "Nein", "28": "Ja", "29": "Ja", "30": "Nein", "31": "Nein",
            "32": "Nein", "33": "Ja", "34": "Nein", "35": "Nein", "36": "Ja",
            "37": "Nein", "38": "Nein", "39": "Ja", "40": "Ja", "41": "Nein",
            "42": "Ja", "43": "Nein", "44": "Nein", "45": "Ja", "46": "Ja"
        },
        coreMessage: "Die CDU/CSU steht für wirtschaftsfreundliche Politik, sichere Grenzen und traditionelle Werte."
    },
    {
        name: "Bündnis 90/Die Grünen",
        answers: {
            "1": "Ja", "2": "Ja", "3": "Neutral", "4": "Neutral", "5": "Nein",
            "6": "Ja", "7": "Nein", "8": "Nein", "9": "Ja", "10": "Ja",
            "11": "Ja", "12": "Nein", "13": "Nein", "14": "Nein", "15": "Ja",
            "16": "Ja", "17": "Ja", "18": "Ja", "19": "Ja", "20": "Ja",
            "21": "Ja", "22": "Ja", "23": "Ja", "24": "Ja", "25": "Ja",
            "26": "Nein",
            "27": "Ja", "28": "Ja", "29": "Nein", "30": "Ja", "31": "Ja",
            "32": "Ja", "33": "Nein", "34": "Ja", "35": "Ja",
            "36": "Nein", "37": "Ja", "38": "Ja", "39": "Nein", "40": "Ja",
            "41": "Ja", "42": "Ja", "43": "Ja", "44": "Ja", "45": "Ja",
            "46": "Ja"
        },
        coreMessage: "Die Grünen legen ihren Schwerpunkt auf Klimaschutz, Nachhaltigkeit und soziale Gerechtigkeit."
    },
    {
        name: "FDP",
        answers: {
            "1": "Nein", "2": "Nein", "3": "Ja", "4": "Neutral", "5": "Ja",
            "6": "Nein", "7": "Ja", "8": "Ja", "9": "Nein", "10": "Ja",
            "11": "Neutral", "12": "Ja", "13": "Ja", "14": "Neutral",
            "15": "Nein", "16": "Nein", "17": "Ja", "18": "Nein",
            "19": "Nein", "20": "Neutral", "21": "Nein", "22": "Ja",
            "23": "Nein", "24": "Nein", "25": "Ja", "26": "Ja",
            "27": "Nein", "28": "Ja", "29": "Ja", "30": "Ja", "31": "Nein",
            "32": "Nein", "33": "Ja", "34": "Nein", "35": "Nein", "36": "Ja",
            "37": "Ja", "38": "Nein", "39": "Ja", "40": "Ja", "41": "Nein",
            "42": "Ja", "43": "Nein", "44": "Nein", "45": "Nein", "46": "Ja"
        },
        coreMessage: "Die FDP setzt auf Wirtschaftsliberalismus, Technologieoffenheit und persönliche Freiheit."
    },
    {
        name: "AfD",
        answers: {
            "1": "Nein", "2": "Nein", "3": "Nein", "4": "Nein", "5": "Nein",
            "6": "Nein", "7": "Ja", "8": "Ja", "9": "Nein", "10": "Nein",
            "11": "Nein", "12": "Ja", "13": "Ja", "14": "Ja", "15": "Nein",
            "16": "Nein", "17": "Nein", "18": "Nein", "19": "Nein",
            "20": "Nein", "21": "Nein", "22": "Nein", "23": "Nein",
            "24": "Nein", "25": "Nein", "26": "Ja",
            "27": "Nein", "28": "Nein", "29": "Ja", "30": "Nein", "31": "Nein",
            "32": "Nein", "33": "Nein", "34": "Nein", "35": "Nein",
            "36": "Ja", "37": "Nein", "38": "Nein", "39": "Ja", "40": "Ja",
            "41": "Nein", "42": "Nein", "43": "Nein", "44": "Nein",
            "45": "Nein", "46": "Nein"
        },
        coreMessage: "Die AfD betont nationale Souveränität, strikte Einwanderungskontrolle und traditionelle Werte."
    },
    {
        name: "Die Linke",
        answers: {
            "1": "Ja", "2": "Ja", "3": "Nein", "4": "Ja", "5": "Nein",
            "6": "Ja", "7": "Nein", "8": "Nein", "9": "Ja", "10": "Ja",
            "11": "Ja", "12": "Nein", "13": "Nein", "14": "Nein",
            "15": "Ja", "16": "Ja", "17": "Ja", "18": "Ja", "19": "Ja",
            "20": "Ja", "21": "Ja", "22": "Ja", "23": "Ja", "24": "Ja",
            "25": "Ja", "26": "Ja",
            "27": "Ja", "28": "Ja", "29": "Ja", "30": "Ja", "31": "Ja",
            "32": "Ja", "33": "Nein", "34": "Ja", "35": "Ja",
            "36": "Nein", "37": "Ja", "38": "Ja", "39": "Nein",
            "40": "Ja", "41": "Ja", "42": "Ja", "43": "Ja", "44": "Ja",
            "45": "Ja", "46": "Ja"
        },
        coreMessage: "Die Linke steht für soziale Gerechtigkeit, Umverteilung und Frieden als politische Leitmotive."
    },
    {
        name: "Bündnis Sahra Wagenknecht (BSW)",
        answers: {
            "1": "Ja", "2": "Ja", "3": "Nein", "4": "Neutral", "5": "Nein",
            "6": "Ja", "7": "Nein", "8": "Ja", "9": "Nein", "10": "Ja",
            "11": "Nein", "12": "Ja", "13": "Ja", "14": "Nein", "15": "Ja",
            "16": "Nein", "17": "Ja", "18": "Nein", "19": "Ja", "20": "Ja",
            "21": "Ja", "22": "Ja", "23": "Ja", "24": "Ja", "25": "Ja",
            "26": "Ja",
            "27": "Nein", "28": "Ja", "29": "Ja", "30": "Nein",
            "31": "Ja", "32": "Nein", "33": "Ja", "34": "Ja", "35": "Ja",
            "36": "Ja", "37": "Ja", "38": "Nein", "39": "Ja", "40": "Ja",
            "41": "Ja", "42": "Ja", "43": "Ja", "44": "Nein", "45": "Nein",
            "46": "Ja"
        },
        coreMessage: "BSW steht für soziale Sicherheit, wirtschaftliche Gerechtigkeit und den Erhalt traditioneller Werte."
    }
];

const coreMessages = {
    "SPD": "Die SPD setzt auf soziale Gerechtigkeit, wirtschaftlichen Fortschritt und eine starke Demokratie. Sie strebt eine Erhöhung des Mindestlohns auf 15 Euro an und plant Steuererleichterungen für Normal- und Geringverdiener, um die finanzielle Belastung zu senken. Durch Investitionen in nachhaltige Technologien und Infrastruktur will sie die deutsche Wirtschaft modernisieren und stärken. Der Ausbau der sozialen Sicherungssysteme, einschließlich stabiler Renten und einer verbesserten Gesundheitsversorgung, steht im Fokus. Ihre Klimapolitik verfolgt das Ziel, die Energiewende sozial verträglich zu gestalten, und legt dabei Wert auf erneuerbare Energien. Zusätzlich setzt sich die SPD für umfassende Reformen im Bildungswesen und für Gleichstellung in allen gesellschaftlichen Bereichen ein, um Chancengerechtigkeit zu fördern.",
    "CDU/CSU": "Die CDU/CSU vertritt eine konservative und marktwirtschaftlich orientierte Politik. Sie fokussiert sich auf die Förderung von Familien, den Ausbau von Eigenverantwortung und die Sicherstellung von Recht und Ordnung. Ihre wirtschaftspolitischen Ziele beinhalten Steuererleichterungen für den Mittelstand, die Senkung der Unternehmenssteuern und die Förderung von Innovationen. In der Migrationspolitik setzt die Union auf eine strikte Kontrolle der Grenzen, beschleunigte Asylverfahren und eine restriktive Haltung gegenüber illegaler Migration. Die Klimapolitik kombiniert die Förderung erneuerbarer Energien mit der Erforschung neuer Technologien, einschließlich der Kernkraft, und strebt eine marktwirtschaftliche Lösung für den Klimaschutz an. Im sozialen Bereich legt die CDU/CSU Wert auf die Förderung von Wohneigentum, stabile Renten und eine leistungsfähige Gesundheitsversorgung. Ihre Politik wird jedoch häufig als unzureichend progressiv in sozialen und ökologischen Fragen kritisiert.",
    "Bündnis 90/Die Grünen": "Die Grünen stehen für ökologische Nachhaltigkeit, soziale Gerechtigkeit und eine progressive Gesellschaftspolitik. Ihr Wahlprogramm setzt auf eine schnelle Energiewende mit dem Ziel der Klimaneutralität bis 2045. Dazu gehören der umfassende Ausbau erneuerbarer Energien, die Einführung eines ambitionierten CO2-Preises und Investitionen in umweltfreundliche Technologien. Sozialpolitisch fordern die Grünen bezahlbaren Wohnraum, eine stärkere Umverteilung durch gerechte Steuern und den Ausbau sozialer Sicherungssysteme. Im Bildungsbereich sollen Digitalisierung und Inklusion vorangetrieben werden, während internationale Partnerschaften genutzt werden, um den globalen Klimaschutz zu stärken. Kritiker führen an, dass die ambitionierten Ziele der Grünen hohe Kosten verursachen könnten und soziale Ungleichheiten potenziell verstärken, wenn keine ausreichenden Ausgleichsmaßnahmen getroffen werden.",
    "FDP": "Die FDP betont die Bedeutung von wirtschaftlicher Freiheit, Innovation und Digitalisierung. Sie plant umfassende Steuerreformen, um Unternehmen und Privatpersonen zu entlasten, und setzt auf marktwirtschaftliche Ansätze, um die Wettbewerbsfähigkeit Deutschlands zu stärken. Im Bereich Klimaschutz verfolgt die FDP technologieoffene Lösungen, wie den Emissionshandel, um CO2-Emissionen zu reduzieren. Ihre Rentenpolitik beinhaltet die Einführung einer Aktienrente und mehr Flexibilität beim Renteneintrittsalter. Im Bildungsbereich liegt der Fokus auf der Förderung von MINT-Fächern, einer besseren digitalen Ausstattung der Schulen und der Förderung von lebenslangem Lernen. Kritiker werfen der FDP vor, soziale Aspekte zu vernachlässigen und sich zu stark auf Marktmechanismen zu verlassen, die nicht alle gesellschaftlichen Herausforderungen lösen können.",
    "AfD": "Die AfD vertritt eine stark konservative, national orientierte Politik. Sie lehnt eine weitere Integration in die Europäische Union ab und fordert die Rückverlagerung nationaler Kompetenzen. Die Partei setzt auf traditionelle Werte und Eigenverantwortung, während sie multikulturelle Gesellschaftsmodelle kritisiert. In der Wirtschaftspolitik liegt der Fokus auf der Stärkung des Mittelstands, dem Abbau von Bürokratie und der Förderung von Familienunternehmen. Die AfD spricht sich klar gegen die Energiewende aus und fordert stattdessen die Nutzung konventioneller Energiequellen wie Kohle und Kernkraft. In der Migrationspolitik plädiert die Partei für strikte Grenzkontrollen, die Abschiebung abgelehnter Asylbewerber und eine Politik, die sich an deutscher Leitkultur orientiert. Kritiker bemängeln, dass die Positionen der AfD polarisiert und bestehende gesellschaftliche Spannungen verstärken könnten.",
    "Die Linke": "Die Linke steht für soziale Gerechtigkeit und eine gerechte Verteilung von Reichtum. Ihr Wahlprogramm umfasst Maßnahmen wie einen gesetzlichen Mietendeckel, die Abschaffung der Mehrwertsteuer auf Grundnahrungsmittel und eine Vermögenssteuer für Spitzenverdiener. Im Bereich Klimaschutz setzt die Linke auf einen umfassenden Ausbau erneuerbarer Energien und soziale Abfederungen für Betroffene des Strukturwandels. Bildung und Pflege sind zentrale Anliegen, wobei die Partei mehr Investitionen in öffentliche Dienstleistungen fordert. Außenpolitisch positioniert sich die Linke klar gegen militärische Einsätze und für internationale Abrüstung. Kritiker heben hervor, dass die wirtschaftspolitischen Maßnahmen der Linken potenziell die Wettbewerbsfähigkeit Deutschlands gefährden könnten.",
    "Bündnis Sahra Wagenknecht (BSW)": "Das Bündnis Sahra Wagenknecht setzt sich für soziale Sicherheit, wirtschaftliche Gerechtigkeit und eine unabhängige Außenpolitik ein. Die Partei fordert einen Mindestlohn von 15 Euro, die Einführung einer Bürgerversicherung und die Abschaffung der Zwei-Klassen-Medizin. Wirtschaftspolitisch strebt das BSW eine Entlastung des Mittelstands an, darunter die Senkung der Energiepreise und eine Reform der Schuldenbremse. In der Außenpolitik lehnt die Partei Hochrüstung und Waffenexporte ab und setzt auf eine diplomatische Lösung internationaler Konflikte. Kritiker argumentieren, dass die wirtschaftspolitischen Vorschläge des BSW zu stark regulierend wirken könnten, was Innovationen und Investitionen behindern könnte."
};

const transparencyDetails = {
    calc: "Unsere Berechnungen folgen einer strikten, transparenten Formel, die sicherstellt, dass alle Parteien fair behandelt werden. Es werden weder persönliche Präferenzen noch subjektive Bewertungen berücksichtigt. Der Algorithmus wurde von unabhängigen Experten geprüft.",
    info: "Alle verwendeten Daten, Fragen und Ergebnisse sind vollständig einsehbar. Dies umfasst Quellenangaben, genutzte Algorithmen und deren Dokumentation. Unsere Plattform ist Open Source, sodass jeder den Prozess überprüfen kann.",
    neutrality: "Die Plattform bewertet Parteien rein auf Grundlage objektiver Daten und politischer Positionen. Es werden keine Meinungen oder Präferenzen berücksichtigt. Die Neutralität wird durch externe Audits gewährleistet."
};
function toggleAccordion(button) {
    const details = button.nextElementSibling;
    if (!details) {
        console.error("Details-Element nicht gefunden.");
        return;
    }

    details.classList.toggle("hidden");
    button.textContent = details.classList.contains("hidden") ? "Mehr anzeigen" : "Weniger anzeigen";
}
/****************************************************
 * showQuestion(index)
 ****************************************************/
function showQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    if (!questionContainer) {
        console.error("#question-container not found in DOM.");
        return;
    }

    const question = questions[index];
    if (!question) {
        console.warn("No question available at index:", index);
        // Wir sind über das Ende der Fragen hinaus => Ergebnisse
        showResults();
        return;
    }

    const headlineElement    = document.getElementById("question-headline");
    const textElement        = document.getElementById("question-text");
    const explanationElement = document.getElementById("question-explanation");
    const optionsContainer   = document.getElementById("options");

    if (!headlineElement || !textElement || !explanationElement || !optionsContainer) {
        console.error("Fehlende DOM-Elemente:", {
            headlineElement,
            textElement,
            explanationElement,
            optionsContainer
        });
        return;
    }

    // Headline + Text + Erklärung
    headlineElement.textContent    = question.headline;
    textElement.textContent        = question.text;
    explanationElement.textContent = question.explanation;

    // Buttons für Ja/Nein/Neutral (etc.) erzeugen
    optionsContainer.innerHTML = "";
    question.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick     = () => handleAnswer(question.id, option);
        optionsContainer.appendChild(btn);
    });

    // Fortschrittsbalken updaten
    updateProgressBar(index + 1, questions.length);

    // Vor-/Zurück-Buttons anpassen
    updateNavigationButtons();
}

/****************************************************
 * handleAnswer()
 *  - Speichert die Antwort, geht zur nächsten Frage
 ****************************************************/
function handleAnswer(questionId, answer) {
    userResponses[questionId] = answer;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        // Ende => Ergebnisse
        showResults();
    }
}

/****************************************************
 * goBack() & goForward()
 ****************************************************/
function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function goForward() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

/****************************************************
 * updateProgressBar(current, total)
 ****************************************************/
function updateProgressBar(current, total) {
    const progress = document.getElementById("progress");
    if (progress) {
        progress.style.width = `${(current / total) * 100}%`;
    }
}

/****************************************************
 * updateNavigationButtons()
 ****************************************************/
function updateNavigationButtons() {
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");

    if (!prevButton || !nextButton) return;

    // Zurück-Button nur sichtbar, wenn wir nicht bei der ersten Frage sind
    prevButton.classList.toggle("hidden", currentQuestionIndex === 0);

    // Weiter-Button nur sichtbar, solange wir nicht bei der letzten Frage sind
    nextButton.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);
}

/****************************************************
 * calculateResults()
 ****************************************************/
function calculateResults() {
    // Vergleicht userResponses mit parties
    const results = parties.map(party => {
        let matchCount = 0;
        Object.entries(userResponses).forEach(([qId, userAns]) => {
            if (party.answers[qId] === userAns) {
                matchCount++;
            }
        });
        const percentage = ((matchCount / questions.length) * 100).toFixed(2);
        return { party: party.name, percentage };
    });

    // Sortiere absteigend
    return results.sort((a, b) => b.percentage - a.percentage);
}

/****************************************************
 * allQuestionsAnswered() - Angepasst für Button-Antworten
 ****************************************************/
function allQuestionsAnswered() {
    // Prüfe, ob genauso viele Antworten vorliegen wie es Fragen gibt:
    const answeredCount = Object.keys(userResponses).length;
    return answeredCount === questions.length;
}

/****************************************************
 * showResults()
 ****************************************************/
function showResults() {
    // Nur prüfen, falls wirklich alle Fragen beantwortet sein sollen:
    if (!allQuestionsAnswered()) {
        alert("Bitte beantworte alle Fragen!");
        return;
    }

    const questionContainer = document.getElementById("question-container");
    const resultContainer   = document.getElementById("result-container");
    const resultsContainer  = document.getElementById("results");

    if (!resultsContainer) {
        console.error("#results not found.");
        return;
    }

    const results = calculateResults();
    console.log("Results for display:", results);

// Karten-Layout
resultsContainer.innerHTML = results.map(r => {
    // Optional: Farbliche Balken-Klasse
    let colorClass = "";
    if (r.party.includes("SPD")) colorClass = "spd";
    else if (r.party.includes("CDU")) colorClass = "cdu";
    else if (r.party.includes("Grüne")) colorClass = "gruene";
    else if (r.party.includes("FDP")) colorClass = "fdp";
    else if (r.party.includes("AfD")) colorClass = "afd";
    else if (r.party.includes("Linke")) colorClass = "linke";
    else if (r.party.includes("Wagenknecht") || r.party.includes("BSW")) colorClass = "bsw";
    else colorClass = "others";

    const coreMessage = coreMessages[r.party] || "Keine Kernausrichtung verfügbar.";
    const isLongText = coreMessage.length > 100; // Schwelle für "lange Texte"

    return `
        <div class="result-card">
            <h3 class="party-name">${r.party}</h3>
            <div class="progress-bar-container">
                <div class="progress-bar-fill ${colorClass}" style="width:${r.percentage}%; min-width:40px;">
                    ${r.percentage}%
                </div>
            </div>
            <p class="core-message">
                <span class="short-text">${coreMessage.slice(0, 100)}${isLongText ? "..." : ""}</span>
                <span class="full-text ${isLongText ? "hidden" : ""}">${coreMessage}</span>
                ${isLongText ? '<button class="toggle-text-btn">Mehr anzeigen</button>' : ""}
            </p>
        </div>
    `;
}).join("");


    // Frage-Container ausblenden, Ergebnisse einblenden
    if (questionContainer) questionContainer.classList.add("hidden");
    if (resultContainer)  resultContainer.classList.remove("hidden");

    // Fade-in
    resultContainer.style.opacity    = "0";
    resultContainer.style.transition = "opacity 1s ease";
    setTimeout(() => {
        resultContainer.style.opacity = "1";
    }, 100);
}

/****************************************************
 * Neustart-Button
 ****************************************************/
function restartQuiz() {
    userResponses = {};
    currentQuestionIndex = 0;

    const resultContainer   = document.getElementById("result-container");
    const questionContainer = document.getElementById("question-container");

    if (resultContainer)   resultContainer.classList.add("hidden");
    if (questionContainer) questionContainer.classList.remove("hidden");

    showQuestion(currentQuestionIndex);
}

/****************************************************
 * Zusätzliche Funktionen (Beispiel: Divergenz)
 ****************************************************/
function findMostDivergentQuestions() {
    return questions.map(question => {
        const answers = parties.map(party => party.answers[question.id] || "Keine Antwort");
        const uniqueAnswers = new Set(answers);
        return {
            question: question.text,
            differences: uniqueAnswers.size,
            uniqueAnswers: Array.from(uniqueAnswers)
        };
    }).sort((a, b) => b.differences - a.differences)
      .slice(0, 5);
}

function displayTopDivergentQuestions() {
    const divergent = findMostDivergentQuestions();
    console.log("Fragen mit größten Unterschieden:", divergent);
}

document.addEventListener("DOMContentLoaded", () => {
    // Beim Laden direkt die 1. Frage anzeigen
    showQuestion(currentQuestionIndex);

    // Start-Generator Animation
    const startGenerator = document.querySelector(".start-generator");
    if (startGenerator) {
        startGenerator.style.opacity = "0";
        startGenerator.style.transform = "translateY(50px)";
        setTimeout(() => {
            startGenerator.style.transition = "opacity 1s ease, transform 1s ease";
            startGenerator.style.opacity   = "1";
            startGenerator.style.transform = "translateY(0)";
        }, 200);
    }

    // Ergebnisse anfangs verstecken
    const resultContainer = document.getElementById("result-container");
    if (resultContainer) {
        resultContainer.classList.add("hidden");
    }

    // Falls du Vor/Zurück-Buttons hast:
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    if (prevButton) prevButton.onclick = goBack;
    if (nextButton) nextButton.onclick = goForward;

    // Füge den Event-Listener für "Mehr Anzeigen" hier hinzu
    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("toggle-text-btn")) {
            const parent = e.target.closest(".core-message");
            const shortText = parent.querySelector(".short-text");
            const fullText = parent.querySelector(".full-text");

            // Umschalten zwischen Kurz- und Langtext
            if (fullText.classList.contains("hidden")) {
                fullText.classList.remove("hidden");
                shortText.style.display = "none";
                e.target.textContent = "Weniger anzeigen";
            } else {
                fullText.classList.add("hidden");
                shortText.style.display = "inline";
                e.target.textContent = "Mehr anzeigen";
            }
        }
    });
});