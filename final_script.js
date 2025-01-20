
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
                "26": "Ja", "27": "Ja", "28": "Ja", "29": "Nein", "30": "Ja", 
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
                "24": "Neutral", "25": "Nein", "26": "Ja", "27": "Nein", 
                "28": "Ja", "29": "Ja", "30": "Nein", "31": "Nein", "32": "Nein", 
                "33": "Ja", "34": "Nein", "35": "Nein", "36": "Ja", "37": "Nein", 
                "38": "Nein", "39": "Ja", "40": "Ja", "41": "Nein", "42": "Ja", 
                "43": "Nein", "44": "Nein", "45": "Ja", "46": "Ja"
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
                "26": "Nein", "27": "Ja", "28": "Ja", "29": "Nein", "30": "Ja", 
                "31": "Ja", "32": "Ja", "33": "Nein", "34": "Ja", "35": "Ja", 
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
                "23": "Nein", "24": "Nein", "25": "Ja", "26": "Ja", "27": "Nein", 
                "28": "Ja", "29": "Ja", "30": "Ja", "31": "Nein", "32": "Nein", 
                "33": "Ja", "34": "Nein", "35": "Nein", "36": "Ja", "37": "Ja", 
                "38": "Nein", "39": "Ja", "40": "Ja", "41": "Nein", "42": "Ja", 
                "43": "Nein", "44": "Nein", "45": "Nein", "46": "Ja"
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
                "24": "Nein", "25": "Nein", "26": "Ja", "27": "Nein", 
                "28": "Nein", "29": "Ja", "30": "Nein", "31": "Nein", 
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
                "25": "Ja", "26": "Ja", "27": "Ja", "28": "Ja", "29": "Ja", 
                "30": "Ja", "31": "Ja", "32": "Ja", "33": "Nein", "34": "Ja", 
                "35": "Ja", "36": "Nein", "37": "Ja", "38": "Ja", "39": "Nein", 
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
                "26": "Ja", "27": "Nein", "28": "Ja", "29": "Ja", "30": "Nein", 
                "31": "Ja", "32": "Nein", "33": "Ja", "34": "Ja", "35": "Ja", 
                "36": "Ja", "37": "Ja", "38": "Nein", "39": "Ja", "40": "Ja",
                "41": "Ja", "42": "Ja", "43": "Ja", "44": "Nein", "45": "Nein", 
                "46": "Ja"
            },
            coreMessage: "BSW steht für soziale Sicherheit, wirtschaftliche Gerechtigkeit und den Erhalt traditioneller Werte."
        },
    ];
    
    

function showQuestion(index) {
    const questionContainer = document.getElementById("question-container");

    if (!questionContainer) {
        console.error("#question-container not found in DOM.");
        return;
    }

    const question = questions[index];

    if (!question) {
        console.warn("No question available at index:", index);
        showResults();
        return;
    }

    const headlineElement = document.getElementById("question-headline");
    const textElement = document.getElementById("question-text");
    const explanationElement = document.getElementById("question-explanation");
    const optionsContainer = document.getElementById("options");

    if (!headlineElement || !textElement || !explanationElement || !optionsContainer) {
        console.error("One or more required DOM elements are missing:", {
            headlineElement,
            textElement,
            explanationElement,
            optionsContainer,
        });
        return;
    }

    headlineElement.textContent = question.headline;
    textElement.textContent = question.text;
    explanationElement.textContent = question.explanation;

    optionsContainer.innerHTML = "";
    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(question.id, option);
        optionsContainer.appendChild(button);
    });

    updateProgressBar(index + 1, questions.length);
    updateNavigationButtons();
}

function handleAnswer(questionId, answer) {
    userResponses[questionId] = answer;
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function updateProgressBar(current, total) {
    const progress = document.getElementById("progress");
    if (!progress) {
        console.error("#progress element not found.");
        return;
    }
    progress.style.width = `${(current / total) * 100}%`;
}

function updateNavigationButtons() {
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");

    if (!prevButton || !nextButton) {
        console.error("Navigation buttons not found in DOM.");
        return;
    }

    prevButton.classList.toggle("hidden", currentQuestionIndex === 0);
    nextButton.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);
}

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
    }
}

