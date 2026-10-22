
"use strict";

// ============================================
// BUG HUNTER - PYTHON DEBUGGING GAME
// HTML + CSS + JavaScript
// ============================================

const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "bugHunterProgressV1";

const DIFFICULTIES = {
    easy: {
        label: "EASY",
        time: 25,
        xp: 20,
        count: 5
    },
    medium: {
        label: "MEDIUM",
        time: 20,
        xp: 30,
        count: 5
    },
    hard: {
        label: "HARD",
        time: 15,
        xp: 40,
        count: 5
    }
};

// --------------------------------------------
// CHALLENGE DATABASE
// Each question has four options and one answer.
// --------------------------------------------

const CHALLENGES = {
    easy: [
        {
            title: "The Missing Parenthesis",
            type: "SYNTAX ERROR",
            prompt: "Find the syntax error in this greeting program.",
            code: 'name = "Alex"\nprint("Hello", name',
            options: [
                "The variable name is invalid.",
                "The print statement needs a closing parenthesis.",
                "Strings cannot contain names.",
                "The comma must be removed."
            ],
            answer: 1,
            hint: "Look at the opening parenthesis after print.",
            explanation: "The print call starts with an opening parenthesis but never closes it. Add a closing parenthesis at the end.",
            fixed: 'name = "Alex"\nprint("Hello", name)'
        },
        {
            title: "The Forgotten Colon",
            type: "SYNTAX ERROR",
            prompt: "Python requires specific punctuation after a condition.",
            code: "age = 20\nif age >= 18\n    print('Adult')",
            options: [
                "The variable age must be a string.",
                "The comparison operator is invalid.",
                "A colon is missing after the if condition.",
                "print cannot be inside an if statement."
            ],
            answer: 2,
            hint: "Check the end of the if line.",
            explanation: "Python requires a colon at the end of an if statement.",
            fixed: "age = 20\nif age >= 18:\n    print('Adult')"
        },
        {
            title: "The Indentation Trap",
            type: "INDENTATION ERROR",
            prompt: "Find why this conditional block is broken.",
            code: "score = 90\nif score >= 50:\nprint('Passed')",
            options: [
                "The print line must be indented inside the if block.",
                "The score must be a string.",
                "The colon must be deleted.",
                "The print function requires two arguments."
            ],
            answer: 0,
            hint: "Look at the spacing before print.",
            explanation: "Python uses indentation to define code blocks. Indent the print statement beneath the if statement.",
            fixed: "score = 90\nif score >= 50:\n    print('Passed')"
        },
        {
            title: "The Wrong Assignment",
            type: "SYNTAX ERROR",
            prompt: "Find the problem in this variable assignment.",
            code: "total = 10\nif total = 10:\n    print('Ten')",
            options: [
                "total cannot contain a number.",
                "if statements cannot compare numbers.",
                "The print statement needs a semicolon.",
                "Use == to compare values instead of =."
            ],
            answer: 3,
            hint: "One equals sign assigns a value. How do you test equality?",
            explanation: "A single equals sign is for assignment. Use two equals signs in the condition to compare values.",
            fixed: "total = 10\nif total == 10:\n    print('Ten')"
        },
        {
            title: "The Broken Loop",
            type: "SYNTAX ERROR",
            prompt: "This loop should print the numbers from 0 to 2.",
            code: "for i in range(3)\n    print(i)",
            options: [
                "range must always have four arguments.",
                "A colon is missing after range(3).",
                "The loop variable cannot be i.",
                "print must be written before for."
            ],
            answer: 1,
            hint: "Check the punctuation at the end of the first line.",
            explanation: "A for statement must end with a colon before its indented body.",
            fixed: "for i in range(3):\n    print(i)"
        },
        {
            title: "The Unclosed String",
            type: "SYNTAX ERROR",
            prompt: "Find the problem in this message.",
            code: "message = 'Welcome to Python\nprint(message)",
            options: [
                "The variable must be named text.",
                "Python does not support strings.",
                "The string is missing its closing quote.",
                "print cannot display variables."
            ],
            answer: 2,
            hint: "Count the quotation marks on the first line.",
            explanation: "The string begins with a single quote but does not close on that line.",
            fixed: "message = 'Welcome to Python'\nprint(message)"
        }
    ],

    medium: [
        {
            title: "The List Index Trap",
            type: "RUNTIME ERROR",
            prompt: "Find the problem when accessing this list.",
            code: "numbers = [10, 20, 30]\nprint(numbers[3])",
            options: [
                "The list cannot contain integers.",
                "The list index starts at 1.",
                "print cannot display a list item.",
                "Index 3 is out of range; the last index is 2."
            ],
            answer: 3,
            hint: "How many items are in the list, and what index does the first item use?",
            explanation: "Python lists use zero-based indexing. A list with three elements has indices 0, 1, and 2.",
            fixed: "numbers = [10, 20, 30]\nprint(numbers[2])"
        },
        {
            title: "The Infinite Countdown",
            type: "LOGIC ERROR",
            prompt: "This countdown is intended to stop at zero.",
            code: "count = 3\nwhile count > 0:\n    print(count)",
            options: [
                "count is never decreased inside the loop.",
                "while loops cannot print numbers.",
                "The condition must use a single equals sign.",
                "count must be stored as text."
            ],
            answer: 0,
            hint: "What changes count on each iteration?",
            explanation: "The loop never changes count, so its condition remains true forever. Decrease count inside the loop.",
            fixed: "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1"
        },
        {
            title: "The Function Argument",
            type: "RUNTIME ERROR",
            prompt: "Find why the function call fails.",
            code: "def greet(name):\n    print('Hello', name)\n\ngreet()",
            options: [
                "Functions cannot use parameters.",
                "The function call is missing the required name argument.",
                "The print statement needs return.",
                "The function name must start with a capital."
            ],
            answer: 1,
            hint: "Compare the parameter in the definition with the arguments in the call.",
            explanation: "The function requires one argument called name, but greet() is called without one.",
            fixed: "def greet(name):\n    print('Hello', name)\n\ngreet('Alex')"
        },
        {
            title: "The Return Problem",
            type: "LOGIC ERROR",
            prompt: "This function should return the sum of two numbers.",
            code: "def add(a, b):\n    result = a + b\n\nanswer = add(2, 3)\nprint(answer)",
            options: [
                "The function needs three parameters.",
                "Numbers cannot be added in a function.",
                "The function never returns result.",
                "answer must be declared inside add."
            ],
            answer: 2,
            hint: "A function can calculate a value without sending it back to its caller.",
            explanation: "Without a return statement, a Python function returns None by default.",
            fixed: "def add(a, b):\n    result = a + b\n    return result\n\nanswer = add(2, 3)\nprint(answer)"
        },
        {
            title: "The Dictionary Key",
            type: "RUNTIME ERROR",
            prompt: "Find the invalid dictionary lookup.",
            code: "student = {'name': 'Mia', 'age': 22}\nprint(student['grade'])",
            options: [
                "The dictionary does not contain the key 'grade'.",
                "Dictionary keys must always be numbers.",
                "Dictionaries cannot contain strings.",
                "The dictionary needs a semicolon."
            ],
            answer: 0,
            hint: "Compare the requested key with the keys that actually exist.",
            explanation: "Accessing a nonexistent key using square brackets raises KeyError. Add the key or use get() when a default is appropriate.",
            fixed: "student = {'name': 'Mia', 'age': 22}\nprint(student.get('grade', 'Not available'))"
        },
        {
            title: "The Off-by-One Error",
            type: "LOGIC ERROR",
            prompt: "The goal is to print 1, 2, 3, 4, and 5.",
            code: "for i in range(1, 5):\n    print(i)",
            options: [
                "range cannot start at 1.",
                "The loop variable must be named number.",
                "print cannot be used in a loop.",
                "The stop value is exclusive; use range(1, 6)."
            ],
            answer: 3,
            hint: "The stopping value of range is not included.",
            explanation: "range(1, 5) generates 1, 2, 3, and 4. Use 6 as the stop value to include 5.",
            fixed: "for i in range(1, 6):\n    print(i)"
        }
    ],

    hard: [
        {
            title: "The Mutable Default",
            type: "LOGIC ERROR",
            prompt: "This function should create a fresh list for each call.",
            code: "def add_item(item, items=[]):\n    items.append(item)\n    return items\n\nprint(add_item('A'))\nprint(add_item('B'))",
            options: [
                "Lists cannot be function arguments.",
                "A mutable default list is reused between calls.",
                "append only accepts integers.",
                "return cannot return a list."
            ],
            answer: 1,
            hint: "Default argument objects are created when the function is defined, not on every call.",
            explanation: "The same list is reused across calls. Use None as the default and create a fresh list inside the function.",
            fixed: "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items"
        },
        {
            title: "The Exception Handler",
            type: "RUNTIME ERROR",
            prompt: "Find why this error handler will not catch a missing dictionary key.",
            code: "data = {}\ntry:\n    print(data['name'])\nexcept ValueError:\n    print('Missing name')",
            options: [
                "try cannot contain print.",
                "Dictionaries cannot be empty.",
                "A missing dictionary key raises KeyError, not ValueError.",
                "except must come before try."
            ],
            answer: 2,
            hint: "Which exception is raised when a dictionary key does not exist?",
            explanation: "A missing key raises KeyError. Catch KeyError specifically or use a safer lookup.",
            fixed: "data = {}\ntry:\n    print(data['name'])\nexcept KeyError:\n    print('Missing name')"
        },
        {
            title: "The Shadowed Variable",
            type: "LOGIC ERROR",
            prompt: "This function should update the global counter.",
            code: "counter = 0\n\ndef increment():\n    counter += 1\n\nincrement()",
            options: [
                "Declare counter as global inside the function before assigning to it.",
                "Functions cannot change numbers.",
                "The function must be named Counter.",
                "The increment operator must be ++."
            ],
            answer: 0,
            hint: "Python treats a variable assigned inside a function as local unless declared otherwise.",
            explanation: "Because counter is assigned inside the function, Python treats it as local. Reading it before a local assignment raises UnboundLocalError.",
            fixed: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n\nincrement()"
        },
        {
            title: "The Shallow Copy",
            type: "LOGIC ERROR",
            prompt: "Changing copied[0] should not change original[0].",
            code: "original = [[1, 2], [3, 4]]\ncopied = original.copy()\ncopied[0].append(99)\nprint(original)",
            options: [
                "copy() cannot be used with lists.",
                "Nested lists cannot contain numbers.",
                "append always changes every list.",
                "copy() creates a shallow copy, so inner lists are shared."
            ],
            answer: 3,
            hint: "The outer list is copied, but are the nested lists copied too?",
            explanation: "A shallow copy duplicates only the outer list. Nested lists remain shared. Use copy.deepcopy when an independent nested structure is required.",
            fixed: "import copy\n\noriginal = [[1, 2], [3, 4]]\ncopied = copy.deepcopy(original)\ncopied[0].append(99)\nprint(original)"
        },
        {
            title: "The Unreachable Return",
            type: "LOGIC ERROR",
            prompt: "This function should return the square of a number.",
            code: "def square(n):\n    print('Calculating')\n    return\n    n * n\n\nprint(square(4))",
            options: [
                "print must be removed from all functions.",
                "The return statement exits the function before n * n runs.",
                "Multiplication cannot be used in functions.",
                "The parameter must be called number."
            ],
            answer: 1,
            hint: "What happens to the function when return runs without a value?",
            explanation: "A bare return immediately exits the function and returns None. Return the calculation instead.",
            fixed: "def square(n):\n    print('Calculating')\n    return n * n\n\nprint(square(4))"
        },
        {
            title: "The Resource Leak",
            type: "RESOURCE ERROR",
            prompt: "Find a safer way to read a file.",
            code: "file = open('data.txt', 'r')\ncontent = file.read()\nprint(content)",
            options: [
                "Use a with statement so the file closes automatically.",
                "Files cannot be read in Python.",
                "read() requires two filenames.",
                "open() must be placed inside print()."
            ],
            answer: 0,
            hint: "Consider what happens if an exception occurs before close() is called.",
            explanation: "A with statement manages the file resource and closes it automatically when the block ends.",
            fixed: "with open('data.txt', 'r', encoding='utf-8') as file:\n    content = file.read()\n    print(content)"
        }
    ]
};

