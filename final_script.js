let currentQuestionIndex = 0;
let userResponses = {};

// Fragen mit detaillierten Erklärungen
const questions = [
    {
        id: "1",
        text: "Soll der Mindestlohn auf 15 Euro erhöht werden?",
        headline: "Mindestlohn erhöhen?",
        explanation: "Der Mindestlohn ist das gesetzlich festgelegte Mindesteinkommen für Arbeitnehmer. Aktuell beträgt er 12 Euro pro Stunde. Eine Erhöhung auf 15 Euro könnte die Kaufkraft stärken und Armut reduzieren, aber Arbeitgeber warnen vor möglichen Arbeitsplatzverlusten.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "2",
        text: "Soll die Schuldenbremse reformiert werden, um mehr staatliche Investitionen zu ermöglichen?",
        headline: "Schuldenbremse reformieren?",
        explanation: "Die Schuldenbremse begrenzt die Neuverschuldung des Bundes und der Länder. Sie wurde 2009 eingeführt, um die Staatsfinanzen zu stabilisieren. Kritiker meinen, dass sie Investitionen in Infrastruktur und Bildung behindert, während Befürworter sie als Schutz vor übermäßigen Schulden sehen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "3",
        text: "Soll die Unternehmenssteuerbelastung auf unter 25 % gesenkt werden?",
        headline: "Unternehmenssteuer senken?",
        explanation: "Deutschland hat im internationalen Vergleich eine hohe Unternehmenssteuer. Eine Senkung könnte Unternehmen entlasten und neue Investitionen fördern. Kritiker warnen jedoch vor Einnahmeverlusten für den Staat und möglichen Kürzungen bei sozialen Leistungen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "4",
        text: "Soll Arbeit flexibler gestaltet werden, etwa durch eine wöchentliche statt tägliche Höchstarbeitszeit?",
        headline: "Arbeitszeit flexibler gestalten?",
        explanation: "Flexible Arbeitszeiten könnten die Produktivität steigern und den individuellen Bedürfnissen von Arbeitnehmern und Arbeitgebern entgegenkommen. Es gibt jedoch Befürchtungen, dass dies zu Überarbeitung und weniger Freizeit führen könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "5",
        text: "Soll es eine 4-Tage-Woche bei vollem Lohnausgleich geben?",
        headline: "4-Tage-Woche einführen?",
        explanation: "Eine 4-Tage-Woche könnte die Work-Life-Balance verbessern und die Produktivität steigern. Kritiker argumentieren jedoch, dass diese Maßnahme für kleine Unternehmen wirtschaftlich schwer tragbar sein könnte.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "6",
        text: "Soll Deutschland bis 2040 zu 100 % auf erneuerbare Energien umsteigen?",
        headline: "Erneuerbare Energien ausbauen?",
        explanation: "Der Umstieg auf erneuerbare Energien könnte den CO₂-Ausstoß reduzieren und die Klimaziele Deutschlands unterstützen. Dafür sind jedoch hohe Investitionen und technologische Fortschritte notwendig.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "7",
        text: "Soll die Nutzung von Atomkraft wieder erlaubt werden?",
        headline: "Atomkraft wieder erlauben?",
        explanation: "Atomkraft ist eine CO₂-arme Energiequelle, birgt jedoch Risiken wie die Endlagerung von Atommüll und mögliche Reaktorkatastrophen. Befürworter sehen sie als wichtige Übergangslösung zur Klimaneutralität.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "8",
        text: "Soll die CO₂-Abgabe abgeschafft werden?",
        headline: "CO₂-Abgabe abschaffen?",
        explanation: "Die CO₂-Abgabe wurde eingeführt, um den Ausstoß von Treibhausgasen zu reduzieren. Kritiker sehen sie als Belastung für Haushalte und Unternehmen, während Befürworter sie als Anreiz für den Klimaschutz betrachten.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "9",
        text: "Soll das Verbrenner-Aus für Autos bis 2035 umgesetzt werden?",
        headline: "Verbrenner-Aus umsetzen?",
        explanation: "Das Verbrenner-Aus soll den Verkehr auf emissionsfreie Fahrzeuge umstellen. Während dies ein wichtiger Schritt für den Klimaschutz ist, gibt es Bedenken über die Umsetzbarkeit und mögliche Arbeitsplatzverluste in der Automobilindustrie.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "10",
        text: "Soll die Infrastruktur für E-Mobilität weiter ausgebaut werden?",
        headline: "E-Mobilität fördern?",
        explanation: "Der Ausbau der Ladeinfrastruktur ist essenziell für die Verbreitung von Elektrofahrzeugen. Es gibt jedoch Herausforderungen bei den Kosten und der Integration ins Stromnetz.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "11",
        text: "Soll der Zugang zum Arbeitsmarkt für Geflüchtete erleichtert werden?",
        headline: "Arbeitsmarkt für Geflüchtete öffnen?",
        explanation: "Ein leichterer Zugang zum Arbeitsmarkt könnte die Integration von Geflüchteten fördern und den Fachkräftemangel lindern. Gegner befürchten jedoch einen Verdrängungseffekt auf dem Arbeitsmarkt.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "12",
        text: "Soll es keine Sozialleistungen für Geflüchtete geben, die aus sicheren Drittstaaten nach Deutschland einreisen?",
        headline: "Sozialleistungen für Geflüchtete streichen?",
        explanation: "Die Streichung von Sozialleistungen könnte die Einreise unattraktiver machen, wird jedoch von Kritikern als unmenschlich und integrationshemmend angesehen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "13",
        text: "Soll Asylverfahren in Drittstaaten durchgeführt werden?",
        headline: "Asylverfahren auslagern?",
        explanation: "Die Auslagerung von Asylverfahren könnte die deutschen Behörden entlasten. Menschenrechtsorganisationen kritisieren jedoch, dass dies oft mit schlechteren Bedingungen für Geflüchtete verbunden ist.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "14",
        text: "Soll die Einbürgerung erst nach mindestens 8 Jahren Aufenthalt möglich sein?",
        headline: "Einbürgerungskriterien verschärfen?",
        explanation: "Längere Aufenthaltszeiten vor der Einbürgerung könnten die Integration erschweren, während Befürworter sie als notwendig für eine erfolgreiche Integration ansehen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "15",
        text: "Soll Bildung von der Kita bis zum Studium komplett kostenfrei sein?",
        headline: "Bildung kostenfrei machen?",
        explanation: "Kostenfreie Bildung könnte den Zugang zu Bildung für alle verbessern, würde jedoch hohe Kosten für den Staat verursachen.",
        options: ["Ja", "Nein", "Neutral"]
    },
    {
        id: "16",
        text: "Soll der öffentliche Nahverkehr in Deutschland kostenfrei sein?",
        headline: "ÖPNV kostenfrei machen?",
        explanation: "Ein kostenfreier Nahverkehr könnte den Individualverkehr reduzieren und den Klimaschutz fördern. Kritiker warnen vor hohen Kosten und möglichen Qualitätseinbußen.",
        options: ["Ja", "Nein", "Neutral"]
    }
];