function showResults() {
    const resultsContainer = document.getElementById("results");
    const results = calculateResults();

    if (!resultsContainer) {
        console.error("#results element not found in DOM.");
        return;
    }

    resultsContainer.innerHTML = results.map(result => `
        <div class="bar-container">
            <span>${result.party}</span>
            <div class="bar" style="width: ${result.percentage}%; background-color: ${getPartyColor(result.party)};">
                ${result.percentage}%
            </div>
            <p class="core-message">${coreMessages[result.party] || "Keine Kernausrichtung verfügbar."}</p>
        </div>
    `).join("");

    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
}

function calculateResults() {
    const results = parties.map(party => {
        let matchCount = 0;

        Object.entries(userResponses).forEach(([questionId, answer]) => {
            if (party.answers[questionId] === answer) {
                matchCount++;
            }
        });

        const percentage = ((matchCount / questions.length) * 100).toFixed(2);
        return { party: party.name, percentage };
    });

    return results.sort((a, b) => b.percentage - a.percentage);
}

function getPartyColor(party) {
    switch (party) {
        case "SPD": return "#E3000F";
        case "CDU/CSU": return "#000000";
        case "Bündnis 90/Die Grünen": return "#1FAA56";
        case "FDP": return "#FFED00";
        case "AfD": return "#0089D0";
        case "Die Linke": return "#BE3075";
        default: return "#666666";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestionIndex);

    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");

    if (prevButton) prevButton.onclick = goBack;
    if (nextButton) nextButton.onclick = goForward;
});
function findMostDivergentQuestions() {
    return questions.map(question => {
        // Alle Antworten der Parteien zu dieser Frage abrufen
        const answers = parties.map(party => party.answers[question.id] || "Keine Antwort");
        
        // Einzigartige Antworten bestimmen
        const uniqueAnswers = new Set(answers);

        return {
            question: question.text,
            differences: uniqueAnswers.size,
            uniqueAnswers: Array.from(uniqueAnswers) // Für Debugging und Anzeige
        };
    }).sort((a, b) => b.differences - a.differences) // Nach Anzahl der Unterschiede sortieren
      .slice(0, 5); // Die Top 5 Fragen zurückgeben
}

function findMostDivergentQuestions() {
    return questions.map(question => {
        const answers = parties.map(party => party.answers[String(question.id)] || "Keine Antwort"); // Sicherstellen, dass alle IDs abgedeckt sind
        const uniqueAnswers = new Set(answers); // Unterschiedliche Antworten zählen
        return {
            question: question.text,
            differences: uniqueAnswers.size,
            uniqueAnswers: Array.from(uniqueAnswers) // Debugging und Anzeige
        };
    }).sort((a, b) => b.differences - a.differences) // Nach Anzahl der Unterschiede sortieren
      .slice(0, 5); // Die Top 5 Fragen zurückgeben
}
function displayTopDivergentQuestions() {
    const divergentQuestions = findMostDivergentQuestions();

    if (divergentQuestions.length === 0) {
        console.log("Keine divergenten Fragen gefunden. Überprüfen Sie die Datenstruktur.");
        return;
    }

    console.log("Fragen mit den größten Unterschieden:");
    divergentQuestions.forEach((q, index) => {
        console.log(`${index + 1}. Frage: ${q.question}`);
        console.log(`   Unterschiedliche Antworten: ${q.uniqueAnswers.join(", ")}`);
        console.log(`   Anzahl der Unterschiede: ${q.differences}`);
    });
}
function calculateResultsWithPriority(priorityCategory) {
    return parties.map(party => {
        let totalMatch = 0;
        let categoryMatch = 0;
        let importantQuestionsMatch = 0;

        Object.entries(userResponses).forEach(([questionId, answer]) => {
            const question = questions.find(q => q.id === parseInt(questionId));
            if (!question) return; // Sicherheitsprüfung, falls die Frage nicht existiert

            if (party.answers[questionId] === answer) {
                totalMatch++;
                // Kategorie-Priorität prüfen
                if (question.category === priorityCategory) {
                    categoryMatch++;
                }
            }

            // Wichtige Fragen prüfen (z. B. basierend auf Differenzen)
            if (question.differences && question.differences >= 3) {
                if (party.answers[questionId] === answer) {
                    importantQuestionsMatch++;
                }
            }
        });

        const percentage = ((totalMatch / questions.length) * 100).toFixed(2);
        return {
            party: party.name,
            percentage,
            categoryMatch,
            importantQuestionsMatch
        };
    }).sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        if (b.categoryMatch !== a.categoryMatch) {
            return b.categoryMatch - a.categoryMatch;
        }
        return b.importantQuestionsMatch - a.importantQuestionsMatch;
    });
}