// --------------------------------------------
// BADGES
// --------------------------------------------

const BADGES = {
    first: {
        name: "First Catch",
        emoji: "🐛",
        description: "Answer your first challenge correctly."
    },
    combo: {
        name: "Combo Hunter",
        emoji: "🔥",
        description: "Get three correct answers in a row."
    },
    flawless: {
        name: "Flawless Run",
        emoji: "💎",
        description: "Complete a mission without a wrong answer."
    },
    veteran: {
        name: "Veteran Coder",
        emoji: "⚡",
        description: "Complete five missions."
    },
    boss: {
        name: "Boss Slayer",
        emoji: "👾",
        description: "Complete a Hard mission."
    },
    sharp: {
        name: "Sharp Eyes",
        emoji: "🎯",
        description: "Complete a mission with at least 80% accuracy."
    }
};

// --------------------------------------------
// PROFILE AND GAME STATE
// --------------------------------------------

function defaultProfile() {
    return {
        totalXp: 0,
        bestScore: 0,
        missionsDone: 0,
        badges: [],
        totalCorrect: 0,
        totalAnswered: 0
    };
}

function loadProfile() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return defaultProfile();

        const parsed = JSON.parse(saved);
        const defaults = defaultProfile();

        return {
            ...defaults,
            ...parsed,
            badges: Array.isArray(parsed.badges) ? parsed.badges : []
        };
    } catch (error) {
        console.error("Could not load saved progress:", error);
        return defaultProfile();
    }
}