// Parteien
const parties = [
    {
        name: "SPD",
        answers: {
            "1": "Ja",
            "2": "Ja",
            "3": "Neutral",
            "4": "Ja",
            "5": "Nein",
            "6": "Ja",
            "7": "Nein"
        }
    },
    {
        name: "CDU/CSU",
        answers: {
            "1": "Nein",
            "2": "Nein",
            "3": "Ja",
            "4": "Nein",
            "5": "Ja",
            "6": "Nein",
            "7": "Ja"
        }
    },
    {
        name: "Bündnis 90/Die Grünen",
        answers: {
            "1": "Ja",
            "2": "Ja",
            "3": "Neutral",
            "4": "Neutral",
            "5": "Nein",
            "6": "Ja",
            "7": "Nein"
        }
    },
    {
        name: "FDP",
        answers: {
            "1": "Nein",
            "2": "Nein",
            "3": "Ja",
            "4": "Neutral",
            "5": "Ja",
            "6": "Nein",
            "7": "Ja"
        }
    },
    {
        name: "AfD",
        answers: {
            "1": "Nein",
            "2": "Nein",
            "3": "Nein",
            "4": "Nein",
            "5": "Nein",
            "6": "Nein",
            "7": "Ja"
        }
    },
    {
        name: "Die Linke",
        answers: {
            "1": "Ja",
            "2": "Ja",
            "3": "Nein",
            "4": "Ja",
            "5": "Nein",
            "6": "Ja",
            "7": "Nein"
        }
    },
    {
        name: "BSW",
        answers: {
            "1": "Ja",
            "2": "Ja",
            "3": "Neutral",
            "4": "Ja",
            "5": "Ja",
            "6": "Nein",
            "7": "Ja"
        }
    }
];

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-headline").innerText = question.headline;
    document.getElementById("question-text").innerText = question.text;
    document.getElementById("question-explanation").innerText = question.explanation;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => saveResponse(question.id, option);
        optionsDiv.appendChild(button);
    });

    updateProgress();
}

function saveResponse(questionId, answer) {
    userResponses[questionId] = answer;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        calculateResults();
    }
}

function updateProgress() {
    const progress = document.getElementById("progress");
    progress.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + "%";
}

function calculateResults() {
    const results = parties.map(party => {
        let matches = 0;
        Object.keys(userResponses).forEach(id => {
            if (userResponses[id] === party.answers[id]) {
                matches++;
            }
        });
        return {
            name: party.name,
            percentage: ((matches / questions.length) * 100).toFixed(2)
        };
    });

    displayResults(results);
}

function displayResults(results) {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").classList.remove("hidden");

    const resultsDiv = document.getElementById("results");
    let table = `<table><tr><th>Partei</th><th>Übereinstimmung (%)</th></tr>`;
    results.forEach(result => {
        table += `<tr><td>${result.name}</td><td>${result.percentage}%</td></tr>`;
    });
    table += `</table>`;
    resultsDiv.innerHTML = table;
}

// Start
showQuestion();