function showResultsWithDetails() {
    const results = calculateResultsWithPriority(userPriorityCategory);
    const resultsContainer = document.getElementById("results");

    if (!resultsContainer) {
        console.error("#results element not found in DOM.");
        return;
    }

    const topResults = results.filter(r => r.percentage === results[0].percentage);

    resultsContainer.innerHTML = topResults.map(result => `
        <div>
            <strong>${result.party}</strong>: ${result.percentage}% Übereinstimmung<br>
            Kategorie-Priorität (${userPriorityCategory || "Keine"}): ${result.categoryMatch} Punkte<br>
            Wichtige Fragen: ${result.importantQuestionsMatch} Punkte
        </div>
    `).join("");

    if (topResults.length > 1) {
        const detailedComparison = document.createElement("div");
        detailedComparison.innerHTML = "<h3>Detailvergleich der führenden Parteien:</h3>";

        topResults.forEach(result => {
            const partyDetails = document.createElement("div");
            partyDetails.innerHTML = `
                <strong>${result.party}</strong>:<br>
                <h4>Übereinstimmung nach Kategorien:</h4>
                ${Object.entries(userResponses).map(([questionId, answer]) => {
                    const question = questions.find(q => q.id === parseInt(questionId));
                    const partyAnswer = parties.find(p => p.name === result.party).answers[questionId];
                    return `<p>${question.headline}: Ihre Antwort: ${answer}, Partei-Antwort: ${partyAnswer} (${question.category})</p>`;
                }).join("")}
            `;
            detailedComparison.appendChild(partyDetails);
        });

        // Zeige Fragen mit höchster Differenzierung
        const divergentQuestions = findMostDivergentQuestions();
        const divergentContainer = document.createElement("div");
        divergentContainer.innerHTML = "<h4>Fragen mit höchster Differenzierung:</h4>";
        divergentContainer.innerHTML += divergentQuestions.map(q => `<p>${q.question} (${q.differences} unterschiedliche Antworten)</p>`).join("");

        detailedComparison.appendChild(divergentContainer);
        resultsContainer.appendChild(detailedComparison);
    }

    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
}

function findMostDivergentQuestions() {
    return questions.map(question => {
        const answers = parties.map(party => party.answers[question.id] || "Keine Antwort");
        const uniqueAnswers = new Set(answers);
        return {
            question: question.text,
            differences: uniqueAnswers.size,
            uniqueAnswers: Array.from(uniqueAnswers)
        };
    }).sort((a, b) => b.differences - a.differences).slice(0, 5);
}

