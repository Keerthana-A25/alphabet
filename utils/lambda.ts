export interface Snippet {
  id: string;
  title: string;
  description: string;
  mode: "Easy" | "Medium" | "Hard" | "Advanced";
  program: string;
  completed?: boolean;
  unlock?: boolean
}

export const programmingStages = [
  { title: "C/C++", description: "Low-level language used in embedded systems and real-time robotics control.", unlocked: true },
  { title: "Rust", description: "Memory-safe systems language gaining popularity in robotics.", unlocked: true },
  { title: "Python", description: "Widely used for scripting, AI, machine learning, and ROS development.", unlocked: true },
  { title: "C#", description: "Used with Unity and Windows robotics development platforms.", unlocked: false },
  { title: "Java", description: "Used in cross-platform robotics apps and educational robots.", unlocked: false },
  { title: "JavaScript", description: "For web-based control panels, dashboards, and robot UIs.", unlocked: false },
  { title: "Go", description: "Fast, lightweight concurrency; used in cloud robotics and backend services.", unlocked: false },
  { title: "Swift", description: "iOS-based robotics and educational platforms like Swift Playgrounds.", unlocked: false },
  { title: "Kotlin", description: "Modern JVM language, used for Android-based robotics apps.", unlocked: false },
  { title: "Lua", description: "Lightweight scripting language used in robot simulation environments.", unlocked: false },
  { title: "R", description: "Statistical computing; sometimes used for robotics data analysis.", unlocked: false },
  { title: "Lisp", description: "Historically used in AI and robotics research.", unlocked: false },
  { title: "Scheme", description: "A minimalist Lisp dialect; used in academic robotics.", unlocked: false },
  { title: "Haskell", description: "Functional programming; used in experimental robotics and logic reasoning.", unlocked: false },
  { title: "Assembly", description: "Low-level code for direct microcontroller programming.", unlocked: false },
  { title: "Ada", description: "High-reliability systems (e.g., aerospace, defense robotics).", unlocked: false },
  { title: "TypeScript", description: "Typed JavaScript used for front-end robotic interfaces.", unlocked: false },
  { title: "Fortran", description: "Legacy scientific computing, occasionally used in physics-based robotics sims.", unlocked: false },
  { title: "Julia", description: "High-performance language for robotics simulations and control systems.", unlocked: false },
  { title: "Nim", description: "Fast and expressive systems language, usable in embedded robotics.", unlocked: false },
  { title: "Zig", description: "Simple, predictable systems programming for microcontrollers.", unlocked: false },
  { title: "D", description: "C-like language with high-level features; used in performance robotics.", unlocked: false },
  { title: "Vala", description: "GNOME ecosystem language used in embedded Linux robotics.", unlocked: false },
  { title: "F#", description: "Functional .NET language with applications in logic-driven robotics.", unlocked: false },
  { title: "Elixir", description: "Used in distributed robotics and fault-tolerant systems.", unlocked: false },
  { title: "Erlang", description: "Real-time telecom-grade concurrency; applicable to swarm robotics.", unlocked: false },
  { title: "OCaml", description: "Strong type system; used in formal robotics research.", unlocked: false },
  { title: "Crystal", description: "Fast, Ruby-like syntax; still niche in robotics.", unlocked: false },
  { title: "Carbon", description: "Experimental language by Google, designed as a C++ successor.", unlocked: false },
  { title: "Shell / Bash", description: "Used in robot OS environments for scripting, deployment, automation.", unlocked: false },
  { title: "PowerShell", description: "Windows automation scripting, occasionally used in robotics tooling.", unlocked: false },
  { title: "Perl", description: "Older scripting language, still found in robotics test automation.", unlocked: false },
  { title: "Ruby", description: "Used in scripting and web control interfaces for robots.", unlocked: false },
  { title: "Tcl", description: "Used for embedded scripting and robotics testing.", unlocked: false },
  { title: "ROS", description: "Robot Operating System; a middleware framework using C++/Python.", unlocked: false },
  { title: "HTML", description: "Used in robotics for web-based control UIs and status dashboards.", unlocked: false },
  { title: "XML", description: "Common in ROS launch files and robot configuration formats.", unlocked: false },
  { title: "TensorFlow", description: "Machine learning library used for AI in robotics (e.g., vision, NLP).", unlocked: false },
  { title: "PyTorch", description: "Popular deep learning framework, often used in robotics perception.", unlocked: false },
];




export const DIFFICULTY_COLORS = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
  Advanced: "advanced",
};
