import { useEffect, useState } from "react";

export default function Home() {
  const projects = [
    {
      name: "Lyrics Finder",
      url: "https://lyrics-liart.vercel.app/",
      description: "Search any song and instantly get the lyrics.",
    },
    {
      name: "Facebook Profile Guard",
      url: "https://profile-guard.vercel.app/",
      description: "Enable your Facebook profile picture guard easily.",
    },
    {
      name: "Token Getter (Cookie Method)",
      url: "https://getnew-xi.vercel.app/",
      description: "Generate Facebook tokens securely using your cookies.",
    },
  ];

  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) setUser(savedUser);
  }, []);

  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString();

  function handleSignup(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : {};
    if (users[formUsername]) {
      setMessage("Username already exists. Try logging in.");
      return;
    }
    users[formUsername] = formPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! You can now log in.");
    setFormUsername("");
    setFormPassword("");
    setView("login");
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!formUsername || !formPassword) {
      setMessage("Please fill in both fields.");
      return;
    }
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : {};
    if (users[formUsername] === formPassword) {
      localStorage.setItem("loggedInUser", formUsername);
      setUser(formUsername);
      setMessage("");
      setFormUsername("");
      setFormPassword("");
      setView("home");
    } else {
      setMessage("Incorrect username or password.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setView("home");
  }

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📁 My Projects</h1>
        <nav>
          {!user ? (
            <>
              <button style={styles.navButton} onClick={() => { setView("login"); setMessage(""); }}>
                Login
              </button>
              <button style={styles.navButton} onClick={() => { setView("signup"); setMessage(""); }}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: 15, fontWeight: "600" }}>
                Welcome, {user}!
              </span>
              <button style={styles.navButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <div style={styles.dateTime}>
        <span>{formattedDate}</span> | <span>{formattedTime}</span>
      </div>

      {view === "home" && (
        <>
          <p style={styles.description}>
            Explore the web tools and mini-projects I’ve built recently.
          </p>
          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div key={project.name} style={styles.projectCard} className="project-card">
                <h2 style={styles.projectName}>{project.name}</h2>
                <p style={styles.projectDesc}>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button style={styles.button}>Visit Site</button>
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {(view === "login" || view === "signup") && (
        <form onSubmit={view === "login" ? handleLogin : handleSignup} style={styles.form}>
          <h2>{view === "login" ? "Login to Continue" : "Create an Account"}</h2>
          {message && <p style={styles.message}>{message}</p>}
          <input
            type="text"
            placeholder="Username"
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
            style={styles.input}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            style={styles.input}
            autoComplete={view === "login" ? "current-password" : "new-password"}
          />
          <button type="submit" style={styles.button}>
            {view === "login" ? "Login" : "Sign Up"}
          </button>
          <p style={{ marginTop: 12 }}>
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button type="button" style={styles.linkButton} onClick={() => { setView("signup"); setMessage(""); }}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" style={styles.linkButton} onClick={() => { setView("login"); setMessage(""); }}>
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      )}

      <footer style={styles.footer}>
        <a
          href="https://www.facebook.com/profile.php?id=61576992292379"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.followButton}
          className="follow-button"
        >
          <FacebookIcon /> Follow me on Facebook
        </a>
      </footer>

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
          background-color: #1e3a8a;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px 60px;
          box-sizing: border-box;
        }

        .project-card:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        button:hover {
          background-color: #3b82f6;
          transition: 0.3s ease;
        }

        .follow-button:hover {
          background-color: #2563eb;
          box-shadow: 0 6px 15px rgba(37, 99, 235, 0.7);
          transition: all 0.3s ease;
        }

        .follow-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </main>
  );
}

function FacebookIcon() {
  return (
    <svg
      style={{ marginRight: 8 }}
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      fill="#3b82f6"
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    width: "100%",
    margin: "0 auto",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 26,
    margin: 0,
  },
  navButton: {
    marginLeft: 10,
    marginTop: 6,
    padding: "7px 14px",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: 6,
    color: "#e0e7ff",
    cursor: "pointer",
  },
  dateTime: {
    marginBottom: 20,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  description: {
    marginBottom: 18,
    fontSize: 17,
    textAlign: "center",
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    width: "100%",
  },
  projectCard: {
    width: "100%",
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 8,
    boxSizing: "border-box",
    maxWidth: 500,
  },
  projectName: {
    fontSize: 20,
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: 15,
    marginBottom: 12,
  },
  button: {
    padding: "8px 18px",
    fontSize: 14,
    backgroundColor: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    border: "none",
  },
  message: {
    color: "#ffbaba",
    backgroundColor: "#ff4d4d",
    padding: "8px 12px",
    borderRadius: 6,
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#bfdbfe",
    cursor: "pointer",
    textDecoration: "underline",
  },
  footer: {
    marginTop: 50,
  },
  followButton: {
    padding: "10px 16px",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },
};
                                                                                              
