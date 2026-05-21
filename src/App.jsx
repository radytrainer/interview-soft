import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Moon, Sun, Download, RefreshCw, ChevronDown, ChevronRight, 
  Menu, X, Star, FileText, CheckCircle, BrainCircuit, Bug, 
  Layers, Globe, Shield, UserPlus, Trash2, Users, Edit3, Award, FileSpreadsheet,
  Palette, CheckSquare, Briefcase, ClipboardList, Presentation, UserCheck
} from 'lucide-react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Local storage read error: ", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Local storage write error: ", error);
    }
  };

  return [storedValue, setValue];
}

const CATEGORIES = [
  { id: 'dashboard', name: 'Dashboard', icon: <Layers className="w-5 h-5" /> },
  { id: 'hr_interview', name: 'HR Interview', icon: <UserCheck className="w-5 h-5" /> },
  { id: 'fundamentals', name: 'Communication', icon: <FileText className="w-5 h-5" /> },
  { id: 'api_backend', name: 'Interpersonal Skills', icon: <Globe className="w-5 h-5" /> },
  { id: 'data_structures', name: 'Teamwork', icon: <Users className="w-5 h-5" /> },
  { id: 'dba', name: 'Emotional Intelligence', icon: <Award className="w-5 h-5" /> },
  { id: 'problem_solving', name: 'Problem Solving', icon: <BrainCircuit className="w-5 h-5" /> },
  { id: 'debugging', name: 'Critical Thinking', icon: <Bug className="w-5 h-5" /> },
  { id: 'algorithms', name: 'Adaptability', icon: <RefreshCw className="w-5 h-5" /> },
  { id: 'oop', name: 'Leadership', icon: <Star className="w-5 h-5" /> },
  { id: 'database', name: 'Time Management', icon: <FileSpreadsheet className="w-5 h-5" /> },
  { id: 'task_management', name: 'Task Management', icon: <ClipboardList className="w-5 h-5" /> },
  { id: 'project_management', name: 'Project Management', icon: <Briefcase className="w-5 h-5" /> },
  { id: 'presentation', name: 'Presentation', icon: <Presentation className="w-5 h-5" /> },
  { id: 'security', name: 'Integrity', icon: <Shield className="w-5 h-5" /> },
  { id: 'qa', name: 'Attention to Detail', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 'ux_ui', name: 'Creativity', icon: <Palette className="w-5 h-5" /> },
];