function displayTopDivergentQuestions() {
    const divergentQuestions = findMostDivergentQuestions();

    if (divergentQuestions.length === 0) {
        console.log("Keine divergenten Fragen gefunden. Überprüfen Sie die Datenstruktur.");
        return;
    }

    console.log("Fragen mit den größten Unterschieden:");
    divergentQuestions.forEach((q, index) => {
        console.log(`${index + 1}. Frage: ${q.question}`);
        console.log(`   Unterschiedliche Antworten: ${q.uniqueAnswers.join(", ")}`);
        console.log(`   Anzahl der Unterschiede: ${q.differences}`);
    });
}// Kernausrichtungen der Parteien
const coreMessages = {
    "SPD": "Die SPD setzt sich für soziale Gerechtigkeit, faire Arbeitsbedingungen und Chancengleichheit ein Sie verfolgt eine Erhöhung des Mindestlohns, mehr Investitionen in Bildung und den Ausbau sozialer Sicherungssysteme.Außerdem fördert sie den Klimaschutz durch den Ausbau erneuerbarer Energien und eine sozialverträgliche Energiewende.",
    "CDU/CSU": " Sie steht für eine konservative Familienpolitik, eine restriktive Migrationspolitik und die Stärkung der nationalen und europäischen Sicherheit. Wirtschaftlich setzt sie auf steuerliche Entlastungen, die Förderung von Unternehmen und eine klare Haushaltsdisziplin..",
    "Bündnis 90/Die Grünen": "Ihr Programm zielt auf eine schnelle Energiewende, den Schutz der Biodiversität und die Förderung umweltfreundlicher Technologien ab. Sie setzen sich für soziale Gerechtigkeit, Gleichberechtigung und eine progressive Gesellschaftspolitik ein.",
    "FDP": " Die FDP steht für eine liberale Wirtschafts- und Gesellschaftspolitik mit Fokus auf individuelle Freiheit und Eigenverantwortung. Sie unterstützt die Digitalisierung, Innovation und die Förderung der Start-up-Kultur in Deutschland. Im Bereich Bildung fordert sie eine umfassende Modernisierung der Infrastruktur und die Förderung von Leistung",
    "AfD": "Die AfD betont eine restriktive Migrationspolitik, nationale Souveränität und den Schutz traditioneller Werte. Sie fordert eine Abkehr von Klimaschutzmaßnahmen, wie sie im Pariser Abkommen vereinbart wurden, und setzt auf konventionelle Energieträger. Wirtschaftlich fordert sie weniger Bürokratie und Steuersenkungen, besonders für den Mittelstand.",
    "Die Linke": "Die Linke setzt sich für soziale Umverteilung, Frieden und umfassende soziale Gerechtigkeit ein. Sie fordert eine stärkere Besteuerung von Großvermögen, die Einführung einer solidarischen Mindestsicherung und die Bekämpfung von Kinderarmut. Außenpolitisch lehnt sie militärische Auslandseinsätze ab und fordert eine Stärkung der zivilen Konfliktlösung..",
    "Bündnis Sahra Wagenknecht (BSW)": "Die BSW versteht sich als sozial orientierte Reformbewegung, die wirtschaftliche Gerechtigkeit, soziale Sicherheit und nationale Souveränität in den Mittelpunkt ihrer politischen Agenda stellt. Die Partei setzt sich für einen fairen Ausgleich zwischen sozialer Solidarität und ökonomischer Stabilität ein und möchte gesellschaftliche Spaltungen überwinden. Dabei verfolgt die BSW eine pragmatische und auf den Menschen fokussierte Politik, die sich klar von den Interessen großer Konzerne und der globalisierten Finanzwirtschaft abgrenzt",
};

// Ergebnisanzeige anpassen
function showResults() {
    const resultsContainer = document.getElementById("results");
    const results = calculateResults();

    if (!resultsContainer) {
        console.error("#results element not found in DOM.");
        return;
    }

    resultsContainer.innerHTML = results.map(result => `
        <div class="bar-container">
            <span>${result.party}</span>
            <div class="bar" style="width: ${result.percentage}%; background-color: ${getPartyColor(result.party)};">
                ${result.percentage}%
            </div>
            <p class="core-message">${coreMessages[result.party] || "Keine Kernausrichtung verfügbar."}</p>
        </div>
    `).join("");

    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
}
function goToQuestionnaire() {
    const questionSection = document.getElementById("question-container");
    if (questionSection) {
        questionSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("Der Bereich 'question-container' wurde nicht gefunden.");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // Animation für den Start-Generator-Bereich
    const startGenerator = document.querySelector(".start-generator");
    startGenerator.style.opacity = "0";
    startGenerator.style.transform = "translateY(50px)";
    setTimeout(() => {
        startGenerator.style.transition = "opacity 1s ease, transform 1s ease";
        startGenerator.style.opacity = "1";
        startGenerator.style.transform = "translateY(0)";
    }, 200);

    // Pulsierende Animation für den Button
    const startButton = startGenerator.querySelector("button");
    startButton.addEventListener("mouseover", () => {
        startButton.style.animation = "pulse 1s infinite";
    });

    startButton.addEventListener("mouseout", () => {
        startButton.style.animation = "none";
    });
});

// CSS für Animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(styleSheet);