let profile = loadProfile();
let selectedDifficulty = "easy";

let game = {
    active: false,
    answered: false,
    questions: [],
    index: 0,
    selectedOption: null,
    timeLeft: 0,
    timerId: null,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    xpEarned: 0,
    newBadges: [],
    hintUsed: false,
    questionStartedAt: 0
};

function saveProfile() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
        console.error("Could not save progress:", error);
        showToast("Progress could not be saved in this browser.");
    }
}

function levelFromXp(xp) {
    return Math.floor(Math.max(0, xp) / 100) + 1;
}

function xpWithinLevel(xp) {
    return Math.max(0, xp) % 100;
}

function currentRank(level) {
    if (level >= 10) return "Legendary Debugger";
    if (level >= 7) return "Elite Hunter";
    if (level >= 4) return "Code Specialist";
    if (level >= 2) return "Bug Tracker";
    return "Rookie Coder";
}

// --------------------------------------------
// SCREEN NAVIGATION
// --------------------------------------------

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.toggle("active", screen.id === screenId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function stopTimer() {
    if (game.timerId !== null) {
        clearInterval(game.timerId);
        game.timerId = null;
    }
}

function showToast(message) {
    const toast = $("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

// --------------------------------------------
// PROFILE DISPLAY
// --------------------------------------------

function renderProfile() {
    const xp = profile.totalXp;
    const level = levelFromXp(xp);
    const within = xpWithinLevel(xp);
    const remaining = 100 - within;

    $("totalXp").textContent = `${xp} XP`;
    $("totalXpCard").textContent = `${xp} XP`;
    $("bestScore").textContent = profile.bestScore;
    $("missionsDone").textContent = profile.missionsDone;
    $("badgeCount").textContent = profile.badges.length;
    $("badgeHeaderCount").textContent = `${profile.badges.length}/6 unlocked`;

    $("levelLabel").textContent = `Level ${level}`;
    $("levelNumber").textContent = `LV ${level}`;
    $("rankName").textContent = currentRank(level);

    $("xpProgress").style.width = `${within}%`;
    $("xpProgressText").textContent = `${within}/100 XP this level`;
    $("nextLevelText").textContent = `${remaining} XP to next level`;

    renderBadges();
}

function renderBadges() {
    const container = $("badgePreview");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(BADGES).forEach(([id, badge]) => {
        const unlocked = profile.badges.includes(id);

        const tile = document.createElement("div");
        tile.className = `badge-tile ${unlocked ? "unlocked" : ""}`;

        const emoji = document.createElement("span");
        emoji.className = "badge-emoji";
        emoji.textContent = badge.emoji;

        const name = document.createElement("strong");
        name.textContent = badge.name;

        tile.title = badge.description;
        tile.append(emoji, name);
        container.appendChild(tile);
    });
}

// --------------------------------------------
// DIFFICULTY SELECTION
// --------------------------------------------

function selectDifficulty(difficulty) {
    if (!DIFFICULTIES[difficulty]) return;

    selectedDifficulty = difficulty;

    document.querySelectorAll(".difficulty-card").forEach((card) => {
        card.classList.toggle(
            "selected",
            card.dataset.difficulty === difficulty
        );
    });
}

// --------------------------------------------
// START A MISSION
// --------------------------------------------

function shuffleArray(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function startMission() {
    stopTimer();

    const settings = DIFFICULTIES[selectedDifficulty];
    const available = shuffleArray(CHALLENGES[selectedDifficulty]);

    game = {
        active: true,
        answered: false,
        questions: available.slice(0, settings.count),
        index: 0,
        selectedOption: null,
        timeLeft: settings.time,
        timerId: null,
        streak: 0,
        bestStreak: 0,
        correct: 0,
        xpEarned: 0,
        newBadges: [],
        hintUsed: false,
        questionStartedAt: 0
    };

    $("missionDifficulty").textContent = `${settings.label} MISSION`;

    showScreen("gameScreen");
    renderChallenge();
}

// --------------------------------------------
// RENDER CODE WITH LINE NUMBERS
// --------------------------------------------

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function highlightCode(line) {
    let html = escapeHtml(line);

    // Highlight comments, strings, numbers and common keywords.
    html = html.replace(
        /(#.*$)/g,
        '<span class="code-comment">$1</span>'
    );

    html = html.replace(
        /(&quot;.*?&quot;|&#039;.*?&#039;)/g,
        '<span class="code-string">$1</span>'
    );

    html = html.replace(
        /\b(def|return|if|else|elif|for|while|in|import|from|as|try|except|finally|with|global|None|True|False|and|or|not|is|pass|break|continue)\b/g,
        '<span class="code-keyword">$1</span>'
    );

    html = html.replace(
        /\b\d+\b/g,
        '<span class="code-number">$&</span>'
    );

    return html || "&nbsp;";
}

function renderCode(code) {
    const container = $("codeDisplay");
    container.innerHTML = "";

    code.split("\n").forEach((line, index) => {
        const row = document.createElement("span");
        row.className = "code-line";

        const number = document.createElement("span");
        number.className = "line-number";
        number.textContent = index + 1;

        const content = document.createElement("span");
        content.innerHTML = highlightCode(line);

        row.append(number, content);
        container.appendChild(row);
    });
}

// --------------------------------------------
// RENDER A CHALLENGE
// --------------------------------------------

function renderChallenge() {
    if (!game.active) return;

    const challenge = game.questions[game.index];
    const settings = DIFFICULTIES[selectedDifficulty];

    if (!challenge) {
        finishMission();
        return;
    }

    game.answered = false;
    game.selectedOption = null;
    game.hintUsed = false;
    game.timeLeft = settings.time;
    game.questionStartedAt = Date.now();

    $("questionCounter").innerHTML =
        `Challenge ${String(game.index + 1).padStart(2, "0")} <span>/ ${settings.count}</span>`;

    $("missionProgressFill").style.width =
        `${(game.index / settings.count) * 100}%`;

    $("challengeTitle").textContent = challenge.title;
    $("challengeType").textContent = challenge.type;
    $("challengePrompt").textContent = challenge.prompt;

    $("hintBox").classList.add("hidden");
    $("feedbackBox").className = "feedback-box hidden";
    $("feedbackBox").textContent = "";

    $("hintBtn").disabled = false;
    $("hintBtn").classList.remove("hidden");
    $("submitBtn").disabled = true;
    $("submitBtn").classList.remove("hidden");
    $("nextBtn").classList.add("hidden");

    $("streakValue").textContent = game.streak;
    $("timerValue").textContent = game.timeLeft;

    $("timerValue").parentElement.classList.remove("urgent");

    renderCode(challenge.code);
    renderOptions(challenge);
    startTimer();
}

function renderOptions(challenge) {
    const container = $("optionsContainer");
    container.innerHTML = "";

    challenge.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-button";

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.textContent = option;

        button.append(letter, text);
        button.addEventListener("click", () => selectOption(index));

        container.appendChild(button);
    });
}

function selectOption(index) {
    if (!game.active || game.answered) return;

    game.selectedOption = index;

    document.querySelectorAll(".option-button").forEach((button, i) => {
        button.classList.toggle("selected", i === index);
    });

    $("submitBtn").disabled = false;
}

// --------------------------------------------
// TIMER
// --------------------------------------------

function startTimer() {
    stopTimer();

    $("timerValue").textContent = game.timeLeft;

    game.timerId = setInterval(() => {
        if (!game.active || game.answered) {
            stopTimer();
            return;
        }

        game.timeLeft -= 1;
        $("timerValue").textContent = game.timeLeft;

        if (game.timeLeft <= 5) {
            $("timerValue").parentElement.classList.add("urgent");
        }

        if (game.timeLeft <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

// --------------------------------------------
// HINTS
// --------------------------------------------

function useHint() {
    if (!game.active || game.answered || game.hintUsed) return;

    game.hintUsed = true;

    const cost = 10;
    const actualCost = Math.min(cost, profile.totalXp);

    profile.totalXp -= actualCost;
    game.xpEarned -= actualCost;

    const challenge = game.questions[game.index];

    $("hintText").textContent = challenge.hint;
    $("hintBox").classList.remove("hidden");
    $("hintBtn").disabled = true;

    saveProfile();
    renderProfile();

    showToast(
        actualCost === cost
            ? "Hint unlocked: −10 XP"
            : `Hint unlocked: −${actualCost} XP`
    );
}

// --------------------------------------------
// ANSWER SUBMISSION
// --------------------------------------------

function submitAnswer() {
    if (!game.active || game.answered || game.selectedOption === null) {
        return;
    }

    const challenge = game.questions[game.index];
    const isCorrect = game.selectedOption === challenge.answer;

    resolveAnswer(isCorrect, false);
}

function handleTimeout() {
    if (!game.active || game.answered) return;

    resolveAnswer(false, true);
}

function resolveAnswer(isCorrect, timedOut) {
    if (game.answered || !game.active) return;

    game.answered = true;
    stopTimer();

    const challenge = game.questions[game.index];
    const settings = DIFFICULTIES[selectedDifficulty];

    const buttons = [...document.querySelectorAll(".option-button")];

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === challenge.answer) {
            button.classList.add("correct");
        }

        if (
            !isCorrect &&
            !timedOut &&
            index === game.selectedOption
        ) {
            button.classList.add("wrong");
        }
    });

    if (isCorrect) {
        game.correct += 1;
        game.streak += 1;
        game.bestStreak = Math.max(game.bestStreak, game.streak);

        profile.totalCorrect += 1;
        profile.totalAnswered += 1;

        const timeBonus = Math.floor(game.timeLeft / 5) * 2;
        const streakBonus = game.streak >= 3 ? 10 : 0;
        const gained = settings.xp + timeBonus + streakBonus;

        profile.totalXp += gained;
        game.xpEarned += gained;

        $("feedbackBox").className = "feedback-box correct-feedback";
        $("feedbackBox").innerHTML =
            `<div><strong>✓ Correct! +${gained} XP</strong><p>${escapeHtml(challenge.explanation)}\n\nFixed code:\n${escapeHtml(challenge.fixed)}</p></div>`;

        if (streakBonus > 0) {
            showToast(`🔥 ${game.streak} streak! +${streakBonus} bonus XP`);
        } else {
            showToast(`Bug caught! +${gained} XP`);
        }
    } else {
        game.streak = 0;
        profile.totalAnswered += 1;

        $("feedbackBox").className = "feedback-box wrong-feedback";

        const heading = timedOut
            ? "⏰ Time's up!"
            : "✗ Not quite!";

        $("feedbackBox").innerHTML =
            `<div><strong>${heading}</strong><p>${escapeHtml(challenge.explanation)}\n\nCorrect answer: ${escapeHtml(challenge.options[challenge.answer])}\n\nFixed code:\n${escapeHtml(challenge.fixed)}</p></div>`;

        showToast(timedOut ? "Time expired!" : "Bug escaped. Keep hunting!");
    }

    $("feedbackBox").classList.remove("hidden");
    $("streakValue").textContent = game.streak;

    $("submitBtn").classList.add("hidden");
    $("nextBtn").classList.remove("hidden");
    $("hintBtn").disabled = true;

    $("missionProgressFill").style.width =
        `${((game.index + 1) / settings.count) * 100}%`;

    checkBadges();
    saveProfile();
    renderProfile();
}

// --------------------------------------------
// BADGES
// --------------------------------------------

function unlockBadge(id) {
    if (!BADGES[id] || profile.badges.includes(id)) return;

    profile.badges.push(id);

    if (!game.newBadges.includes(id)) {
        game.newBadges.push(id);
    }

    showToast(`${BADGES[id].emoji} Badge unlocked: ${BADGES[id].name}`);
}

function checkBadges() {
    if (profile.totalCorrect >= 1) {
        unlockBadge("first");
    }

    if (game.bestStreak >= 3) {
        unlockBadge("combo");
    }

    if (game.correct === game.questions.length && game.answered &&
        game.index === game.questions.length - 1) {
        // Also checked at the end of a mission.
        unlockBadge("flawless");
    }

    if (profile.missionsDone >= 4) {
        // The fifth mission is counted at completion.
        // Rechecked after the mission is finalized.
    }

    if (
        selectedDifficulty === "hard" &&
        game.index === game.questions.length - 1 &&
        game.answered
    ) {
        // Confirmed as a completed Hard mission at game-over.
    }

    if (game.questions.length > 0 &&
        game.correct / game.questions.length >= 0.8 &&
        game.index === game.questions.length - 1 &&
        game.answered) {
        unlockBadge("sharp");
    }
}

// --------------------------------------------
// NEXT QUESTION
// --------------------------------------------

function nextChallenge() {
    if (!game.active || !game.answered) return;

    game.index += 1;

    if (game.index >= game.questions.length) {
        finishMission();
        return;
    }

    renderChallenge();
}

// --------------------------------------------
// FINISH MISSION
// --------------------------------------------

function finishMission() {
    if (!game.active) return;

    stopTimer();
    game.active = false;

    const accuracy = Math.round(
        (game.correct / game.questions.length) * 100
    );

    const oldLevel = levelFromXp(profile.totalXp);

    profile.missionsDone += 1;
    profile.bestScore = Math.max(profile.bestScore, game.correct);

    if (game.correct === game.questions.length) {
        unlockBadge("flawless");
    }

    if (profile.missionsDone >= 5) {
        unlockBadge("veteran");
    }

    if (selectedDifficulty === "hard") {
        unlockBadge("boss");
    }

    if (accuracy >= 80) {
        unlockBadge("sharp");
    }

    const newLevel = levelFromXp(profile.totalXp);

    $("resultIcon").textContent =
        accuracy === 100 ? "🏆" : accuracy >= 60 ? "🎯" : "💻";

    $("resultTitle").textContent =
        accuracy === 100
            ? "Flawless hunting!"
            : accuracy >= 60
                ? "Mission complete!"
                : "Keep training, Hunter!";

    $("resultMessage").textContent =
        accuracy === 100
            ? "Every bug caught. Outstanding debugging!"
            : accuracy >= 60
                ? "Good work. Review the explanations and sharpen your skills."
                : "Every mistake is a lesson. Study the fixes and try again.";

    $("runXp").textContent =
        `${game.xpEarned >= 0 ? "+" : ""}${game.xpEarned}`;

    $("correctCount").textContent =
        `${game.correct}/${game.questions.length}`;

    $("accuracyValue").textContent = `${accuracy}%`;
    $("finalStreak").textContent = game.bestStreak;

    const badgeContainer = $("newBadges");
    badgeContainer.innerHTML = "";

    if (game.newBadges.length === 0) {
        const message = document.createElement("p");
        message.className = "microcopy";
        message.textContent = "No new badges this run. Keep hunting to unlock achievements!";
        badgeContainer.appendChild(message);
    } else {
        game.newBadges.forEach((id) => {
            const badge = BADGES[id];
            const row = document.createElement("div");
            row.className = "new-badge";

            const emoji = document.createElement("span");
            emoji.textContent = badge.emoji;

            const details = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = badge.name;

            const description = document.createElement("small");
            description.textContent = badge.description;

            details.append(name, description);
            row.append(emoji, details);
            badgeContainer.appendChild(row);
        });
    }

    saveProfile();
    renderProfile();
    showScreen("resultScreen");

    if (newLevel > oldLevel) {
        showToast(`Level up! You are now Level ${newLevel}`);
    }
}

// --------------------------------------------
// EVENT LISTENERS
// --------------------------------------------

function bindEvents() {
    $("startBtn").addEventListener("click", startMission);
    $("submitBtn").addEventListener("click", submitAnswer);
    $("hintBtn").addEventListener("click", useHint);
    $("nextBtn").addEventListener("click", nextChallenge);

    $("retryBtn").addEventListener("click", startMission);

    $("homeBtn").addEventListener("click", () => {
        stopTimer();
        game.active = false;
        renderProfile();
        showScreen("homeScreen");
    });

    $("exitBtn").addEventListener("click", () => {
        stopTimer();
        game.active = false;
        renderProfile();
        showScreen("homeScreen");
    });

    document.querySelectorAll(".difficulty-card").forEach((card) => {
        card.addEventListener("click", () => {
            selectDifficulty(card.dataset.difficulty);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (!game.active || game.answered) return;

        if (["1", "2", "3", "4"].includes(event.key)) {
            selectOption(Number(event.key) - 1);
        }

        if (event.key === "Enter" && game.selectedOption !== null) {
            submitAnswer();
        }
    });
}

// --------------------------------------------
// INITIALIZE
// --------------------------------------------

function initializeGame() {
    bindEvents();
    renderProfile();
    selectDifficulty("easy");
    showScreen("homeScreen");

    console.log("Bug Hunter initialized successfully.");
    console.log("Available difficulty modes:", Object.keys(DIFFICULTIES));
    console.log("Challenge counts:", {
        easy: CHALLENGES.easy.length,
        medium: CHALLENGES.medium.length,
        hard: CHALLENGES.hard.length
    });
}

initializeGame();