const QUESTION_BANK = {
  "fundamentals": [
    {
      "id": "f1",
      "difficulty": "Basic",
      "question": "How do you explain an idea clearly when speaking with a teacher, classmate, or interviewer?",
      "answer": "I start with the main point, then explain it in simple steps, and finally check whether the other person understands. Clear communication is about being organized, brief, and easy to follow rather than using difficult words.",
      "example": "When presenting a class project, I first explain the goal, then the steps we took, and end with the result."
    },
    {
      "id": "f6",
      "difficulty": "Basic",
      "question": "How do you explain a technical problem to someone who has no background in technology?",
      "answer": "I use everyday analogies, avoid technical jargon, and focus on how the problem affects them directly. I check in frequently to ensure the explanation makes sense to them.",
      "example": "If a server is down, I might explain it as a highway block where traffic (data) can't get through to the destination."
    },
    {
      "id": "f2",
      "difficulty": "Basic",
      "question": "What should you do if you do not understand instructions the first time?",
      "answer": "I should ask respectful follow-up questions instead of guessing. That shows responsibility and helps avoid mistakes. Good communicators confirm expectations early so they can do the task correctly.",
      "example": "If a lecturer gives a group assignment and I am unsure about the format, I ask whether the final output should be a report, slides, or both."
    },
    {
      "id": "f13",
      "difficulty": "Basic",
      "question": "How do you ask for help without sounding like you didn't try to solve the problem yourself?",
      "answer": "I explain what I am trying to achieve, list the specific steps I have already taken, and point to where I got stuck. This shows I did the research.",
      "example": "Saying: \"I'm trying to connect to the API. I verified the key and tested it in Postman, but the react code returns a CORS error. Do you have a moment to look?\""
    },
    {
      "id": "f3",
      "difficulty": "Basic",
      "question": "How do you ensure your communication is respectful when messaging a senior manager or client?",
      "answer": "I use polite greetings, structure the message clearly, and maintain a respectful tone that honors their seniority. In Cambodia, showing respect in hierarchy is key, so I state the issue clearly but humbly and offer solution options.",
      "example": "When messaging a senior director, I begin with a polite greeting, explain the project status briefly, and ask for their advice rather than demanding immediate action."
    },
    {
      "id": "f4",
      "difficulty": "Basic",
      "question": "How do you handle speaking in front of a group when you are nervous?",
      "answer": "I prepare my key points in advance, practice a few times, and focus on the message instead of my fear. Being nervous is normal, but preparation helps me stay calm and communicate with confidence.",
      "example": "Before a presentation, I rehearse the introduction and conclusion so I can start and finish strongly."
    },
    {
      "id": "f5",
      "difficulty": "Intermediate",
      "question": "How do you communicate a problem when something goes wrong?",
      "answer": "I explain the issue honestly, include the important facts, and suggest the next step instead of only reporting bad news. Good communication during a problem should be calm, clear, and solution-focused.",
      "example": "If my team cannot finish our part of a project on time, I inform the lecturer early, explain the blocker, and propose a revised plan."
    },
    {
      "id": "f8",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where someone gives you highly vague or confusing instructions?",
      "answer": "I avoid guessing or assuming. I ask clarifying questions, restate my understanding of the request to them for validation, and ask for a concrete example of the expected output.",
      "example": "When asked to \"make the page look better,\" I ask if they mean improving loading speed, restructuring the layout, or updating the color scheme."
    },
    {
      "id": "f9",
      "difficulty": "Intermediate",
      "question": "How do you handle a communication breakdown or misunderstanding with a colleague?",
      "answer": "I address it immediately and directly, preferably over a voice call or face-to-face rather than text. I focus on clarifying my intent, listening to their perspective, and finding alignment.",
      "example": "When a text message was taken as rude, I called my teammate to clarify that I was just writing quickly during a deployment and apologized for the tone."
    },
    {
      "id": "f12",
      "difficulty": "Intermediate",
      "question": "What do you do when you realize your written message was completely misunderstood by a client?",
      "answer": "I immediately follow up with a clear, simplified summary. If possible, I suggest a quick call to clear up the confusion, acknowledging that text can sometimes lack context.",
      "example": "If a client thinks a feature is cancelled when it is only delayed, I send a revised roadmap chart showing the new delivery slot."
    },
    {
      "id": "f7",
      "difficulty": "Intermediate",
      "question": "What is your greatest communication weakness, and how are you actively working to improve it?",
      "answer": "My weakness is sometimes over-explaining technical details instead of getting straight to the point. I am improving by structuring my responses using the \"Executive Summary\" approach—giving the bottom line first.",
      "example": "When reporting a bug, I now state the impact first, followed by the technical logs only if requested."
    },
    {
      "id": "f11",
      "difficulty": "Intermediate",
      "question": "How do you handle an interviewer or colleague who communicates in a very quiet, distant, or passive-aggressive manner?",
      "answer": "I stay professional, polite, and focused entirely on the facts. I do not take their behavior personally and try to keep my tone warm and open to build a bridge.",
      "example": "If a colleague responds with short, cold emails, I make an effort to have a quick, friendly video call to build rapport."
    },
    {
      "id": "f14",
      "difficulty": "Advanced",
      "question": "How do you give constructive feedback to a colleague while respecting their feelings and preserving group harmony?",
      "answer": "I give feedback privately rather than in public to prevent them from losing face. I focus on the work rather than the person, highlight their strengths first, explain the issue gently, and offer to help them resolve it.",
      "example": "Speaking to a teammate privately after a meeting to show how a styling bug can be fixed, rather than pointing it out in front of the entire group."
    },
    {
      "id": "f10",
      "difficulty": "Advanced",
      "question": "How do you communicate a major delay or project failure to a strict stakeholder?",
      "answer": "I communicate early, provide clear reasons for the delay without making excuses, and present a revised timeline along with concrete recovery options.",
      "example": "Telling a client that a database migration failed, explaining the rollback plan, and showing how we will prevent it on the next attempt."
    },
    {
      "id": "f15",
      "difficulty": "Advanced",
      "question": "How do you communicate when you have to explain a strange or highly counter-intuitive decision made by management?",
      "answer": "I focus on the business context and the \"why\" behind the decision. Even if I disagree, I present the rationale objectively to keep the team aligned and positive.",
      "example": "Explaining why a popular but high-maintenance feature was removed to focus resources on core system stability."
    }
  ],
  "problem_solving": [
    {
      "id": "ps7",
      "difficulty": "Intermediate",
      "question": "What is your biggest weakness when solving complex problems, and how do you handle it?",
      "answer": "My weakness is falling down \"rabbit holes\" trying to fix minor details instead of focusing on the core issue. I manage this by setting a timer and reviewing my progress every 30 minutes.",
      "example": "If I spend too long trying to optimize a single query, I pause to ask if a simpler database index would solve the problem first."
    },
    {
      "id": "ps1",
      "difficulty": "Basic",
      "question": "How do you approach a problem that you have never faced before?",
      "answer": "I start by understanding the problem clearly, then break it into smaller parts, identify what I know, and find the missing information. A structured approach helps me stay calm and prevents me from jumping to weak solutions.",
      "example": "If a team project is not working, I first identify whether the issue is planning, communication, or lack of resources before deciding what to do."
    },
    {
      "id": "ps11",
      "difficulty": "Basic",
      "question": "How do you break down a massive, overwhelming technical task into manageable pieces?",
      "answer": "I identify the final output, list the core dependencies, and create a step-by-step checklist, focusing on building a functional MVP (Minimum Viable Product) first.",
      "example": "If building a full e-commerce backend, I start with a simple endpoint that returns a list of hardcoded products before connecting database or payment systems."
    },
    {
      "id": "ps4",
      "difficulty": "Intermediate",
      "question": "How do you decide between two possible solutions?",
      "answer": "I compare the options based on the goal, available time, available resources, and possible risks. The best solution is usually the one that is practical, realistic, and most likely to solve the main problem well.",
      "example": "For a group presentation, I may choose a simpler slide design that the whole team can finish well instead of a complex design that risks delay."
    },
    {
      "id": "ps6",
      "difficulty": "Intermediate",
      "question": "How do you approach a bug that occurs only sporadically and is extremely hard to reproduce?",
      "answer": "I collect logs, identify patterns (like time of day, user input, or system load), set up detailed telemetry, and isolate variables until I find the trigger.",
      "example": "If a database connection drops randomly, I write a script to monitor network latency and database connection pool usage over 24 hours."
    },
    {
      "id": "ps10",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where you realize your own technical weakness is the main blocker to solving a critical problem?",
      "answer": "I admit the gap early, seek mentorship or advice from a senior colleague, and spend dedicated time learning the specific concept required to unblock the task.",
      "example": "When I didn't know how to write complex SQL joins, I asked a senior developer for a 15-minute explanation and read documentation before continuing."
    },
    {
      "id": "ps12",
      "difficulty": "Intermediate",
      "question": "How do you troubleshoot a strange anomaly where code works perfectly on your machine but fails in production?",
      "answer": "I compare environment configurations, check differences in database state, verify permissions, inspect environment variables, and review the production logs.",
      "example": "Checking if the production server uses a different timezone or node version that changes date parsing behavior."
    },
    {
      "id": "ps13",
      "difficulty": "Intermediate",
      "question": "Describe a time you had to solve a problem with incomplete or contradictory data.",
      "answer": "I list the assumptions I am making, identify the risks of those assumptions, verify what I can, and design the solution to be flexible enough to handle changes later.",
      "example": "Building a form layout before the API schema is finalized by using mock JSON data that can be easily mapped to the real endpoint later."
    },
    {
      "id": "ps3",
      "difficulty": "Intermediate",
      "question": "How do you solve problems when you are under pressure?",
      "answer": "I focus on the facts, prioritize the most urgent issue first, and avoid panicking. Under pressure, it is important to stay organized and choose the action that creates the biggest positive impact.",
      "example": "If two assignments and one presentation are due close together, I rank them by deadline and difficulty and work on the highest-risk task first."
    },
    {
      "id": "ps5",
      "difficulty": "Intermediate",
      "question": "How do you help solve a problem in a team when people have different ideas?",
      "answer": "I listen to each viewpoint, look for the main goal we all share, and suggest a fair way to compare the ideas. Good problem solving in a team means balancing logic, respect, and cooperation.",
      "example": "If teammates disagree about how to divide work, I suggest listing tasks, deadlines, and strengths so we can make a practical decision together."
    },
    {
      "id": "ps14",
      "difficulty": "Advanced",
      "question": "How do you solve a bug that was caused by a strange, undocumented quirk in a third-party library?",
      "answer": "I research GitHub issues, look for alternative implementations, write a minimal reproduction script, and if necessary, write a clean wrapper or patch to bypass the library's bug.",
      "example": "Finding that a library fails on empty arrays, so I add a check to bypass the library call if the array length is zero."
    },
    {
      "id": "ps8",
      "difficulty": "Advanced",
      "question": "How do you solve a problem when you have absolutely no internet access or documentation available?",
      "answer": "I work with what is available: I experiment locally, inspect error messages, search local offline resources, write small tests, and rely on fundamental coding patterns.",
      "example": "Using terminal help commands (like `--help` or `man`) and inspecting code autocomplete or source files to figure out an API structure offline."
    },
    {
      "id": "ps9",
      "difficulty": "Advanced",
      "question": "How do you solve a problem where the client's requested solution is highly strange, inefficient, or counterproductive?",
      "answer": "I seek to understand the root goal they want to achieve. Then, I explain the risks of their proposed approach and present a much better, standard alternative.",
      "example": "If a client wants all database records loaded on a single page, I explain the lag risk and propose infinite scroll or pagination instead."
    },
    {
      "id": "ps2",
      "difficulty": "Intermediate",
      "question": "What do you do when your first solution does not work?",
      "answer": "I review what I tried, identify why it failed, and adjust my approach instead of giving up. Problem solving is often about learning from feedback and improving step by step.",
      "example": "If my first draft of a report is too weak, I compare it with the rubric, improve the missing parts, and ask for feedback before the final submission."
    },
    {
      "id": "ps15",
      "difficulty": "Advanced",
      "question": "What do you do when two senior developers suggest completely opposite and conflicting solutions to a problem?",
      "answer": "I write down the pros and cons of both approaches regarding performance, maintenance, and development speed. I present this objective comparison to them to help reach a consensus.",
      "example": "Presenting a comparison of REST vs GraphQL for a new microservice, helping the senior developers agree on REST for its simplicity in our specific project."
    }
  ],
  "debugging": [
    {
      "id": "db1",
      "difficulty": "Basic",
      "question": "What is critical thinking in an interview or workplace setting?",
      "answer": "Critical thinking means looking at information carefully, questioning assumptions, and making thoughtful decisions based on evidence. It helps students avoid reacting too quickly and improves the quality of their judgment.",
      "example": "If a rumor spreads in a student group, a critical thinker checks the facts before sharing or acting on it."
    },
    {
      "id": "db3",
      "difficulty": "Intermediate",
      "question": "Why is it important to ask why something happened instead of only accepting the result?",
      "answer": "Asking why helps uncover the real cause behind a situation. Without understanding the cause, we may solve only the surface problem and repeat the same mistake later.",
      "example": "If a team misses a deadline, I do not just say the team was late. I ask whether the issue was poor planning, unclear roles, or unexpected workload."
    },
    {
      "id": "db11",
      "difficulty": "Basic",
      "question": "How do you differentiate between a symptom of a problem and its actual root cause?",
      "answer": "I use the \"5 Whys\" technique. I trace the error upstream, questioning why each step failed, rather than just writing code to patch the visible error.",
      "example": "Instead of writing a script to restart a crashed server every hour, I find the underlying memory leak that was causing the crash."
    },
    {
      "id": "db2",
      "difficulty": "Intermediate",
      "question": "How do you evaluate whether information is reliable?",
      "answer": "I check the source, compare it with other information, and look for evidence instead of depending only on opinion. Reliable thinking comes from verifying facts before making a conclusion.",
      "example": "If I am researching for an assignment, I use trusted academic or official sources instead of random posts online."
    },
    {
      "id": "db4",
      "difficulty": "Intermediate",
      "question": "How do you avoid making decisions too quickly?",
      "answer": "I pause, gather enough information, and consider more than one option before choosing. Taking a little time to think reduces avoidable mistakes and leads to stronger decisions.",
      "example": "If I receive conflicting feedback on a project, I compare the comments carefully before changing the work."
    },
    {
      "id": "db5",
      "difficulty": "Intermediate",
      "question": "How can critical thinking improve teamwork?",
      "answer": "It helps people discuss ideas more fairly, notice risks early, and make better group decisions. Critical thinking improves teamwork because it combines analysis with open-minded discussion.",
      "example": "When a team selects a project topic, I compare the options using time, difficulty, and available research instead of choosing only the most popular idea."
    },
    {
      "id": "db12",
      "difficulty": "Intermediate",
      "question": "How do you evaluate the reliability of a new open-source package before adding it to your project?",
      "answer": "I check the library's updates, open issue count, commit history, download volume, and documentation completeness to ensure it is actively maintained and secure.",
      "example": "Rejecting a library that has no updates in 3 years and 50 open security issues in favor of a slightly larger but active alternative."
    },
    {
      "id": "db13",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where you find a massive flaw in the core architecture of a project you just joined?",
      "answer": "I document the flaw, its impact on performance and safety, and prepare a gradual, low-risk refactoring plan rather than complaining or demanding an immediate rewrite.",
      "example": "Finding that passwords are saved in plain text, documenting the security risk, and proposing a hash-and-salt migration plan."
    },
    {
      "id": "db6",
      "difficulty": "Intermediate",
      "question": "How do you identify weaknesses in your own ideas or code designs before presenting them?",
      "answer": "I play devil's advocate: I try to break my design, look for edge cases, consider scaling limitations, and ask myself what a senior reviewer would criticize.",
      "example": "Before suggesting a state library, I ask if context API is sufficient, avoiding unnecessary bundle size and complexity."
    },
    {
      "id": "db8",
      "difficulty": "Intermediate",
      "question": "How do you identify and mitigate your own cognitive biases when making technical decisions?",
      "answer": "I avoid \"shiny object syndrome\" (using tools just because they are new). I base decisions on project requirements, team skills, and benchmark data rather than personal preference.",
      "example": "Resisting the urge to rewrite a stable codebase in Rust just because it is trendy, when the current Node.js setup is performing perfectly."
    },
    {
      "id": "db7",
      "difficulty": "Advanced",
      "question": "How do you investigate a strange anomaly that everyone else dismisses as a \"fluke\" or \"random glitch\"?",
      "answer": "I treat every glitch as a real bug waiting to happen. I look at system logs, check resource limits, review git commits around the time it happened, and try to isolate the exact sequence of events.",
      "example": "Investigating a memory leak that happens only when a user uploads a specifically malformed 50MB file."
    },
    {
      "id": "db14",
      "difficulty": "Advanced",
      "question": "How do you think critically about optimizing a slow page without guessing what is slow?",
      "answer": "I use profiler tools (like Lighthouse or Chrome DevTools Performance tab) to get precise data on load times, layout shifts, and script execution before writing a single line of code.",
      "example": "Profiling a page to find that a slow font file, not the database query, was delaying the initial page paint."
    },
    {
      "id": "db15",
      "difficulty": "Advanced",
      "question": "How do you explain a strange, illogical behavior in a framework you are using to a junior teammate?",
      "answer": "I explain the history of the framework, the trade-offs the creators made, and the underlying Javascript/browser behavior that causes the quirk.",
      "example": "Explaining how React's asynchronous state batching works, showing why state doesn't update immediately on the next line."
    },
    {
      "id": "db9",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where a widely-accepted best practice actually harms your specific project?",
      "answer": "I analyze the custom constraints of my project, collect performance metrics, and document why deviating from the \"best practice\" is the optimal path in this specific scenario.",
      "example": "Bypassing an ORM for direct raw SQL queries in a reporting tool because the ORM generated extremely slow and nested joins."
    },
    {
      "id": "db10",
      "difficulty": "Intermediate",
      "question": "What do you do when a bug report comes from a client, but you cannot find any error logs or stack traces?",
      "answer": "I ask the client for the exact steps, screenshots, or network logs. I try to match their browser environment and check if the error is failing silently on the client-side.",
      "example": "Using browser DevTools simulation to reproduce a layout crash that only happens on Safari on iOS devices."
    }
  ],
  "data_structures": [
    {
      "id": "tw1",
      "difficulty": "Basic",
      "question": "Why is teamwork important for students and future employees?",
      "answer": "Teamwork helps people combine different strengths, share responsibility, and achieve results that may be harder alone. It is important because most real projects require cooperation, not only individual effort.",
      "example": "In a class project, one student may be strong in research, another in design, and another in presenting."
    },
    {
      "id": "tw10",
      "difficulty": "Basic",
      "question": "How do you make sure that credit is distributed fairly within your project group?",
      "answer": "I publicly acknowledge the contributions of my teammates during updates. I make sure that less visible work, like testing or documentation, is valued and praised.",
      "example": "Saying in a demo: \"Alice wrote the database logic, and Bob spent hours cleaning up the API data which made the frontend implementation very easy.\""
    },
    {
      "id": "tw13",
      "difficulty": "Basic",
      "question": "How do you balance being helpful to your teammates with completing your own tasks on time?",
      "answer": "I block out focused time for my own work, and set specific times during the day for answering questions, pair programming, or reviewing code.",
      "example": "Telling a teammate: \"I have to finish this API by 2 PM, but I can jump on a call with you immediately after that to look at your bug.\""
    },
    {
      "id": "tw2",
      "difficulty": "Intermediate",
      "question": "How do you contribute well in a team project?",
      "answer": "I complete my assigned tasks on time, communicate regularly, and support the team when needed. Being a good team member means being reliable as well as cooperative.",
      "example": "If my part of the presentation is finished early, I help check the slides or practice with the group."
    },
    {
      "id": "tw4",
      "difficulty": "Intermediate",
      "question": "How do you handle disagreements within a team?",
      "answer": "I stay calm, listen to the different opinions, and focus on the shared goal instead of making it personal. Healthy disagreement can improve results when it is handled respectfully.",
      "example": "If two people prefer different presentation styles, I suggest comparing them against the assignment criteria."
    },
    {
      "id": "tw5",
      "difficulty": "Intermediate",
      "question": "How do you build trust with teammates?",
      "answer": "I build trust by being honest, dependable, and respectful in how I communicate and work. Trust grows when people know they can rely on me to do what I said I would do.",
      "example": "If I promise to finish the script for our presentation by Friday, I complete it on time or update the team early if there is a problem."
    },
    {
      "id": "tw6",
      "difficulty": "Intermediate",
      "question": "How do you work with a teammate whose technical weakness is slowing down the entire project?",
      "answer": "I offer support without being condescending. I pair program with them, help break down their tasks into smaller chunks, and focus on helping them succeed for the good of the team.",
      "example": "Spending an hour showing a teammate how to write CSS Flexbox layouts so they can complete their assigned UI dashboard."
    },
    {
      "id": "tw9",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where you disagree with the majority of the team on a technical choice?",
      "answer": "I share my reasoning clearly and provide evidence. However, once the team or lead makes a decision, I fully commit to supporting and implementing it, even if I preferred another option.",
      "example": "Disagreeing on database choice but working hard to write clean, optimized code for the database the team ultimately selected."
    },
    {
      "id": "tw14",
      "difficulty": "Intermediate",
      "question": "How do you handle a team member who tries to take credit for work that you did?",
      "answer": "I don't start a conflict. During the next team meeting or code check-in, I present the technical details of my work, demonstrating my deep knowledge and ownership of that component.",
      "example": "Explaining the detailed architecture of the state manager during the project demo to show how I built the core logic."
    },
    {
      "id": "tw3",
      "difficulty": "Intermediate",
      "question": "What should you do if one team member is not contributing enough?",
      "answer": "I would speak respectfully with the person first, try to understand the reason, and look for a fair solution. If the issue continues, I would raise it with the team or lecturer in a professional way.",
      "example": "If a teammate misses two agreed deadlines, I check in privately before escalating the issue."
    },
    {
      "id": "tw7",
      "difficulty": "Intermediate",
      "question": "How do you handle a team dynamic where members have different levels of English proficiency or different cultural backgrounds (e.g. local Khmer teammates and foreign managers)?",
      "answer": "I focus on patience and clear, simple communication. I avoid using complex slang, speak clearly, and follow up verbal agreements with written summaries. I respect local workplace norms and build relationships to keep the team aligned.",
      "example": "Writing key project milestones on Slack in plain English after meetings so both international expats and local developers are on the same page."
    },
    {
      "id": "tw12",
      "difficulty": "Advanced",
      "question": "How do you help onboard a new teammate who feels lost and has imposter syndrome?",
      "answer": "I share my own early struggles to normalize their feelings. I give them simple, achievable tasks first to build their confidence, and let them know there are no stupid questions.",
      "example": "Giving them a simple copy change or CSS fix on day one and celebrating their first merged pull request."
    },
    {
      "id": "tw15",
      "difficulty": "Advanced",
      "question": "How do you rebuild trust with a teammate after a heated professional disagreement?",
      "answer": "I reach out privately, acknowledge the tension, confirm that I respect their skills, and focus on our shared goals to move forward constructively.",
      "example": "Saying: \"I know we had different views on the layout, but I really appreciate your focus on UX. Let's make sure the next phase goes smoothly.\""
    },
    {
      "id": "tw8",
      "difficulty": "Advanced",
      "question": "Describe a time when your team failed, and how you handled the post-mortem without pointing fingers.",
      "answer": "I focused entirely on the system and process failures rather than individual mistakes. I suggested actionable steps to prevent the failure from happening again.",
      "example": "When we missed a deadline, instead of blaming the coder who was late, I suggested we implement daily check-ins to spot blockers earlier."
    },
    {
      "id": "tw11",
      "difficulty": "Intermediate",
      "question": "What do you do when a teammate is highly defensive about your comments during a peer code review?",
      "answer": "I explain that my comments are focused on the code and its readability/security, not their personal ability. I explain the \"why\" behind my suggestion and ask for their thoughts.",
      "example": "Suggesting: \"Changing this loop could prevent a memory leak\" instead of \"Your code is slow.\""
    }
  ],
  "algorithms": [
    {
      "id": "ad1",
      "difficulty": "Basic",
      "question": "Why is adaptability important for students entering the workplace?",
      "answer": "Adaptability helps students respond well to change, learn new skills, and stay effective in unfamiliar situations. Employers value it because work conditions, tools, and priorities often change.",
      "example": "A student who quickly learns a new presentation format after the teacher changes the assignment is showing adaptability."
    },
    {
      "id": "ad7",
      "difficulty": "Intermediate",
      "question": "What is your biggest weakness when plans change suddenly, and how do you manage it?",
      "answer": "My weakness is initially feeling disappointed when work I did is discarded. I manage it by reminding myself that changing direction is a business reality, and my code is a tool, not my identity.",
      "example": "If a feature is cut after I spent a week building it, I save the code in a branch for reference and pivot immediately to the new priority."
    },
    {
      "id": "ad11",
      "difficulty": "Basic",
      "question": "How do you learn a new framework or technology when you only have a weekend to prepare?",
      "answer": "I skip long courses and build a small, functional app immediately. Active learning through debugging helps me understand the core concepts much faster.",
      "example": "Building a simple to-do list app in Vue over the weekend to understand its data-binding and reactivity system."
    },
    {
      "id": "ad5",
      "difficulty": "Intermediate",
      "question": "How do you stay effective in an unfamiliar environment?",
      "answer": "I observe carefully, ask useful questions, and stay open to different ways of working. Adaptability is not pretending to know everything. It is learning fast and staying calm while adjusting.",
      "example": "During an internship, I may need to follow a new communication style or schedule, so I observe the team and adjust quickly."
    },
    {
      "id": "ad10",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where a client changes the project requirements just days before the final deadline?",
      "answer": "I assess what can realistically be completed, present the options to the client (e.g., delay the deadline, or launch the original version and add the changes in a phase 2), and let them decide.",
      "example": "Explaining that we can add the complex credit card gateway by next week, or launch on time with an ABA KHQR / Bakong payment option."
    },
    {
      "id": "ad12",
      "difficulty": "Intermediate",
      "question": "Tell me about a time you had to change your working style to fit a team's culture?",
      "answer": "I observed how the team communicated, handled tasks, and ran meetings. I adjusted my style to match theirs so we could collaborate without friction.",
      "example": "Moving from a highly informal team to a team that documented every single decision in Jira, and learning to write detailed task descriptions."
    },
    {
      "id": "ad2",
      "difficulty": "Intermediate",
      "question": "How do you react when plans suddenly change?",
      "answer": "I focus on understanding the new situation, adjusting priorities, and staying positive instead of complaining. Adaptability means responding constructively when things do not go exactly as expected.",
      "example": "If a team member becomes unavailable before a deadline, I help reorganize the work so the project can still move forward."
    },
    {
      "id": "ad3",
      "difficulty": "Intermediate",
      "question": "How do you adapt when you receive new feedback?",
      "answer": "I listen carefully, compare the feedback with the goal, and make changes where they improve the result. Adaptable people do not see feedback as failure. They see it as a chance to improve.",
      "example": "If my lecturer says my report is too general, I add stronger evidence and clearer examples in the next draft."
    },
    {
      "id": "ad6",
      "difficulty": "Intermediate",
      "question": "How do you adapt when you are thrown into a new role with vague processes and very strange legacy systems?",
      "answer": "I spend time observing, documenting the current system as I learn it, and asking clarifying questions. I focus on making small, safe improvements rather than trying to rewrite everything.",
      "example": "Creating a quick setup guide for myself while navigating a messy legacy code repository, which I then share with the team."
    },
    {
      "id": "ad13",
      "difficulty": "Intermediate",
      "question": "How do you handle it when your manager gives you feedback that contradicts their previous advice?",
      "answer": "I avoid pointing out the contradiction directly or defensively to ensure respect and group harmony. Instead, I ask clarifying questions to align with their current expectations, acknowledging that project requirements or business needs may have shifted.",
      "example": "Saying: \"To make sure I deliver exactly what is needed for this client report, should we focus more on the detailed technical data or the high-level business summary?\""
    },
    {
      "id": "ad8",
      "difficulty": "Advanced",
      "question": "How do you adapt when the framework or library you mastered is suddenly deprecated for a new, untested tool?",
      "answer": "I focus on the transferable concepts. Languages and libraries are just tools. I read the documentation of the new tool, build small prototypes, and learn its core paradigms.",
      "example": "Moving from class components in React to hooks, or migrating to a new framework by identifying the shared routing and state concepts."
    },
    {
      "id": "ad9",
      "difficulty": "Advanced",
      "question": "How do you stay calm and effective when you are assigned to support a critical system crash in a language you barely know?",
      "answer": "I rely on universal concepts: reading error messages, checking logs, comparing the broken state with a working version, and using google/documentation to translate syntax.",
      "example": "Debugging a syntax crash in a Python script by using print statements and online syntax guides, even though my main language is JavaScript."
    },
    {
      "id": "ad14",
      "difficulty": "Advanced",
      "question": "How do you handle working under a new manager who has a very different management style than your previous one?",
      "answer": "I schedule a short check-in to learn their preferences: how they prefer updates (slack, email, or meeting), what metrics they value, and how I can best support the team under their leadership.",
      "example": "Adapting from a hands-off manager to one who prefers daily standups by preparing short, clear summaries of my work each morning."
    },
    {
      "id": "ad4",
      "difficulty": "Intermediate",
      "question": "What do you do when you need to learn something quickly?",
      "answer": "I identify the most important parts first, use reliable resources, and practice immediately so the knowledge becomes useful. Quick learning works best when it is focused and active.",
      "example": "If I need to use a new tool for class, I learn the essential features first instead of trying to master everything at once."
    },
    {
      "id": "ad15",
      "difficulty": "Advanced",
      "question": "What do you do when a key teammate leaves the project, leaving you to handle their complex tasks alone?",
      "answer": "I request a quick knowledge transfer before they leave, document their active tasks, prioritize the work with my manager, and adjust deadlines to match the new capacity.",
      "example": "Mapping out the departing teammate's undocumented API endpoints so I can maintain them after they leave."
    }
  ],
  "oop": [
    {
      "id": "ld1",
      "difficulty": "Basic",
      "question": "What does leadership mean for a student who is not a manager?",
      "answer": "Leadership means taking initiative, acting responsibly, and helping others move toward a goal. A student can show leadership by setting a positive example, not only by having a formal title.",
      "example": "A student who organizes the group, keeps everyone focused, and encourages participation is showing leadership."
    },
    {
      "id": "ld10",
      "difficulty": "Basic",
      "question": "How do you help a teammate who is struggling with self-confidence and self-doubt?",
      "answer": "I highlight their specific strengths, give them tasks where they can succeed, and offer constructive feedback privately to build their confidence step-by-step.",
      "example": "Praise their documentation skills in front of the group, and ask for their help in organizing the project files."
    },
    {
      "id": "ld13",
      "difficulty": "Basic",
      "question": "How do you keep your team motivated when progress is slow and the project feels boring?",
      "answer": "I break the remaining work into small, achievable goals, celebrate minor wins, and remind the team of the final impact of their work.",
      "example": "Ordering pizza for a late-night coding session and celebrating when we successfully merge the frontend with the backend."
    },
    {
      "id": "ld2",
      "difficulty": "Intermediate",
      "question": "How can you show leadership in a group project?",
      "answer": "I can show leadership by helping the team organize the work, keeping communication clear, and supporting others when problems appear. Good leadership is about service and direction, not control.",
      "example": "I might create a task list, confirm deadlines, and help teammates who are unclear about their part."
    },
    {
      "id": "ld5",
      "difficulty": "Intermediate",
      "question": "How do you lead by example?",
      "answer": "I do the work I expect from others, stay accountable, and treat people with respect. Leadership by example builds credibility because people trust actions more than words.",
      "example": "If I ask the group to be on time, I make sure I arrive prepared and on time myself."
    },
    {
      "id": "ld9",
      "difficulty": "Intermediate",
      "question": "How do you handle a team member who constantly challenges your leadership or ideas?",
      "answer": "I listen to their criticisms in a calm and objective manner. If their points are valid, I incorporate them. If they are just being difficult, I address it privately to find a constructive way forward.",
      "example": "Discussing their concerns privately, showing that I value their input, and asking how we can work together to achieve the project's goals."
    },
    {
      "id": "ld3",
      "difficulty": "Intermediate",
      "question": "How do you lead when team members have different personalities?",
      "answer": "I adjust my communication style, listen carefully, and focus on what helps the group work well together. Flexible leadership means understanding people and guiding them in a respectful way.",
      "example": "With a quiet teammate, I may ask directly for their ideas so they feel included."
    },
    {
      "id": "ld4",
      "difficulty": "Intermediate",
      "question": "What should a leader do when the team loses motivation?",
      "answer": "A leader should reconnect the team to the goal, break the work into manageable steps, and encourage progress instead of criticism. Motivation often improves when people feel supported and see a clear path forward.",
      "example": "If a project feels overwhelming, I help divide it into smaller tasks and celebrate progress as each part is completed."
    },
    {
      "id": "ld6",
      "difficulty": "Intermediate",
      "question": "How do you lead a project or initiative when you have no formal authority or title over the team?",
      "answer": "I lead through influence, empathy, and organization. I build trust by being reliable, helping resolve conflicts, and making sure everyone's ideas are heard and respected.",
      "example": "Organizing a study group, setting up a shared Google Drive, and proposing a weekly schedule that everyone agrees to follow."
    },
    {
      "id": "ld11",
      "difficulty": "Intermediate",
      "question": "How do you delegate tasks in a team where everyone has different skill levels?",
      "answer": "I match tasks with strengths, but also look for growth opportunities. I assign high-risk tasks to experienced members and give junior members learning tasks with mentorship support.",
      "example": "Pairing a beginner with an experienced teammate to work on the database schema, ensuring the database is solid while the beginner learns."
    },
    {
      "id": "ld7",
      "difficulty": "Advanced",
      "question": "How do you lead a teammate who is highly talented but has a strange, eccentric, or disruptive work behavior?",
      "answer": "I focus on their output and steer their energy productively. I set clear boundaries for group interactions, while giving them the space they need to do their best individual work.",
      "example": "Letting a brilliant but eccentric classmate work alone on the algorithm implementation, while keeping them aligned during daily standups."
    },
    {
      "id": "ld8",
      "difficulty": "Advanced",
      "question": "Tell me about a leadership decision you made that turned out to be a mistake, and how you handled the consequences.",
      "answer": "I took responsibility for the mistake immediately. I gathered the team, explained what went wrong, and worked collectively to pivot to a better solution.",
      "example": "Choosing a database that was too complex for a project, admitting the error to the team, and helping migrate back to a simpler SQL database."
    },
    {
      "id": "ld15",
      "difficulty": "Advanced",
      "question": "How do you prepare your team to handle a critical presentation or deployment successfully?",
      "answer": "I run a dry run or staging deployment. I assign clear roles for the event, prepare backup plans for failures, and make sure everyone knows their responsibilities.",
      "example": "Setting up a backup slide deck and assigning a co-presenter to take over if anyone's internet connection drops."
    },
    {
      "id": "ld14",
      "difficulty": "Advanced",
      "question": "How do you advocate for your team when a manager sets an unrealistic deadline?",
      "answer": "I present data: I show the team's velocity, list the tasks required, and propose a realistic scope that can be delivered on time with high quality.",
      "example": "Presenting a sprint chart showing that we need 10 days, not 5, to deliver a secure login system, and proposing we cut minor features to meet the 5-day slot."
    },
    {
      "id": "ld12",
      "difficulty": "Intermediate",
      "question": "What do you do when a conflict between two teammates threatens to stall the entire project?",
      "answer": "I act as a neutral mediator. I listen to both sides privately, find common ground, and steer the discussion back to the project's requirements and goals.",
      "example": "Getting two arguing developers to focus on the performance metrics of their code rather than making personal criticisms."
    }
  ],
  "database": [
    {
      "id": "tm1",
      "difficulty": "Basic",
      "question": "Why is time management important for students and employees?",
      "answer": "Time management helps people meet deadlines, reduce stress, and produce better work. It is important because good planning creates more control over responsibilities and results.",
      "example": "A student who starts research early usually produces better work than someone who rushes the night before."
    },
    {
      "id": "tm6",
      "difficulty": "Intermediate",
      "question": "What is your biggest time management weakness, and what system do you use to control it?",
      "answer": "My weakness is overestimating how much I can get done in a day. I manage this by tracking my time, adding a 20% buffer to estimates, and planning only three main tasks per day.",
      "example": "Using a digital calendar to block specific times for coding, writing reports, and resting to avoid burnout."
    },
    {
      "id": "tm12",
      "difficulty": "Basic",
      "question": "How do you handle a situation where you are waiting on someone else's work to start your own task?",
      "answer": "I don't stay idle. I work on other tasks, prepare mock data or structures to use when their work arrives, or offer to help them finish their part.",
      "example": "Writing mock API responses for the frontend while waiting for the backend developer to deploy the real server."
    },
    {
      "id": "tm10",
      "difficulty": "Basic",
      "question": "How do you handle distractions (like social media or emails) when you need to focus on a difficult task?",
      "answer": "I use the Pomodoro technique. I turn off notifications, block distracting websites, and focus completely for 25 minutes before taking a short break.",
      "example": "Putting my phone in another room and using a browser extension to block social media during study sessions."
    },
    {
      "id": "tm3",
      "difficulty": "Intermediate",
      "question": "How do you avoid procrastination?",
      "answer": "I break large tasks into smaller steps, set mini-deadlines, and start with one clear action. Procrastination becomes easier to overcome when the work feels manageable.",
      "example": "Instead of thinking 'write the whole report,' I begin with 'find three sources' or 'draft the introduction.'"
    },
    {
      "id": "tm5",
      "difficulty": "Intermediate",
      "question": "How do you stay organized over a busy week?",
      "answer": "I use a simple plan such as a calendar, task list, or schedule, and I review it regularly. Staying organized works best when I know what needs to be done each day.",
      "example": "At the start of the week, I list classes, deadlines, and study times so I can see where to focus."
    },
    {
      "id": "tm2",
      "difficulty": "Intermediate",
      "question": "How do you prioritize when you have many tasks at once?",
      "answer": "I look at deadlines, importance, and effort, then start with the tasks that are both urgent and important. Prioritizing helps me avoid wasting energy on less important work first.",
      "example": "If I have an exam, a team project, and a small homework task, I plan based on impact and due date."
    },
    {
      "id": "tm11",
      "difficulty": "Intermediate",
      "question": "How do you decide when a task is \"good enough\" to submit, rather than wasting time trying to make it perfect?",
      "answer": "I compare my work against the project requirements and acceptance criteria. If it meets all criteria, passes testing, and is clean, I submit it and move to the next task.",
      "example": "Submitting a working dashboard layout that looks clean and professional instead of spending three extra hours tweaking pixel shadows."
    },
    {
      "id": "tm13",
      "difficulty": "Intermediate",
      "question": "How do you manage your project deadlines when major national holidays (like Pchum Ben or Khmer New Year) are approaching?",
      "answer": "I plan ahead by finalizing critical deliverables at least one week before the holiday begins. I communicate early with the team and clients to set expectations, ensuring all urgent work is covered so everyone can enjoy family time without work disruptions.",
      "example": "Accelerating code testing and deploying the stable API version a week before Pchum Ben, so the client database runs smoothly during the holiday."
    },
    {
      "id": "tm7",
      "difficulty": "Advanced",
      "question": "How do you manage your time when a project has a chaotic, unpredictable, or constantly changing schedule?",
      "answer": "I prioritize tasks dynamically. I focus on core essentials first, maintain a flexible task list, and communicate changes in my capacity immediately to my team.",
      "example": "Working in short, focused sprints and daily planning sessions during a hackathon to adjust to shifting guidelines."
    },
    {
      "id": "tm9",
      "difficulty": "Advanced",
      "question": "How do you manage your time when you are working on multiple projects with different managers?",
      "answer": "I keep a single, centralized calendar of all deliverables. If conflicts arise, I bring the managers together to agree on which project takes priority.",
      "example": "Showing both project leads my weekly schedule so they can agree on how to split my hours fairly."
    },
    {
      "id": "tm14",
      "difficulty": "Advanced",
      "question": "How do you manage your time when you are given a task with no deadline or guidance?",
      "answer": "I set my own realistic deadline, create a simple project outline, and check in with the requester to confirm if the timeline fits their expectations.",
      "example": "When asked to \"research state libraries,\" I propose a deadline of Friday to deliver a comparison document."
    },
    {
      "id": "tm15",
      "difficulty": "Advanced",
      "question": "How do you handle time management when a critical blocker appears during a task that is due in an hour?",
      "answer": "I focus immediately on a fallback or workaround that meets the deadline, and notify the team of the blocker and the temporary solution.",
      "example": "Hardcoding a config file temporarily to demo a project when the remote configuration database goes down just before the presentation."
    },
    {
      "id": "tm4",
      "difficulty": "Intermediate",
      "question": "What do you do when you realize you may not finish on time?",
      "answer": "I review what is left, adjust my plan, and communicate early if needed. Good time management includes noticing risk early and taking action before it becomes a bigger problem.",
      "example": "If I see that my part of a group project will be late, I tell the team early and suggest a realistic update plan."
    },
    {
      "id": "tm8",
      "difficulty": "Intermediate",
      "question": "What do you do when you realize you have severely underestimated the time required to complete a task?",
      "answer": "I raise the issue early. I explain why the task is taking longer, present my current progress, and ask for support or a deadline adjustment before it's too late.",
      "example": "Finding a bug in a API took 5 hours instead of 1, so I updated the group at noon rather than waiting for the evening standup."
    }
  ],
  "api_backend": [
    {
      "id": "ip1",
      "difficulty": "Basic",
      "question": "What are interpersonal skills?",
      "answer": "Interpersonal skills are the abilities that help people interact effectively with others, such as listening, respect, empathy, and cooperation. They are important in both study and work environments.",
      "example": "A student who communicates kindly and works well with classmates is showing strong interpersonal skills."
    },
    {
      "id": "ip5",
      "difficulty": "Intermediate",
      "question": "Why are interpersonal skills valuable in interviews?",
      "answer": "They show that a candidate can work well with others, communicate professionally, and fit into a team environment. Even strong technical people need interpersonal skills to succeed in real workplaces.",
      "example": "A student who answers politely, listens fully, and responds thoughtfully often leaves a stronger interview impression."
    },
    {
      "id": "ip11",
      "difficulty": "Basic",
      "question": "How do you handle feedback on your behavior or attitude that you feel is unfair?",
      "answer": "I avoid reacting defensively. I thank the person for the feedback, take time to reflect on it, and ask for specific examples so I can understand their perspective.",
      "example": "Asking: \"Could you tell me which meeting you felt I was dismissive, so I can understand what I did wrong?\""
    },
    {
      "id": "ip13",
      "difficulty": "Basic",
      "question": "How do you show appreciation to your peers without sounding insincere?",
      "answer": "I give specific praise. I explain exactly what they did and how it helped the project or the team, rather than giving generic compliments.",
      "example": "Saying: \"Thank you for fixing the database configuration yesterday. It saved us hours of setup and let us start frontend testing early.\""
    },
    {
      "id": "ip2",
      "difficulty": "Intermediate",
      "question": "How do you build good relationships with classmates or coworkers?",
      "answer": "I build relationships by being respectful, dependable, and easy to communicate with. Strong relationships usually grow from consistent positive behavior, not only from being friendly once.",
      "example": "When working with new classmates, I introduce myself, listen to their ideas, and follow through on my tasks."
    },
    {
      "id": "ip6",
      "difficulty": "Intermediate",
      "question": "How do you handle working with a classmate or colleague who has a very cold, distant, or quiet personality?",
      "answer": "I respect their boundaries and don't force social interactions. I communicate clearly, ask for their input in structured ways, and focus on building trust through reliability.",
      "example": "Giving them written updates and asking: \"What do you think of this approach? Let me know whenever you have time.\""
    },
    {
      "id": "ip7",
      "difficulty": "Intermediate",
      "question": "How do you handle feelings of self-doubt or imposter syndrome in group settings or networking events?",
      "answer": "I remind myself that learning is a process and everyone has gaps. I focus on listening, asking curious questions, and contributing what I know rather than trying to look perfect.",
      "example": "Instead of staying quiet, I ask: \"That's an interesting approach, could you explain how you handled the security setup?\""
    },
    {
      "id": "ip3",
      "difficulty": "Intermediate",
      "question": "How do you work with someone whose style is different from yours?",
      "answer": "I stay open-minded, focus on the shared goal, and adapt my communication where needed. Different styles do not have to be a problem if both people stay respectful and practical.",
      "example": "If I am very fast but my teammate is more careful, I balance speed with their need for detail."
    },
    {
      "id": "ip4",
      "difficulty": "Intermediate",
      "question": "How do you respond when someone misunderstands you?",
      "answer": "I stay calm, clarify my point without blaming them, and make sure we are aligned before moving on. Good interpersonal skills help resolve misunderstandings without creating conflict.",
      "example": "If a teammate misunderstands my task update, I restate the message in simpler terms and confirm what we agreed."
    },
    {
      "id": "ip10",
      "difficulty": "Intermediate",
      "question": "How do you build rapport with a client or team member from a different cultural background (e.g., a foreign partner or expat manager)?",
      "answer": "I respect cultural differences, avoid localized slang, and listen carefully. I show interest in their perspective, use professional business greetings, and learn about their cultural communication style to prevent misunderstandings.",
      "example": "Welcoming an international expat manager with traditional Cambodian politeness, using clear English, and explaining local office customs to help them settle in."
    },
    {
      "id": "ip8",
      "difficulty": "Advanced",
      "question": "How do you deliver awkward, disappointing, or bad news to a stakeholder without ruining the relationship?",
      "answer": "I present the facts honestly, show empathy, explain the steps we are taking to resolve the issue, and provide options they can choose from.",
      "example": "Telling a client that a feature will be delayed by a week, apologizing for the inconvenience, and offering a discount or a partial launch."
    },
    {
      "id": "ip9",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where a client or teammate is yelling or acting highly unprofessional towards you?",
      "answer": "I stay completely calm and professional. I do not match their anger. I listen to the issue underneath, and if they continue, I politely suggest we resume the discussion when we can focus on solutions.",
      "example": "Saying: \"I understand you are frustrated, and I want to resolve this. Let's take a 10-minute break and look at the options calmly.\""
    },
    {
      "id": "ip14",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where you have to work with someone you personally dislike?",
      "answer": "I keep my focus entirely on the project's success. I treat them with the same respect and professionalism as anyone else, keeping interactions polite and productive.",
      "example": "Working closely with a difficult classmate to finish the UI design, focusing only on the wireframes and user flows."
    },
    {
      "id": "ip15",
      "difficulty": "Advanced",
      "question": "How do you manage expectations when a stakeholder asks for a feature that is impossible to build within their budget?",
      "answer": "I explain the technical and financial constraints clearly. I then propose a simplified alternative that meets their core needs within their budget.",
      "example": "Proposing a simpler static website with a contact form instead of a fully custom database-driven web application."
    },
    {
      "id": "ip12",
      "difficulty": "Intermediate",
      "question": "What do you do when a teammate is going through a personal crisis that is affecting their work?",
      "answer": "I show empathy and ask how I can support them. I help them adjust their workload and work with the team to cover their tasks while they manage the situation.",
      "example": "Telling a teammate whose relative is sick: \"Focus on your family. I will cover your standup update today and help finish the slides.\""
    }
  ],
  "security": [
    {
      "id": "in1",
      "difficulty": "Basic",
      "question": "What does integrity mean in a student or work environment?",
      "answer": "Integrity means being honest, responsible, and consistent in doing the right thing even when no one is watching. It builds trust and shows strong character.",
      "example": "A student with integrity does not copy another person's work and admits mistakes honestly."
    },
    {
      "id": "in10",
      "difficulty": "Basic",
      "question": "What does \"doing the right thing\" mean when you are working on a school project with friends?",
      "answer": "It means doing my fair share of the work, being honest about my progress, and not letting my friends carry my load because we are close.",
      "example": "Working late to finish my part of the presentation so my friends don't have to scramble to write it for me."
    },
    {
      "id": "in4",
      "difficulty": "Intermediate",
      "question": "Why is honesty important in interviews?",
      "answer": "Honesty helps interviewers trust the candidate and understand their real strengths and development areas. It is better to admit what I still need to learn than to pretend I know something I do not.",
      "example": "If I have limited experience with a tool, I say that honestly and explain how I would learn it."
    },
    {
      "id": "in12",
      "difficulty": "Basic",
      "question": "How do you handle a mistake in a presentation where you gave incorrect data, but no one noticed during the meeting?",
      "answer": "I follow up in writing with the correct information as soon as possible. Being honest about data ensures decisions are made on correct facts.",
      "example": "Sending an email after the demo: \"I checked the logs, and our user registration increased by 15%, not 25% as I stated. Apologies for the confusion.\""
    },
    {
      "id": "in5",
      "difficulty": "Intermediate",
      "question": "How does integrity affect teamwork?",
      "answer": "Teams work better when members trust each other to be truthful, fair, and responsible. Integrity reduces confusion and builds a stronger working environment.",
      "example": "If I cannot finish my part on time, integrity means telling the team early instead of pretending everything is fine."
    },
    {
      "id": "in9",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where you realize a coworker is copying code from an open-source project without respecting its license?",
      "answer": "I discuss it privately with them, explain the legal and compliance risks for the project, and help them find a properly licensed alternative.",
      "example": "Showing a teammate that a library they copied requires a commercial license, and helping them find an MIT-licensed alternative."
    },
    {
      "id": "in11",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where a client asks you to exaggerate your project's performance metrics to investors?",
      "answer": "I refuse. I explain that presenting accurate data builds long-term trust, whereas exaggerations create legal risks and ruin credibility. I suggest highlighting our real improvements instead.",
      "example": "Refusing to double the reported page load speeds in a deck, and focusing on the 20% real increase we achieved."
    },
    {
      "id": "in2",
      "difficulty": "Intermediate",
      "question": "How do you respond if you make a mistake?",
      "answer": "I admit the mistake, take responsibility, and focus on correcting it quickly. Integrity means being honest about errors instead of hiding them or blaming others.",
      "example": "If I submit the wrong file, I inform the teacher immediately and send the correct version with an apology."
    },
    {
      "id": "in14",
      "difficulty": "Advanced",
      "question": "How do you manage a situation where you are given access to sensitive user data during testing?",
      "answer": "I handle the data with strict privacy. I use only mock or anonymized data for testing, ensure the real data is not stored locally on my machine, and follow all data security rules.",
      "example": "Deleting real user database dumps from my local machine immediately after verifying a migration bug."
    },
    {
      "id": "in15",
      "difficulty": "Advanced",
      "question": "How do you handle a conflict between your personal values and a project you are assigned to work on?",
      "answer": "I discuss it professionally with my manager. I explain my concerns without judgment and ask if there are alternative projects or tasks I can work on that align better with my values.",
      "example": "Requesting to move off a project that involves building predatory billing features, and moving to the core infrastructure team instead."
    },
    {
      "id": "in7",
      "difficulty": "Advanced",
      "question": "How do you respond if a supervisor or client asks you to bypass standard data security or privacy guidelines to speed up a project launch?",
      "answer": "I ask for clarification to make sure I did not misunderstand. I then politely explain the compliance and reputational risks (such as exposing customer data or violating local laws) and suggest a secure, standard way to launch.",
      "example": "Refusing to export customer phone numbers and transaction histories to a public Google Sheet, and proposing a secure, role-based admin dashboard instead."
    },
    {
      "id": "in3",
      "difficulty": "Intermediate",
      "question": "What would you do if a friend asked you to do something dishonest?",
      "answer": "I would refuse respectfully and explain that I want to act fairly and responsibly. Integrity sometimes requires saying no, even when it feels uncomfortable.",
      "example": "If a friend asks for my answers during an exam, I would not share them because it would be unfair and dishonest."
    },
    {
      "id": "in6",
      "difficulty": "Intermediate",
      "question": "What do you do if you notice a subtle, technical loophole that could save your project money but violates security standards?",
      "answer": "I do not use it. Integrity means maintaining standards even when shortcuts are easy. I document the security risk and report the loophole so it can be fixed.",
      "example": "Rejecting a method that bypasses user authentication to load pages faster, and choosing to optimize the database queries instead."
    },
    {
      "id": "in13",
      "difficulty": "Intermediate",
      "question": "What do you do when you see a classmate or teammate cheating on an assessment or copying another group's code?",
      "answer": "I advise them privately to stop, explaining the risk of failing or being expelled. If it affects our group's work directly, I insist we write our own code to maintain our project's integrity.",
      "example": "Telling a classmate: \"Let's rewrite this part ourselves. Copying this file could get our whole team disqualified.\""
    },
    {
      "id": "in8",
      "difficulty": "Advanced",
      "question": "What do you do if you make a major mistake on a project that nobody else has noticed yet, and could easily be hidden?",
      "answer": "I report it immediately to the team or lead. Owning mistakes builds trust. I explain what happened and present a plan to fix the error.",
      "example": "Noticing I accidentally deleted a database index that caused performance lag, reporting it, and applying the fix immediately."
    }
  ],
  "ux_ui": [
    {
      "id": "cr1",
      "difficulty": "Basic",
      "question": "What does creativity mean in a professional or student setting?",
      "answer": "Creativity means finding useful, original, or thoughtful ways to solve problems and express ideas. It is not only about art. It also includes fresh thinking and practical improvement.",
      "example": "A student who presents research in a clear and engaging way is showing creativity."
    },
    {
      "id": "cr12",
      "difficulty": "Basic",
      "question": "What is the difference between creativity that is useful and creativity that is just self-expression?",
      "answer": "Useful creativity solves a specific problem or meets a user need. Self-expression is about personal taste. In product design, creativity must always serve the user and the project goals.",
      "example": "Designing a navigation menu that is unique but still easy for a first-time user to understand, rather than one that looks artistic but is confusing."
    },
    {
      "id": "cr6",
      "difficulty": "Intermediate",
      "question": "What is your process when you hit a creative block, and how do you get past it?",
      "answer": "I step away from the computer. I seek inspiration in other fields, sketch ideas on paper, look at design galleries, or discuss the problem with someone who is not involved in the project.",
      "example": "Taking a 10-minute walk or sketching layout wireframes with a pencil when I can't decide how to design a user dashboard."
    },
    {
      "id": "cr10",
      "difficulty": "Basic",
      "question": "How do you find creative ways to make a boring or routine task more engaging?",
      "answer": "I look for ways to automate the routine parts, gamify my progress, or find a new perspective that makes the task a learning opportunity.",
      "example": "Writing a short bash script to automate file reorganization, which turns a boring manual task into a coding challenge."
    },
    {
      "id": "cr2",
      "difficulty": "Intermediate",
      "question": "How can creativity help in solving everyday problems?",
      "answer": "Creativity helps people see more than one possible solution and improve results when the first idea is not enough. It supports both innovation and adaptability.",
      "example": "If my group has limited time for a presentation, I may create a simpler but more engaging format to deliver the message clearly."
    },
    {
      "id": "cr4",
      "difficulty": "Intermediate",
      "question": "How do you encourage creative ideas in a team?",
      "answer": "I make room for different suggestions, avoid judging ideas too early, and then help the team evaluate which ideas fit the goal best. Creativity grows when people feel safe to contribute.",
      "example": "During brainstorming, I let teammates suggest multiple concepts before the group selects the strongest one."
    },
    {
      "id": "cr5",
      "difficulty": "Intermediate",
      "question": "How do you balance creativity with practicality?",
      "answer": "I try to produce ideas that are both interesting and realistic. Strong creativity is not only about being different. It is about creating something useful that fits the time and goal.",
      "example": "For an interview task, I may choose a simple but original answer structure that is clear and easy to deliver."
    },
    {
      "id": "cr7",
      "difficulty": "Intermediate",
      "question": "How do you present a highly unusual or strange creative solution to a traditional or conservative team?",
      "answer": "I start with the problem they care about. I explain how my unusual solution solves that problem better, show a quick mock-up, and present data or reference cases to build trust.",
      "example": "Showing how an interactive quiz increases user registration by 40% compared to a traditional static form."
    },
    {
      "id": "cr11",
      "difficulty": "Intermediate",
      "question": "How do you encourage quiet team members to share their creative ideas during brainstorming?",
      "answer": "I use structured brainstorming methods, like asking everyone to write down three ideas on sticky notes first, so quiet members don't have to compete with louder voices.",
      "example": "Using a digital whiteboard where everyone adds ideas anonymously, ensuring all suggestions are evaluated fairly."
    },
    {
      "id": "cr13",
      "difficulty": "Intermediate",
      "question": "How do you stay updated with design and technology trends without feeling overwhelmed?",
      "answer": "I subscribe to a few curated newsletters and spend 15 minutes each morning browsing articles. I focus on learning the core concepts of trends rather than trying to master every new library.",
      "example": "Reading a weekly web design digest to understand CSS features like Grid and container queries without immediately installing 10 new packages."
    },
    {
      "id": "cr3",
      "difficulty": "Intermediate",
      "question": "How do you stay creative when working under constraints?",
      "answer": "I focus on the goal, accept the limits, and think about what is still possible within them. Creativity often becomes stronger when we need to work with limited time, money, or resources.",
      "example": "If I cannot use expensive tools for a project, I look for simpler methods that still communicate the idea well."
    },
    {
      "id": "cr8",
      "difficulty": "Advanced",
      "question": "How do you turn a very limiting or strange project constraint into a creative opportunity?",
      "answer": "I treat limits as guidelines that narrow my focus. Constraints force me to think outside the box and find simple, elegant solutions that require fewer resources.",
      "example": "When told we can't use images to keep load times under 1 second, I use CSS gradients and typography to create a stunning, lightweight design."
    },
    {
      "id": "cr9",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where a client rejects a creative design that you spent weeks perfecting?",
      "answer": "I do not take it personally. I ask questions to understand their concerns, identify their preferences, and work on a revised design that blends my expertise with their feedback.",
      "example": "Creating three small, style variations of a rejected landing page to see which direction the client prefers before doing a full redesign."
    },
    {
      "id": "cr14",
      "difficulty": "Advanced",
      "question": "Describe a time you solved a technical bug using a highly creative, non-traditional method?",
      "answer": "I looked at the problem from a different angle. Instead of trying to fix a slow API response, I pre-fetched the data in the background before the user clicked, making the app feel instant.",
      "example": "Loading user profile details when they hover over the settings button, making the page transition feel immediate."
    },
    {
      "id": "cr15",
      "difficulty": "Advanced",
      "question": "How do you balance creative design choices with accessibility standards (like screen readers)?",
      "answer": "I treat accessibility as a design requirement, not an afterthought. I ensure colors have high contrast, layouts are keyboard-navigable, and HTML is semantic, proving that accessible design can still be beautiful.",
      "example": "Designing a dark mode that uses proper contrast ratios for text readability while maintaining a premium, modern aesthetic."
    }
  ],
  "qa": [
    {
      "id": "at1",
      "difficulty": "Basic",
      "question": "Why is attention to detail important in interviews and work?",
      "answer": "Attention to detail helps people produce accurate work, avoid careless mistakes, and show professionalism. Small details often affect the overall quality of a task or impression.",
      "example": "Checking spelling, dates, and formatting before submitting a CV or assignment shows attention to detail."
    },
    {
      "id": "at12",
      "difficulty": "Basic",
      "question": "Why is it important to follow naming conventions in coding and file organization?",
      "answer": "Naming conventions make the project readable and easy to navigate for the whole team. It reduces the time spent searching for files and prevents name conflicts.",
      "example": "Naming variables as `isUserLoggedIn` instead of `logged_in` or `status` to make their purpose clear immediately."
    },
    {
      "id": "at9",
      "difficulty": "Advanced",
      "question": "What is your process for checking code quality before submitting a pull request?",
      "answer": "I run tests, double-check that I removed all debugging console logs, review my own diff line-by-line, and verify that my changes don't create unexpected side-effects.",
      "example": "Reading my Git diff before committing to ensure no temporary config files or comments are included in the branch."
    },
    {
      "id": "at10",
      "difficulty": "Basic",
      "question": "How do you handle a situation where a teammate submits work with many small formatting and spelling mistakes?",
      "answer": "I help them by pointing out the errors constructively. I suggest using tools like linters or spelling checkers to automate formatting, making it easier for them to write clean code.",
      "example": "Helping a teammate set up Prettier in VS Code so their files are formatted automatically on save."
    },
    {
      "id": "at2",
      "difficulty": "Intermediate",
      "question": "How do you make sure your work is accurate before submission?",
      "answer": "I review it carefully, compare it against the requirements, and check for small errors that can reduce quality. Attention to detail often comes from consistent review habits.",
      "example": "Before submitting a report, I check whether I answered every required section and whether the references are complete."
    },
    {
      "id": "at3",
      "difficulty": "Intermediate",
      "question": "How can small mistakes create bigger problems?",
      "answer": "Small mistakes can reduce trust, cause confusion, or create extra work later. Paying attention to detail helps prevent avoidable issues from becoming larger ones.",
      "example": "Writing the wrong meeting time in a message can cause the whole team to be late."
    },
    {
      "id": "at4",
      "difficulty": "Intermediate",
      "question": "How do you handle tasks that require both speed and accuracy?",
      "answer": "I work efficiently but still leave time for a quick review before finalizing. The goal is to move fast without becoming careless.",
      "example": "If I am sending slides just before a deadline, I still take one final minute to verify names, numbers, and slide order."
    },
    {
      "id": "at5",
      "difficulty": "Intermediate",
      "question": "How does attention to detail improve teamwork?",
      "answer": "It helps the whole team avoid preventable errors and creates confidence in each person's work. When details are handled well, teamwork becomes smoother and more efficient.",
      "example": "If I double-check my numbers before sharing them with the team, others can build on my work with more confidence."
    },
    {
      "id": "at8",
      "difficulty": "Intermediate",
      "question": "How do you balance attention to detail with the need to deliver work on time, avoiding the weakness of over-perfectionism?",
      "answer": "I prioritize details that affect security, performance, and core user flows. I accept minor visual imperfections if they don't impact usability, and log them as low-priority tasks for later.",
      "example": "Ensuring the checkout form validates inputs correctly, while leaving a minor button alignment tweak for a future sprint."
    },
    {
      "id": "at13",
      "difficulty": "Intermediate",
      "question": "How do you handle a bug report that says \"the layout looks slightly broken on some screens\"?",
      "answer": "I ask for the exact screen size or device. I use browser tools to simulate various viewports, inspect the CSS, and verify if responsive rules are applied correctly.",
      "example": "Testing the page on a 320px width screen to find that a padding setting is causing horizontal scrolling."
    },
    {
      "id": "at6",
      "difficulty": "Intermediate",
      "question": "How do you maintain high attention to detail when you are feeling tired, burnt out, or doing a very repetitive task?",
      "answer": "I use checklists, take regular short breaks, and automate validation where possible. I also run checks in small batches to keep my focus sharp.",
      "example": "Creating a deploy checklist to ensure I don't forget to run migrations or update environment variables when tired."
    },
    {
      "id": "at11",
      "difficulty": "Intermediate",
      "question": "How do you ensure that all edge cases are covered when testing a new feature?",
      "answer": "I list all possible user inputs, including empty values, extremely long text, special characters, and negative numbers. I write tests for these inputs to ensure the system handles them without crashing.",
      "example": "Testing a user registration form by inputting special characters in the name field and checking if the server handles it safely."
    },
    {
      "id": "at7",
      "difficulty": "Advanced",
      "question": "Describe a time you noticed a tiny, strange detail that everyone else missed, which saved the project from failure?",
      "answer": "I reviewed the configuration files during a code review and noticed a small typo in a security setting that would have exposed user emails publicly.",
      "example": "Noticing a missing `NODE_ENV` check that was loading dev credentials in staging, and reporting it before launch."
    },
    {
      "id": "at14",
      "difficulty": "Advanced",
      "question": "How do you ensure database migrations don't cause data loss during a schema update?",
      "answer": "I write rollback scripts, run the migration on a local backup of the database first, verify the data integrity, and check that no fields are unexpectedly deleted.",
      "example": "Testing a SQL migration locally to confirm that changing a column type doesn't truncate long descriptions."
    },
    {
      "id": "at15",
      "difficulty": "Advanced",
      "question": "How do you verify that a third-party API is returning the exact data structure your app expects?",
      "answer": "I write schema validation tests (like Zod or JSON Schema) that check the types and structure of the API response, alerting us if the external API changes their format.",
      "example": "Creating an API client wrapper that logs an error if the user object returned by the server is missing the required email string."
    }
  ],
  "dba": [
    {
      "id": "ei1",
      "difficulty": "Basic",
      "question": "What is emotional intelligence?",
      "answer": "Emotional intelligence is the ability to understand and manage your own emotions while also recognizing and responding well to the emotions of others. It supports healthy communication and better teamwork.",
      "example": "If I notice a teammate is frustrated, I respond calmly and try to understand the issue instead of reacting emotionally."
    },
    {
      "id": "ei12",
      "difficulty": "Basic",
      "question": "Why is self-awareness important when working in a diverse team?",
      "answer": "Self-awareness helps me know my own triggers, biases, and communication habits. It lets me adjust my behavior so I don't offend others or react poorly during discussions.",
      "example": "Knowing I talk too fast when excited, so I make a conscious effort to slow down and let others speak during team discussions."
    },
    {
      "id": "ei3",
      "difficulty": "Intermediate",
      "question": "Why is empathy important in a team?",
      "answer": "Empathy helps people understand different perspectives and respond with more patience and support. It improves teamwork because people feel heard and respected.",
      "example": "If a teammate is struggling with workload, empathy helps me support them instead of judging them too quickly."
    },
    {
      "id": "ei6",
      "difficulty": "Intermediate",
      "question": "What is your typical emotional reaction to high stress or sudden criticism, and how do you regulate it?",
      "answer": "My first reaction is tension. I regulate it by taking a slow breath, pausing before replying, and separating my work from my self-worth so I can listen objectively.",
      "example": "Listening to a critical review of my slides, writing down notes, and thanking the reviewer instead of explaining why they are wrong."
    },
    {
      "id": "ei10",
      "difficulty": "Basic",
      "question": "How do you celebrate a teammate's success when you are feeling jealous or left out?",
      "answer": "I focus on their effort. I remind myself that their success helps the whole team, and I congratulate them sincerely, which helps me overcome my own negative feelings.",
      "example": "Writing a Slack post: \"Congratulations to Alice for getting her database optimization merged! It improved our page speed by 30%.\""
    },
    {
      "id": "ei2",
      "difficulty": "Intermediate",
      "question": "How do you manage your emotions during stressful situations?",
      "answer": "I pause, stay aware of what I am feeling, and focus on responding calmly instead of reacting impulsively. Managing emotions well helps me protect both the result and the relationship.",
      "example": "If I receive tough feedback, I take a moment to understand it before responding defensively."
    },
    {
      "id": "ei5",
      "difficulty": "Intermediate",
      "question": "How does emotional intelligence help during interviews?",
      "answer": "It helps candidates stay calm, listen well, respond thoughtfully, and build a positive connection with interviewers. Emotional control and awareness can strengthen even simple answers.",
      "example": "If an interviewer asks a difficult question, I stay composed and answer honestly instead of panicking."
    },
    {
      "id": "ei9",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where you feel completely overwhelmed and want to give up on a project?",
      "answer": "I pause, accept my feelings of overwhelm, and break the work into tiny actions. I talk to my manager or mentor to adjust expectations and ask for support if needed.",
      "example": "Taking a break to organize my tasks, then deciding to focus only on fixing one simple styling bug to get back on track."
    },
    {
      "id": "ei11",
      "difficulty": "Intermediate",
      "question": "How do you deliver constructive criticism to a teammate who takes feedback very personally?",
      "answer": "I focus on the work, not their personality. I ask them how they feel about their work first, point out what went well, and suggest one specific improvement we can work on.",
      "example": "Saying: \"Your research is excellent. Let's restructure the slides to make it easier to read. What template do you think works best?\""
    },
    {
      "id": "ei4",
      "difficulty": "Intermediate",
      "question": "How do you respond when someone is upset with you?",
      "answer": "I listen without interrupting, try to understand their concern, and respond respectfully. Emotional intelligence helps me avoid escalating the situation and focus on resolution.",
      "example": "If a teammate is frustrated because of a misunderstanding, I listen first and then clarify calmly."
    },
    {
      "id": "ei13",
      "difficulty": "Intermediate",
      "question": "How do you rebuild your energy and motivation after a project failure or a rejected proposal?",
      "answer": "I let myself feel the disappointment, then reflect on the lessons learned. I focus on what I can control in the next project rather than dwelling on the past.",
      "example": "Reviewing why our hackathon project wasn't selected, listing the feedback, and applying it to my next class assignment."
    },
    {
      "id": "ei7",
      "difficulty": "Advanced",
      "question": "How do you interact with a teammate who is behaving in a highly emotional, volatile, or stressed manner?",
      "answer": "I stay calm and quiet. I do not match their emotion. I offer a listening ear, show empathy for their stress, and wait until they are calm to discuss project details.",
      "example": "Saying to a teammate who is venting: \"I see this deployment is really stressful. Let me handle the staging updates so you can focus on the core bug.\""
    },
    {
      "id": "ei8",
      "difficulty": "Advanced",
      "question": "How do you show empathy to a client or stakeholder whose technical demands seem completely irrational or strange to you?",
      "answer": "I look for the emotion behind their demands, like fear of budget loss or pressure from their bosses. I acknowledge their concern first, then explain the technical limitations with patience.",
      "example": "Saying: \"I understand that having this feature ready by Friday is critical for your board meeting. Let's build a prototype for the demo first.\""
    },
    {
      "id": "ei14",
      "difficulty": "Advanced",
      "question": "How do you handle a teammate who is constantly complaining about the project and bringing down team morale?",
      "answer": "I listen to their concerns, but steer the conversation towards solutions. I ask: \"What is one small change we can make to fix this problem?\" to stop the complaints.",
      "example": "When a classmate complains about a long assignment, I say: \"It is a lot of work. Let's divide the sections so we can finish it faster.\""
    },
    {
      "id": "ei15",
      "difficulty": "Advanced",
      "question": "How do you manage your emotions when you have to make a difficult decision that will disappoint your team?",
      "answer": "I acknowledge the difficulty of the decision and explain the \"why\" behind it honestly. I show empathy for their disappointment and focus on how we can manage the transition together.",
      "example": "Deciding to postpone a popular feature release to ensure system security, and explaining the risks of launching it early."
    }
  ],
  "project_management": [
    {
      "id": "pm1",
      "difficulty": "Basic",
      "question": "What is project management in simple terms?",
      "answer": "Project management is the process of planning, organizing, and guiding work so a goal is completed on time and with good quality. For students, it often means managing tasks, people, and deadlines in a structured way.",
      "example": "A class group project needs project management so the research, slides, and presentation are all completed before the deadline."
    },
    {
      "id": "pm2",
      "difficulty": "Basic",
      "question": "Why is planning important before starting a project?",
      "answer": "Planning helps define the goal, divide the work, estimate time, and reduce confusion later. Without planning, teams are more likely to miss deadlines or duplicate effort.",
      "example": "Before starting a final-year assignment, a team should decide roles, milestones, and submission dates."
    },
    {
      "id": "pm12",
      "difficulty": "Basic",
      "question": "Why is it important to track project progress in writing rather than relying on memory or verbal updates?",
      "answer": "Written tracking creates a clear record of agreements, shows the real project status, and prevents misunderstandings about deadlines and responsibilities.",
      "example": "Writing a short summary of action items in Slack after a team meeting, tagging who is doing what and by when."
    },
    {
      "id": "pm7",
      "difficulty": "Advanced",
      "question": "What is your approach when a critical project is stalled due to a highly unusual or unexpected bottleneck?",
      "answer": "I gather the key people, identify the root cause of the bottleneck, re-allocate resources to clear it, and notify stakeholders of the temporary impact on the timeline.",
      "example": "When our database server crashed during migration, I paused frontend work and had the whole team assist the database lead in data recovery."
    },
    {
      "id": "pm10",
      "difficulty": "Basic",
      "question": "How do you keep project files, designs, and code organized so the team doesn't waste time searching for them?",
      "answer": "I establish a simple folder structure and naming convention on day one. I make sure all shared documents are linked in a central project page.",
      "example": "Setting up a readme file in the repo that links to the design assets, API documentation, and staging website."
    },
    {
      "id": "pm5",
      "difficulty": "Intermediate",
      "question": "How do you keep a project organized from start to finish?",
      "answer": "I break the project into stages, track deadlines, and review progress regularly so the team stays aligned. Organization is one of the main strengths of good project management.",
      "example": "A group can use a shared checklist or timeline to track research, editing, and rehearsal before a final presentation."
    },
    {
      "id": "pm9",
      "difficulty": "Intermediate",
      "question": "How do you manage project risks (like a team member getting sick) before they happen?",
      "answer": "I create a risk register. I identify potential problems, cross-train team members on critical tasks, and add time buffers to the project schedule.",
      "example": "Ensuring two people have access to the hosting keys and database backup credentials, so the launch isn't blocked if one person is offline."
    },
    {
      "id": "pm11",
      "difficulty": "Intermediate",
      "question": "How do you handle a situation where a developer tells you their task is \"90% done\" for three days in a row?",
      "answer": "I ask them to show me what is working and what is blocking the remaining 10%. I help them break down the remaining work to find the hidden issue.",
      "example": "Finding that the developer finished the code but is stuck on getting the styling right, so I assign a designer to help them."
    },
    {
      "id": "pm3",
      "difficulty": "Intermediate",
      "question": "How do you manage a project when multiple people are involved?",
      "answer": "I make sure roles are clear, deadlines are known, and communication happens regularly. Good project management keeps everyone aligned and helps the group notice problems early.",
      "example": "In a student project, one person can track progress while others focus on research, writing, and presentation."
    },
    {
      "id": "pm6",
      "difficulty": "Intermediate",
      "question": "How do you manage a project when the scope is extremely vague, strange, or constantly changing?",
      "answer": "I use agile methods. I plan work in short cycles (sprints), deliver small working features frequently, and hold regular review sessions with the client to adjust the roadmap.",
      "example": "Delivering a basic login page in week 1, a profile page in week 2, and adjusting the design based on weekly client feedback."
    },
    {
      "id": "pm13",
      "difficulty": "Intermediate",
      "question": "How do you decide when to buy a third-party tool vs. build a custom solution for your project?",
      "answer": "I compare the cost, development time, maintenance effort, and project needs. If a standard tool exists and fits the budget, I buy/use it to save time for building our core features.",
      "example": "Using Firebase Authentication instead of spending three weeks writing a custom user auth and password reset system."
    },
    {
      "id": "pm8",
      "difficulty": "Advanced",
      "question": "How do you conduct a post-mortem review after a project has failed due to team weaknesses?",
      "answer": "I focus on the system, not individuals. We list what went well, what went wrong, and write down specific, actionable process changes to prevent the failure in the next project.",
      "example": "Creating a shared document listing all migration errors and adding a new mandatory staging test step to our deployment checklist."
    },
    {
      "id": "pm14",
      "difficulty": "Advanced",
      "question": "How do you manage project dependencies (tasks that depend on other tasks being finished first)?",
      "answer": "I map out the tasks using a flowchart or gantt chart. I identify the \"critical path\"—the sequence of tasks that determines the project length—and monitor those tasks closely.",
      "example": "Monitoring the database schema design closely, because the API developers cannot start writing endpoints until the schema is ready."
    },
    {
      "id": "pm15",
      "difficulty": "Advanced",
      "question": "How do you manage a project when the team has to use a new, unstable technology that none of them have used before?",
      "answer": "I plan a \"spike\" (a short research phase) to build a prototype first. I add a larger time buffer to tasks, document all quirks, and prepare fallback options in case the technology fails.",
      "example": "Spending the first three days building a simple login form with the new library to test its stability before planning the full layout."
    },
    {
      "id": "pm4",
      "difficulty": "Intermediate",
      "question": "What do you do if a project starts falling behind schedule?",
      "answer": "I review what is causing the delay, re-prioritize the most important tasks, and communicate with the team quickly. Good project management means adjusting the plan before the delay becomes worse.",
      "example": "If slide design is taking too long, I may simplify the design so the team can still meet the presentation deadline."
    }
  ],
  "task_management": [
    {
      "id": "tkm2",
      "difficulty": "Intermediate",
      "question": "What is your main weakness in task management, and how are you addressing it?",
      "answer": "My weakness is sometimes spending too much time planning the tasks instead of executing them. I manage this by setting a strict 10-minute limit for my morning planning session and immediately jumping into the highest priority task.",
      "example": "Instead of detailing a 2-week plan down to the hour, I map the daily goals and spend the remaining time writing code."
    },
    {
      "id": "tkm8",
      "difficulty": "Basic",
      "question": "How do you handle a highly repetitive, boring task that is critical for the project but takes up a lot of time?",
      "answer": "I block out a specific quiet hour to focus entirely on it. If possible, I look for ways to write a script or use tools to automate portions of the task, turning it into a learning experience.",
      "example": "Writing a Python script to extract and format 200 CSV files instead of copy-pasting the data manually into the database."
    },
    {
      "id": "tkm4",
      "difficulty": "Basic",
      "question": "How do you prioritize your daily tasks when everything feels urgent?",
      "answer": "I use the Eisenhower Matrix to separate what is truly important from what is merely urgent. I also check with my team lead to understand which task has the largest downstream impact on others.",
      "example": "Choosing to fix a blocking authentication bug over replying to routine team emails, even if the email notifications are piling up."
    },
    {
      "id": "tkm1",
      "difficulty": "Intermediate",
      "question": "How do you organize your tasks when you have multiple projects with overlapping deadlines?",
      "answer": "I list all tasks in a central planner, estimate the time required for each, and sequence them based on dependencies. I focus on finishing one task at a time rather than multitasking, which increases error rates.",
      "example": "Using a Kanban board to track steps for a database design and a client presentation simultaneously, updating progress daily."
    },
    {
      "id": "tkm6",
      "difficulty": "Intermediate",
      "question": "How do you track and verify that all tasks in a project are actually finished to a high standard?",
      "answer": "I define clear Acceptance Criteria for each task before starting. I use a checklist to verify each requirement, run local tests, and ensure code style and documentation match team guidelines.",
      "example": "Creating a checklist of validation rules, error handling, and performance metrics before marking a registration form as complete."
    },
    {
      "id": "tkm7",
      "difficulty": "Intermediate",
      "question": "How do you manage your workload when team members keep adding minor tasks to your plate throughout the day?",
      "answer": "I acknowledge the requests but request that they be logged in our tracking system. I evaluate if they are quick fixes or if they need to be scheduled for the next sprint, preventing ad-hoc distractions from derailing my core work.",
      "example": "Asking a teammate to file a ticket for a CSS tweak so I can address it during my designated cleanup hour instead of stopping my active debugging."
    },
    {
      "id": "tkm3",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where you are assigned a task but given no tools, templates, or instructions on how to complete it?",
      "answer": "I research industry standards or similar historical tasks in our repository to find a reference pattern. I build a rough draft using standard formats and present it early to get feedback on whether the direction is correct.",
      "example": "When asked to write a user documentation manual from scratch, I looked up standard Markdown templates online, wrote the first chapter, and asked my lead for feedback."
    },
    {
      "id": "tkm9",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where a client demands a task be done in a highly non-standard, inefficient way?",
      "answer": "I seek to understand their underlying goal. I explain the performance, maintenance, and security trade-offs of their proposed method and present a standard, efficient alternative that achieves the exact same goal.",
      "example": "When a client asked to store passwords in a custom plain-text text file, I explained the security risks and implemented a standard hashed database solution instead."
    },
    {
      "id": "tkm10",
      "difficulty": "Advanced",
      "question": "How do you ensure that knowledge is shared so that a project doesn't fail if you are suddenly unavailable?",
      "answer": "I write clear, up-to-date documentation for all setup steps, architectural decisions, and APIs. I share updates in team channels and cross-train team members on key parts of the system.",
      "example": "Writing a detailed README.md with configuration commands and recording a 5-minute video walkthrough of the backend routing logic."
    },
    {
      "id": "tkm5",
      "difficulty": "Basic",
      "question": "What do you do when you realize you cannot complete a promised task on time?",
      "answer": "I notify my team or client immediately, explain the technical reasons for the delay, and propose a new, realistic completion time along with our current progress.",
      "example": "Alerting the group at noon that the API integration is hitting unexpected rate limits, and asking to push the review from 3 PM to 5 PM."
    }
  ],
  "presentation": [
    {
      "id": "pr1",
      "difficulty": "Basic",
      "question": "How do you prepare for a presentation to ensure you deliver the message clearly?",
      "answer": "I structure the talk with a clear introduction, 3 main points, and a summary. I practice multiple times, focus on keeping my slides simple, and ensure the content directly addresses the audience's interests.",
      "example": "Rehearsing my project demo out loud to check if the transitions between slides feel natural and fit within the 10-minute limit."
    },
    {
      "id": "pr4",
      "difficulty": "Intermediate",
      "question": "How do you structure a presentation when speaking to non-technical stakeholders vs. senior developers?",
      "answer": "For non-technical stakeholders, I focus on the business value, user impact, and overall outcomes using simple language. For developers, I focus on the system architecture, code choices, and performance metrics.",
      "example": "Showing a stakeholder how the new form reduces checkout drop-offs by 20%, while showing developers the React components and database schema."
    },
    {
      "id": "pr7",
      "difficulty": "Basic",
      "question": "How do you design presentation slides that look clean, premium, and professional?",
      "answer": "I use a simple grid layout, limit each slide to a single key message, keep text minimal (bullet points only), use high-contrast text, and select a consistent, harmonious color palette.",
      "example": "Creating slides with a dark blue background, white text, and a single large diagram per page instead of cluttered blocks of text."
    },
    {
      "id": "pr6",
      "difficulty": "Basic",
      "question": "How do you keep your audience engaged during a long or potentially dry technical presentation?",
      "answer": "I use visual diagrams instead of walls of text, share real-world stories or use cases, and ask interactive questions to keep the audience involved.",
      "example": "Using a flow diagram to show how data travels through our app instead of listing 10 bullet points explaining the API endpoints."
    },
    {
      "id": "pr2",
      "difficulty": "Intermediate",
      "question": "What is your main weakness when presenting, and how are you working to overcome it?",
      "answer": "My weakness is speaking too quickly when I get nervous or excited. I manage this by placing reminder marks in my presentation notes to pause, take a breath, and consciously speak at a slower, steadier pace.",
      "example": "Writing \"[PAUSE & BREATHE]\" at the top of each slide note to prompt myself to slow down during a project demo."
    },
    {
      "id": "pr5",
      "difficulty": "Intermediate",
      "question": "How do you handle a difficult, unexpected question from the audience that you don't know the answer to?",
      "answer": "I acknowledge the question as interesting, state honestly that I do not have the exact data at hand, and commit to researching and following up with them after the session.",
      "example": "Saying: \"That is a great point regarding memory scale. I don't have the exact benchmark figures for 10k users on me, but I will check the logs and email you today.\""
    },
    {
      "id": "pr10",
      "difficulty": "Intermediate",
      "question": "How do you handle presenting to an audience that shows absolutely no reaction, questions, or engagement?",
      "answer": "I maintain my energy and professional tone, stick to my prepared flow, and try asking direct, open-ended questions. I don't let their quietness make me nervous, as they might just be listening intently.",
      "example": "Asking the client team: \"Which of these three features do you see your team using most often?\" to prompt some initial feedback."
    },
    {
      "id": "pr8",
      "difficulty": "Advanced",
      "question": "How do you handle an audience member who constantly interrupts your presentation with criticisms or side comments?",
      "answer": "I listen politely, acknowledge their point briefly to make them feel heard, and suggest we discuss it in detail during the Q&A or offline so we can stay on schedule.",
      "example": "Saying: \"Thank you for that feedback on the library choice. Let's park that topic for the discussion session at the end so we can cover the rest of the demo.\""
    },
    {
      "id": "pr9",
      "difficulty": "Advanced",
      "question": "What do you do if you are asked to give a presentation on a project that you did not work on and know very little about?",
      "answer": "I meet with the core team to understand the main goals, technical choices, and outcomes. I structure the presentation to cover these high-level points and arrange for a team member to be present to answer deep technical questions.",
      "example": "Briefing myself on a teammate's database project by reading their readme, drafting a 5-slide summary, and asking them to join the Zoom call for support."
    },
    {
      "id": "pr3",
      "difficulty": "Advanced",
      "question": "How do you handle a situation where a technical demo fails completely in the middle of a live presentation?",
      "answer": "I stay calm, acknowledge the error with humor or professionalism, and transition to a backup plan, such as showing pre-recorded video clips or screenshots of the working system.",
      "example": "When the live API connection failed, I explained that it was a connection issue, opened a folder of pre-saved dashboard screenshots, and continued the presentation smoothly."
    }
  ],
  "hr_interview": [
    {
      "id": "hr1",
      "difficulty": "Basic",
      "question": "Tell me about yourself.",
      "answer": "I give a short summary of my background, current studies, key strengths, and the kind of opportunity I am looking for. A strong answer is clear, relevant, and focused on why my background fits the role instead of listing my entire life story.",
      "example": "I am a final-year IT student with strong interest in web development and teamwork. Through class projects and self-study, I have built practical skills in problem solving, communication, and presenting ideas clearly."
    },
    {
      "id": "hr23",
      "difficulty": "Basic",
      "question": "What do you know about our company?",
      "answer": "I should show that I researched the company's background, services, values, and reputation before the interview. A strong answer proves genuine interest and preparation rather than giving a vague compliment.",
      "example": "From my research, I understand that your company focuses on delivering practical digital solutions, values teamwork and professionalism, and is known for giving young talent opportunities to grow."
    },
    {
      "id": "hr24",
      "difficulty": "Intermediate",
      "question": "Which part of our company profile or mission stands out to you most, and why?",
      "answer": "I choose one specific part of the company's mission, culture, or service and connect it to my own values or career goals. This makes the answer personal and believable instead of sounding copied from the website.",
      "example": "What stands out most to me is your focus on learning and continuous improvement, because I want to join an environment where junior team members are encouraged to grow through real work and feedback."
    },
    {
      "id": "hr3",
      "difficulty": "Basic",
      "question": "Why do you want to join this company or internship program?",
      "answer": "I explain what attracts me about the company, the learning opportunity, and how it matches my goals. A good answer shows that I researched the organization and that I am interested for meaningful reasons, not only because I need any job.",
      "example": "I want to join your internship program because your team works on real products, and I believe that environment will help me grow my technical and professional skills while contributing positively to the team."
    },
    {
      "id": "hr2",
      "difficulty": "Intermediate",
      "question": "Why should we hire you?",
      "answer": "I connect my strengths to the role by showing that I can learn quickly, work well with others, and take responsibility for results. The best answer is confident but honest, focusing on what value I can bring as a student or junior candidate.",
      "example": "You should hire me because I am motivated to learn, I communicate well in a team, and I take ownership of my work. Even when I do not know something yet, I learn fast and stay committed until the task is completed well."
    },
    {
      "id": "hr4",
      "difficulty": "Intermediate",
      "question": "What are your strengths and weaknesses?",
      "answer": "I mention real strengths that fit the role and describe one honest weakness together with the steps I am taking to improve it. A strong answer shows self-awareness, maturity, and growth rather than pretending to be perfect.",
      "example": "One of my strengths is staying organized under pressure, especially in team assignments. One weakness is that I can be too quiet at the start of a new group, so I push myself to speak up earlier and contribute ideas more actively."
    },
    {
      "id": "hr8",
      "difficulty": "Intermediate",
      "question": "What is your biggest achievement so far?",
      "answer": "I choose an achievement that shows effort, growth, and relevant skills rather than just the result. A strong answer explains the situation, what I did, and what I learned from it.",
      "example": "My biggest achievement was leading a university team project from planning to final presentation and helping the group finish on time with a strong result."
    },
    {
      "id": "hr10",
      "difficulty": "Basic",
      "question": "Do you prefer working alone or in a team?",
      "answer": "The best answer is balanced: I can work independently when needed, but I also value teamwork because many strong results come from collaboration. This shows flexibility rather than an extreme preference.",
      "example": "I am comfortable working alone on focused tasks, but I also enjoy teamwork because it allows people to share ideas, support each other, and produce stronger results."
    },
    {
      "id": "hr9",
      "difficulty": "Intermediate",
      "question": "How do you handle stress or pressure?",
      "answer": "I explain that I stay calm by prioritizing tasks, breaking work into smaller steps, and communicating early if something becomes risky. Interviewers want to hear that I can stay effective under pressure, not that I never feel stress.",
      "example": "When several deadlines happen in the same week, I make a schedule, handle the most urgent work first, and avoid waiting until the last moment."
    },
    {
      "id": "hr5",
      "difficulty": "Intermediate",
      "question": "Where do you see yourself in the next three to five years?",
      "answer": "I describe a realistic goal that shows growth, commitment, and willingness to keep learning. The answer should balance ambition with humility and connect my future plans to the field I am applying for.",
      "example": "In the next three to five years, I hope to become a reliable professional in my field, with stronger technical skills, more real project experience, and the ability to take on bigger responsibilities in a team."
    },
    {
      "id": "hr25",
      "difficulty": "Intermediate",
      "question": "How would you represent our company well if you joined us?",
      "answer": "I would represent the company through professionalism, reliability, respectful communication, and a willingness to learn. A strong answer shows that I understand I would be reflecting the company's standards in how I work with clients, teammates, and the public.",
      "example": "If I joined the company, I would try to represent it well by being dependable, speaking respectfully to clients, protecting the company's reputation, and consistently doing quality work."
    },
    {
      "id": "hr6",
      "difficulty": "Intermediate",
      "question": "What is your salary expectation?",
      "answer": "I answer professionally by showing flexibility, awareness of the role level, and interest in the overall opportunity, not only the number. If I am a student or junior candidate, it is usually best to give a reasonable range and mention that I am open to discussion based on responsibilities and growth opportunities.",
      "example": "Based on my current level and the responsibilities of the role, I am looking for a fair entry-level salary range, but I am open to discussion depending on the full package and learning opportunity."
    },
    {
      "id": "hr7",
      "difficulty": "Basic",
      "question": "When can you start?",
      "answer": "I should answer clearly and honestly based on my actual availability. A good answer shows that I respect both my current commitments and the employer's planning needs.",
      "example": "I can start immediately after my final exams next month, or earlier on a part-time basis if needed."
    },
    {
      "id": "hr11",
      "difficulty": "Intermediate",
      "question": "Why are you leaving your current internship, part-time role, or student project responsibility?",
      "answer": "I keep the answer positive and forward-looking. I focus on growth, learning, and the new opportunity rather than criticizing past people or experiences.",
      "example": "I appreciated my previous experience, but I am now looking for a role where I can take on more responsibility, grow faster, and apply my skills in a larger environment."
    },
    {
      "id": "hr13",
      "difficulty": "Intermediate",
      "question": "What would you do if you were given a task with a very short deadline and you were not sure how to complete it?",
      "answer": "I would first clarify the expected outcome, then break the task into smaller steps and start with the most important part. If I still had a blocker, I would ask for guidance early rather than waiting too long and risking missing the deadline.",
      "example": "If I were asked to prepare a report by the end of the day, I would confirm the format, gather the most critical information first, and update my supervisor quickly if I needed support."
    },
    {
      "id": "hr15",
      "difficulty": "Intermediate",
      "question": "What would you do if you made a mistake that affected a customer, teacher, or manager?",
      "answer": "I would admit the mistake quickly, explain the situation honestly, and focus on correcting it as fast as possible. A strong response shows accountability, calm communication, and a clear plan to avoid repeating the same mistake.",
      "example": "If I sent the wrong version of a document, I would apologize, send the corrected file immediately, and double-check future submissions more carefully."
    },
    {
      "id": "hr14",
      "difficulty": "Intermediate",
      "question": "How would you handle a situation where a teammate was not doing their part in a group assignment or workplace task?",
      "answer": "I would speak to the teammate respectfully first and try to understand whether they were confused, overloaded, or facing another issue. If the problem continued, I would raise it professionally with the team lead or lecturer and focus on finding a fair solution instead of creating conflict.",
      "example": "If a teammate missed two deadlines, I would check in privately, offer help where possible, and then update the group if the delay started affecting the final result."
    },
    {
      "id": "hr17",
      "difficulty": "Advanced",
      "question": "What would you do if you had to choose between finishing your own task and helping a teammate who was struggling before an important deadline?",
      "answer": "I would quickly assess both priorities and look for a balanced way to protect the overall team result. If my own task was under control, I would help the teammate; if both tasks were at risk, I would communicate early and help the team decide the best priority together.",
      "example": "If I had already finished most of my slides, I would spend some time helping my teammate prepare their part so the whole presentation would be stronger."
    },
    {
      "id": "hr16",
      "difficulty": "Advanced",
      "question": "How would you respond if your manager gave you feedback that felt unfair or too harsh?",
      "answer": "I would stay professional, listen carefully, and avoid reacting emotionally in the moment. Then I would ask respectful follow-up questions to understand the feedback better and decide what I could improve, even if I did not fully agree with every point.",
      "example": "If a manager said my communication was weak, I would ask for a specific example so I could understand the gap and work on improving it."
    },
    {
      "id": "hr18",
      "difficulty": "Advanced",
      "question": "What would you do if you disagreed with your manager's decision but were still expected to follow it?",
      "answer": "I would respectfully share my concern with clear reasons and, if helpful, offer an alternative. If the final decision stayed the same, I would support it professionally and do my best to execute it well unless it involved something unethical or unsafe.",
      "example": "If I believed a deadline was unrealistic, I would explain the risk, suggest a phased plan, and then work with the final direction once the decision was made."
    },
    {
      "id": "hr19",
      "difficulty": "Advanced",
      "question": "How would you handle a situation where you were blamed for a mistake that was not fully your fault?",
      "answer": "I would stay calm, avoid reacting defensively, and focus on clarifying the facts professionally. A strong response protects relationships while still taking ownership for my part and helping the team move toward a solution.",
      "example": "If a project issue came from both unclear instructions and my own assumption, I would explain my part honestly, clarify what happened, and suggest how to avoid the same confusion next time."
    },
    {
      "id": "hr22",
      "difficulty": "Advanced",
      "question": "What would you do if you were asked to do something outside your job scope just before the end of the day?",
      "answer": "I would first understand the urgency and impact of the request, then assess my current priorities. If the task was important, I would help where possible or negotiate a practical plan, instead of saying yes blindly or refusing without discussion.",
      "example": "If I was about to leave but was asked to support an urgent client issue, I would check the deadline, update my manager, and help with the most critical part if it was truly time-sensitive."
    },
    {
      "id": "hr21",
      "difficulty": "Advanced",
      "question": "How would you respond if an interviewer challenged your answer and made you feel uncomfortable on purpose?",
      "answer": "I would stay composed, listen carefully, and respond with professionalism rather than emotion. Sometimes interviewers test how candidates handle pressure, so the goal is to show maturity, self-control, and confidence under stress.",
      "example": "If an interviewer said my answer sounded weak, I would thank them for the challenge, clarify my point more strongly, and support it with a real example."
    },
    {
      "id": "hr20",
      "difficulty": "Advanced",
      "question": "What would you do if you noticed a coworker acting unethically but they were a close friend?",
      "answer": "I would not ignore it just because of the friendship. I would address it seriously and professionally, first by encouraging them to correct the issue if appropriate, and if necessary I would escalate it through the right channel because integrity matters more than personal comfort.",
      "example": "If a friend copied someone else's work into a client document, I would tell them it needed to be corrected immediately and, if they refused, I would report it through the proper process."
    },
    {
      "id": "hr12",
      "difficulty": "Basic",
      "question": "Do you have any questions for us?",
      "answer": "I should always ask thoughtful questions because it shows interest, preparation, and professionalism. Good questions usually focus on the role, team, training, expectations, or growth opportunities.",
      "example": "I would ask what success looks like in the first three months, what kind of training is available for junior team members, and how the team usually works together."
    }
  ]
};

