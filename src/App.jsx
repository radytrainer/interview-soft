import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Moon, Sun, Download, RefreshCw, ChevronDown, ChevronRight, 
  Menu, X, Star, FileText, CheckCircle, BrainCircuit, Bug, 
  Layers, Globe, Shield, UserPlus, Trash2, Users, Edit3, Award, FileSpreadsheet,
  Palette, CheckSquare, Briefcase
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
  { id: 'fundamentals', name: 'Communication', icon: <FileText className="w-5 h-5" /> },
  { id: 'problem_solving', name: 'Problem Solving', icon: <BrainCircuit className="w-5 h-5" /> },
  { id: 'debugging', name: 'Critical Thinking', icon: <Bug className="w-5 h-5" /> },
  { id: 'data_structures', name: 'Teamwork', icon: <Users className="w-5 h-5" /> },
  { id: 'algorithms', name: 'Adaptability', icon: <RefreshCw className="w-5 h-5" /> },
  { id: 'oop', name: 'Leadership', icon: <Star className="w-5 h-5" /> },
  { id: 'database', name: 'Time Management', icon: <FileSpreadsheet className="w-5 h-5" /> },
  { id: 'api_backend', name: 'Interpersonal Skills', icon: <Globe className="w-5 h-5" /> },
  { id: 'security', name: 'Integrity', icon: <Shield className="w-5 h-5" /> },
  { id: 'ux_ui', name: 'Creativity', icon: <Palette className="w-5 h-5" /> },
  { id: 'qa', name: 'Attention to Detail', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 'dba', name: 'Emotional Intelligence', icon: <Award className="w-5 h-5" /> },
  { id: 'project_management', name: 'Project Management', icon: <Briefcase className="w-5 h-5" /> },
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
      "id": "f2",
      "difficulty": "Basic",
      "question": "What should you do if you do not understand instructions the first time?",
      "answer": "I should ask respectful follow-up questions instead of guessing. That shows responsibility and helps avoid mistakes. Good communicators confirm expectations early so they can do the task correctly.",
      "example": "If a lecturer gives a group assignment and I am unsure about the format, I ask whether the final output should be a report, slides, or both."
    },
    {
      "id": "f3",
      "difficulty": "Basic",
      "question": "How do you make sure your written communication is professional?",
      "answer": "I keep the message polite, direct, and well-structured. I review the spelling, tone, and key details before sending it. Professional writing should make it easy for the reader to know what happened and what is needed next.",
      "example": "Before emailing a teacher about a missed deadline, I explain the situation clearly, take responsibility, and ask for guidance in a respectful tone."
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
    }
  ],
  "problem_solving": [
    {
      "id": "ps1",
      "difficulty": "Basic",
      "question": "How do you approach a problem that you have never faced before?",
      "answer": "I start by understanding the problem clearly, then break it into smaller parts, identify what I know, and find the missing information. A structured approach helps me stay calm and prevents me from jumping to weak solutions.",
      "example": "If a team project is not working, I first identify whether the issue is planning, communication, or lack of resources before deciding what to do."
    },
    {
      "id": "ps2",
      "difficulty": "Intermediate",
      "question": "What do you do when your first solution does not work?",
      "answer": "I review what I tried, identify why it failed, and adjust my approach instead of giving up. Problem solving is often about learning from feedback and improving step by step.",
      "example": "If my first draft of a report is too weak, I compare it with the rubric, improve the missing parts, and ask for feedback before the final submission."
    },
    {
      "id": "ps3",
      "difficulty": "Intermediate",
      "question": "How do you solve problems when you are under pressure?",
      "answer": "I focus on the facts, prioritize the most urgent issue first, and avoid panicking. Under pressure, it is important to stay organized and choose the action that creates the biggest positive impact.",
      "example": "If two assignments and one presentation are due close together, I rank them by deadline and difficulty and work on the highest-risk task first."
    },
    {
      "id": "ps4",
      "difficulty": "Intermediate",
      "question": "How do you decide between two possible solutions?",
      "answer": "I compare the options based on the goal, available time, available resources, and possible risks. The best solution is usually the one that is practical, realistic, and most likely to solve the main problem well.",
      "example": "For a group presentation, I may choose a simpler slide design that the whole team can finish well instead of a complex design that risks delay."
    },
    {
      "id": "ps5",
      "difficulty": "Intermediate",
      "question": "How do you help solve a problem in a team when people have different ideas?",
      "answer": "I listen to each viewpoint, look for the main goal we all share, and suggest a fair way to compare the ideas. Good problem solving in a team means balancing logic, respect, and cooperation.",
      "example": "If teammates disagree about how to divide work, I suggest listing tasks, deadlines, and strengths so we can make a practical decision together."
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
      "id": "db2",
      "difficulty": "Intermediate",
      "question": "How do you evaluate whether information is reliable?",
      "answer": "I check the source, compare it with other information, and look for evidence instead of depending only on opinion. Reliable thinking comes from verifying facts before making a conclusion.",
      "example": "If I am researching for an assignment, I use trusted academic or official sources instead of random posts online."
    },
    {
      "id": "db3",
      "difficulty": "Intermediate",
      "question": "Why is it important to ask why something happened instead of only accepting the result?",
      "answer": "Asking why helps uncover the real cause behind a situation. Without understanding the cause, we may solve only the surface problem and repeat the same mistake later.",
      "example": "If a team misses a deadline, I do not just say the team was late. I ask whether the issue was poor planning, unclear roles, or unexpected workload."
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
      "id": "tw2",
      "difficulty": "Intermediate",
      "question": "How do you contribute well in a team project?",
      "answer": "I complete my assigned tasks on time, communicate regularly, and support the team when needed. Being a good team member means being reliable as well as cooperative.",
      "example": "If my part of the presentation is finished early, I help check the slides or practice with the group."
    },
    {
      "id": "tw3",
      "difficulty": "Intermediate",
      "question": "What should you do if one team member is not contributing enough?",
      "answer": "I would speak respectfully with the person first, try to understand the reason, and look for a fair solution. If the issue continues, I would raise it with the team or lecturer in a professional way.",
      "example": "If a teammate misses two agreed deadlines, I check in privately before escalating the issue."
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
      "id": "ad4",
      "difficulty": "Intermediate",
      "question": "What do you do when you need to learn something quickly?",
      "answer": "I identify the most important parts first, use reliable resources, and practice immediately so the knowledge becomes useful. Quick learning works best when it is focused and active.",
      "example": "If I need to use a new tool for class, I learn the essential features first instead of trying to master everything at once."
    },
    {
      "id": "ad5",
      "difficulty": "Intermediate",
      "question": "How do you stay effective in an unfamiliar environment?",
      "answer": "I observe carefully, ask useful questions, and stay open to different ways of working. Adaptability is not pretending to know everything. It is learning fast and staying calm while adjusting.",
      "example": "During an internship, I may need to follow a new communication style or schedule, so I observe the team and adjust quickly."
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
      "id": "ld2",
      "difficulty": "Intermediate",
      "question": "How can you show leadership in a group project?",
      "answer": "I can show leadership by helping the team organize the work, keeping communication clear, and supporting others when problems appear. Good leadership is about service and direction, not control.",
      "example": "I might create a task list, confirm deadlines, and help teammates who are unclear about their part."
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
      "id": "ld5",
      "difficulty": "Intermediate",
      "question": "How do you lead by example?",
      "answer": "I do the work I expect from others, stay accountable, and treat people with respect. Leadership by example builds credibility because people trust actions more than words.",
      "example": "If I ask the group to be on time, I make sure I arrive prepared and on time myself."
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
      "id": "tm2",
      "difficulty": "Intermediate",
      "question": "How do you prioritize when you have many tasks at once?",
      "answer": "I look at deadlines, importance, and effort, then start with the tasks that are both urgent and important. Prioritizing helps me avoid wasting energy on less important work first.",
      "example": "If I have an exam, a team project, and a small homework task, I plan based on impact and due date."
    },
    {
      "id": "tm3",
      "difficulty": "Intermediate",
      "question": "How do you avoid procrastination?",
      "answer": "I break large tasks into smaller steps, set mini-deadlines, and start with one clear action. Procrastination becomes easier to overcome when the work feels manageable.",
      "example": "Instead of thinking 'write the whole report,' I begin with 'find three sources' or 'draft the introduction.'"
    },
    {
      "id": "tm4",
      "difficulty": "Intermediate",
      "question": "What do you do when you realize you may not finish on time?",
      "answer": "I review what is left, adjust my plan, and communicate early if needed. Good time management includes noticing risk early and taking action before it becomes a bigger problem.",
      "example": "If I see that my part of a group project will be late, I tell the team early and suggest a realistic update plan."
    },
    {
      "id": "tm5",
      "difficulty": "Intermediate",
      "question": "How do you stay organized over a busy week?",
      "answer": "I use a simple plan such as a calendar, task list, or schedule, and I review it regularly. Staying organized works best when I know what needs to be done each day.",
      "example": "At the start of the week, I list classes, deadlines, and study times so I can see where to focus."
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
      "id": "ip2",
      "difficulty": "Intermediate",
      "question": "How do you build good relationships with classmates or coworkers?",
      "answer": "I build relationships by being respectful, dependable, and easy to communicate with. Strong relationships usually grow from consistent positive behavior, not only from being friendly once.",
      "example": "When working with new classmates, I introduce myself, listen to their ideas, and follow through on my tasks."
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
      "id": "ip5",
      "difficulty": "Intermediate",
      "question": "Why are interpersonal skills valuable in interviews?",
      "answer": "They show that a candidate can work well with others, communicate professionally, and fit into a team environment. Even strong technical people need interpersonal skills to succeed in real workplaces.",
      "example": "A student who answers politely, listens fully, and responds thoughtfully often leaves a stronger interview impression."
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
      "id": "in2",
      "difficulty": "Intermediate",
      "question": "How do you respond if you make a mistake?",
      "answer": "I admit the mistake, take responsibility, and focus on correcting it quickly. Integrity means being honest about errors instead of hiding them or blaming others.",
      "example": "If I submit the wrong file, I inform the teacher immediately and send the correct version with an apology."
    },
    {
      "id": "in3",
      "difficulty": "Intermediate",
      "question": "What would you do if a friend asked you to do something dishonest?",
      "answer": "I would refuse respectfully and explain that I want to act fairly and responsibly. Integrity sometimes requires saying no, even when it feels uncomfortable.",
      "example": "If a friend asks for my answers during an exam, I would not share them because it would be unfair and dishonest."
    },
    {
      "id": "in4",
      "difficulty": "Intermediate",
      "question": "Why is honesty important in interviews?",
      "answer": "Honesty helps interviewers trust the candidate and understand their real strengths and development areas. It is better to admit what I still need to learn than to pretend I know something I do not.",
      "example": "If I have limited experience with a tool, I say that honestly and explain how I would learn it."
    },
    {
      "id": "in5",
      "difficulty": "Intermediate",
      "question": "How does integrity affect teamwork?",
      "answer": "Teams work better when members trust each other to be truthful, fair, and responsible. Integrity reduces confusion and builds a stronger working environment.",
      "example": "If I cannot finish my part on time, integrity means telling the team early instead of pretending everything is fine."
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
      "id": "cr2",
      "difficulty": "Intermediate",
      "question": "How can creativity help in solving everyday problems?",
      "answer": "Creativity helps people see more than one possible solution and improve results when the first idea is not enough. It supports both innovation and adaptability.",
      "example": "If my group has limited time for a presentation, I may create a simpler but more engaging format to deliver the message clearly."
    },
    {
      "id": "cr3",
      "difficulty": "Intermediate",
      "question": "How do you stay creative when working under constraints?",
      "answer": "I focus on the goal, accept the limits, and think about what is still possible within them. Creativity often becomes stronger when we need to work with limited time, money, or resources.",
      "example": "If I cannot use expensive tools for a project, I look for simpler methods that still communicate the idea well."
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
      "id": "ei2",
      "difficulty": "Intermediate",
      "question": "How do you manage your emotions during stressful situations?",
      "answer": "I pause, stay aware of what I am feeling, and focus on responding calmly instead of reacting impulsively. Managing emotions well helps me protect both the result and the relationship.",
      "example": "If I receive tough feedback, I take a moment to understand it before responding defensively."
    },
    {
      "id": "ei3",
      "difficulty": "Intermediate",
      "question": "Why is empathy important in a team?",
      "answer": "Empathy helps people understand different perspectives and respond with more patience and support. It improves teamwork because people feel heard and respected.",
      "example": "If a teammate is struggling with workload, empathy helps me support them instead of judging them too quickly."
    },
    {
      "id": "ei4",
      "difficulty": "Intermediate",
      "question": "How do you respond when someone is upset with you?",
      "answer": "I listen without interrupting, try to understand their concern, and respond respectfully. Emotional intelligence helps me avoid escalating the situation and focus on resolution.",
      "example": "If a teammate is frustrated because of a misunderstanding, I listen first and then clarify calmly."
    },
    {
      "id": "ei5",
      "difficulty": "Intermediate",
      "question": "How does emotional intelligence help during interviews?",
      "answer": "It helps candidates stay calm, listen well, respond thoughtfully, and build a positive connection with interviewers. Emotional control and awareness can strengthen even simple answers.",
      "example": "If an interviewer asks a difficult question, I stay composed and answer honestly instead of panicking."
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
      "id": "pm3",
      "difficulty": "Intermediate",
      "question": "How do you manage a project when multiple people are involved?",
      "answer": "I make sure roles are clear, deadlines are known, and communication happens regularly. Good project management keeps everyone aligned and helps the group notice problems early.",
      "example": "In a student project, one person can track progress while others focus on research, writing, and presentation."
    },
    {
      "id": "pm4",
      "difficulty": "Intermediate",
      "question": "What do you do if a project starts falling behind schedule?",
      "answer": "I review what is causing the delay, re-prioritize the most important tasks, and communicate with the team quickly. Good project management means adjusting the plan before the delay becomes worse.",
      "example": "If slide design is taking too long, I may simplify the design so the team can still meet the presentation deadline."
    },
    {
      "id": "pm5",
      "difficulty": "Intermediate",
      "question": "How do you keep a project organized from start to finish?",
      "answer": "I break the project into stages, track deadlines, and review progress regularly so the team stays aligned. Organization is one of the main strengths of good project management.",
      "example": "A group can use a shared checklist or timeline to track research, editing, and rehearsal before a final presentation."
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
          <span className="tracking-wide">TechTrainer Pro</span>
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
          <span className="tracking-tight">TechTrainer Pro</span>
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