const QuestionAccordion = ({ question, answer, example, difficulty }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Basic': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Advanced': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl mb-3 bg-white dark:bg-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40 flex justify-between items-start gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] sm:text-base">{question}</h3>
        </div>
        <div className="mt-1 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-full text-slate-500 dark:text-slate-400">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 animate-in slide-in-from-top-2 duration-200">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Trainer's Ideal Answer</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
          {example && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Practical Example / Analogy</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">{example}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  
  const [sessions, setSessions] = useLocalStorage('interview_sessions_v2', [
    { id: 'session_1', name: 'Alice Johnson', date: new Date().toISOString(), scores: {}, notes: {} }
  ]);
  const [activeSessionId, setActiveSessionId] = useLocalStorage('active_session_id_v2', 'session_1');
  const [isDarkMode, setIsDarkMode] = useLocalStorage('interview_theme_v2', false);

  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) || sessions[0] || { id: 'temp', name: 'Anonymous', date: new Date().toISOString(), scores: {}, notes: {} };
  }, [sessions, activeSessionId]);

  const scores = activeSession.scores || {};
  const notes = activeSession.notes || {};

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { totalScore, maxPossible, avgScore, skillLevel, completedCategories } = useMemo(() => {
    const scorableCategories = CATEGORIES.filter(c => c.id !== 'dashboard');
    let total = 0;
    let completed = 0;
    
    scorableCategories.forEach(cat => {
      if (scores[cat.id]) {
        total += scores[cat.id];
        completed++;
      }
    });

    const max = scorableCategories.length * 5;
    const avg = completed > 0 ? (total / completed).toFixed(1) : '0.0';
    
    let level = "Beginner";
    const numAvg = parseFloat(avg);
    if (numAvg >= 4.5) level = "Advanced Plus";
    else if (numAvg >= 3.8) level = "Advanced";
    else if (numAvg >= 2.8) level = "Intermediate";
    else if (numAvg >= 1.8) level = "Basic";
    
    if (completed === 0) level = "Not Evaluated";

    return { totalScore: total, maxPossible: max, avgScore: avg, skillLevel: level, completedCategories: completed };
  }, [scores]);

  const updateActiveSession = (updates) => {
    setSessions(prev => prev.map(s => s.id === activeSession.id ? { ...s, ...updates } : s));
  };

  const handleScoreChange = (score) => {
    updateActiveSession({ scores: { ...scores, [activeTab]: score } });
  };

  const handleNoteChange = (e) => {
    updateActiveSession({ notes: { ...notes, [activeTab]: e.target.value } });
  };

  const addNewCandidate = () => {
    const newId = 'session_' + Date.now();
    const newSession = { 
      id: newId, 
      name: `Candidate ${sessions.length + 1}`, 
      date: new Date().toISOString(), 
      scores: {}, 
      notes: {} 
    };
    setSessions([...sessions, newSession]);
    setActiveSessionId(newId);
    setActiveTab('dashboard');
  };

  const deleteCandidate = (id) => {
    const newSessions = sessions.filter(s => s.id !== id);
    if (newSessions.length === 0) {
      const fallbackId = 'session_fallback';
      const fallbackSession = { id: fallbackId, name: 'Candidate 1', date: new Date().toISOString(), scores: {}, notes: {} };
      setSessions([fallbackSession]);
      setActiveSessionId(fallbackId);
    } else {
      setSessions(newSessions);
      if (activeSessionId === id) {
        setActiveSessionId(newSessions[0].id);
      }
    }
    setCandidateToDelete(null);
  };

  const updateCandidateName = (id, newName) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  const resetCurrentCandidate = () => {
    updateActiveSession({ scores: {}, notes: {} });
  };

  const exportReport = () => {
    let report = `TECHNICAL MOCK INTERVIEW ASSESSMENT REPORT\n`;
    report += `=====================================================\n`;
    report += `Candidate: ${activeSession.name.toUpperCase()}\n`;
    report += `Date of Assessment: ${new Date(activeSession.date).toLocaleDateString()} ${new Date(activeSession.date).toLocaleTimeString()}\n`;
    report += `=====================================================\n\n`;
    
    report += `SUMMARY CRITERIA:\n`;
    report += `-----------------------------------------------------\n`;
    report += `Total Evaluated Score  : ${totalScore} / ${maxPossible}\n`;
    report += `Average Score          : ${avgScore} / 5.0\n`;
    report += `Assessed Skill Level   : ${skillLevel.toUpperCase()}\n`;
    report += `Completed Categories   : ${completedCategories} / ${CATEGORIES.length - 1}\n\n`;
    
    report += `DETAILED CATEGORY BREAKDOWN:\n`;
    report += `-----------------------------------------------------\n`;

    CATEGORIES.filter(c => c.id !== 'dashboard').forEach(cat => {
      const score = scores[cat.id] || 'Pending Evaluation';
      const note = notes[cat.id] || 'No supplemental evaluation notes logged.';
      report += `• [ ${cat.name.toUpperCase()} ]\n`;
      report += `  Score Assessed: ${score}/5\n`;
      report += `  Trainer Notes : ${note}\n`;
      report += `-----------------------------------------------------\n`;
    });

    report += `\nReport generated by TechTrainer Assistant Platform.\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Interview_Report_${activeSession.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentQuestions = QUESTION_BANK[activeTab] || [];
  const filteredQuestions = currentQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const activeCategoryData = CATEGORIES.find(c => c.id === activeTab);
  const isDashboard = activeTab === 'dashboard';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col md:flex-row relative">
      
      {/* Delete Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Candidate Session?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              This will permanently delete the active scores and records of this candidate. This action is irreversible.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setCandidateToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteCandidate(candidateToDelete)}
                className="px-4 py-2 text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2 font-bold text-teal-400">
          <BrainCircuit className="w-6 h-6 animate-pulse" /> 
          <span className="tracking-wide">PNCInterview រៀនសម្ភាស</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 rounded-lg text-slate-200 hover:text-white">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Left Sidebar Layout */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-72 bg-slate-900 text-slate-100 flex flex-col z-40 transition-transform duration-300 ease-in-out`}>
        <div className="p-6 hidden md:flex items-center gap-3 font-extrabold text-xl text-teal-400 border-b border-slate-800">
          <BrainCircuit className="w-8 h-8" />
          <span className="tracking-tight">PNCInterview រៀនសម្ភាស</span>
        </div>

        {/* Dynamic Candidate Selector Widget */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Quick Session Switch</label>
          <div className="relative">
            <select
              value={activeSessionId}
              onChange={(e) => {
                setActiveSessionId(e.target.value);
                setActiveTab('dashboard');
              }}
              className="w-full appearance-none bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium truncate"
            >
              {sessions.map(s => (
                <option key={s.id} value={s.id}>{s.name || 'Unnamed Candidate'}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button 
            onClick={addNewCandidate}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-teal-950 text-teal-400 hover:bg-teal-900 rounded-lg text-xs font-semibold tracking-wide transition-all border border-teal-900/40"
          >
            <UserPlus className="w-4 h-4" /> Add New Candidate
          </button>
        </div>
        
        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto py-3">
          <nav className="px-3 space-y-1">
            {CATEGORIES.map((category) => {
              const isSelected = activeTab === category.id;
              const hasScore = scores[category.id] !== undefined;
              
              return (
                <button
                  key={category.id}
                  onClick={() => { setActiveTab(category.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isSelected 
                      ? 'bg-slate-800 text-teal-400 shadow-inner' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={isSelected ? 'text-teal-400' : 'text-slate-500'}>
                      {category.icon}
                    </div>
                    <span className="truncate">{category.name}</span>
                  </div>
                  {hasScore && category.id !== 'dashboard' && (
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] text-slate-900 font-bold">
                      {scores[category.id]}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Theme Settings at bottom */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all"
          >
            {isDarkMode ? <><Sun className="w-4 h-4 text-amber-400" /> Light Theme</> : <><Moon className="w-4 h-4 text-indigo-400" /> Dark Theme</>}
          </button>
        </div>
      </div>

      {/* Main Panel Frame */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Candidate Name Input Widget - Editable Header */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1.5">Candidate Under Assessment (Click text to rename)</label>
                <div className="flex items-center gap-2 group">
                  <Edit3 className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors shrink-0" />
                  <input
                    type="text"
                    value={activeSession.name}
                    onChange={(e) => updateCandidateName(activeSession.id, e.target.value)}
                    className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white bg-transparent border-b-2 border-dashed border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-teal-500 focus:outline-none w-full py-0.5 transition-all"
                    placeholder="Enter Candidate Name"
                  />
                </div>
              </div>
              <div className="text-left md:text-right text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Assessment ID: #{activeSession.id}</span>
                Created {new Date(activeSession.date).toLocaleDateString()} at {new Date(activeSession.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>

            {isDashboard ? (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Trainer Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Aggregate performance insights for the selected candidate.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button 
                      onClick={resetCurrentCandidate} 
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all text-xs font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reset Current Scores
                    </button>
                    <button 
                      onClick={exportReport} 
                      className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" /> Export TXT Report
                    </button>
                  </div>
                </div>

                {/* Scorecards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Total score box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Total Combined Score</h3>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1.5">
                      {totalScore}<span className="text-lg text-slate-400 font-normal">/{maxPossible}</span>
                    </div>
                    <div className="text-xs font-semibold px-2.5 py-0.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 rounded-full">
                      Avg Score: {avgScore} / 5
                    </div>
                  </div>

                  {/* Level rating box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Assessed Level</h3>
                    <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mb-2">
                      {skillLevel}
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 max-w-[150px]">
                      <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(parseFloat(avgScore) / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Category completion box */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                    <h3 className="text-slate-400 dark:text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Progress Scorecard</h3>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1.5">
                      {completedCategories}<span className="text-lg text-slate-400 font-normal">/{CATEGORIES.length - 1}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Assessed Categories</p>
                  </div>
                </div>

                {/* Score breakdown per category */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2"><Award className="w-4 h-4 text-teal-500" /> Topic Evaluation Summary</h3>
                    <span className="text-[11px] text-slate-500 font-medium">15+ questions available per topic</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {CATEGORIES.filter(c => c.id !== 'dashboard').map(cat => (
                      <div 
                        key={cat.id} 
                        onClick={() => setActiveTab(cat.id)}
                        className="p-4 px-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg group-hover:text-teal-500 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/20 transition-all">
                            {cat.icon}
                          </div>
                          <span className="font-semibold text-xs sm:text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{cat.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {scores[cat.id] ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                              {scores[cat.id]} / 5 Score
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                              Unevaluated
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Candidates table roster */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-bold text-sm flex items-center gap-2"><Users className="w-4 h-4 text-teal-500" /> Candidate Management Roster</h3>
                    <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-600 dark:text-slate-300">{sessions.length} Active Sessions</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-[10px] text-slate-400 dark:text-slate-500 uppercase bg-slate-50/20 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                          <th className="px-6 py-3 font-semibold">Candidate Identifier</th>
                          <th className="px-6 py-3 font-semibold">Start Date</th>
                          <th className="px-6 py-3 font-semibold">Completed Modules</th>
                          <th className="px-6 py-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map((session) => {
                          const evalCount = Object.keys(session.scores || {}).length;
                          const isActive = activeSessionId === session.id;
                          
                          return (
                            <tr key={session.id} className={`border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all ${isActive ? 'bg-teal-50/10 dark:bg-teal-950/10' : ''}`}>
                              <td className="px-6 py-4 font-bold text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                  {isActive && <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>}
                                  <span className={isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-200'}>{session.name || 'Unnamed Candidate'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{new Date(session.date).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${evalCount > 0 ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                  {evalCount} / {CATEGORIES.length - 1} Evaluated
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {!isActive && (
                                    <button 
                                      onClick={() => setActiveSessionId(session.id)}
                                      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-bold px-2.5 py-1 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-lg transition-colors"
                                    >
                                      Load Profile
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => setCandidateToDelete(session.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                                    title="Delete Session"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block mb-0.5">Active Topic Module</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                      <span className="p-1.5 bg-teal-500/10 text-teal-500 rounded-lg">{activeCategoryData?.icon}</span>
                      {activeCategoryData?.name}
                    </h1>
                  </div>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="self-start sm:self-auto text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-teal-500 transition-colors"
                  >
                    ← Back to Dashboard Overview
                  </button>
                </div>

                {/* Score slider/input panel */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Assess Skill Level (1-5)</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Rate how confidently the candidate answered questions in this module.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        { val: 1, label: 'Poor' },
                        { val: 2, label: 'Basic' },
                        { val: 3, label: 'Fair' },
                        { val: 4, label: 'Good' },
                        { val: 5, label: 'Strong' }
                      ].map(sc => (
                        <button
                          key={sc.val}
                          onClick={() => handleScoreChange(sc.val)}
                          className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs transition-all border ${
                            scores[activeTab] === sc.val 
                              ? 'bg-teal-600 border-teal-600 text-white shadow-md transform scale-105 font-bold' 
                              : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span className="text-sm font-extrabold">{sc.val}</span>
                          <span className="text-[8px] opacity-85 uppercase">{sc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Trainer Assessment Notes (Saves automatically)</label>
                    <textarea 
                      value={notes[activeTab] || ''}
                      onChange={handleNoteChange}
                      placeholder="Add observations about strengths, code gaps, or specific questions answered poorly..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[90px] text-slate-800 dark:text-slate-100 transition-all placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Filter / Search header bar */}
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search questions or keyword answers..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-xl shrink-0">
                    {['All', 'Basic', 'Intermediate', 'Advanced'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          difficultyFilter === diff
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Question lists */}
                <div className="space-y-3 mb-12">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                    <span>Curated Question List</span>
                    <span className="text-teal-600 dark:text-teal-400">{filteredQuestions.length} of {currentQuestions.length} Match</span>
                  </div>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                      <QuestionAccordion key={q.id} {...q} />
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No criteria questions match your current search constraints.</p>
                      <button 
                        onClick={() => {setSearchQuery(''); setDifficultyFilter('All');}}
                        className="mt-3 text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
