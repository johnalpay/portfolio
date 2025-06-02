import { useEffect, useState } from "react";

export default function Home() {
  const projects = [
    {
      name: "Lyrics",
      url: "https://lyrics-liart.vercel.app/",
      description: "Lyrics Finder Website",
    },
    {
      name: "Profile Guard",
      url: "https://profile-guard.vercel.app/",
      description: "Facebook Profile Guard Tool",
    },
    {
      name: "Token Getter (Cookie Method)",
      url: "https://getnew-xi.vercel.app/",
      description: "Facebook Token Getter using Cookie Method",
    },
  ];

  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState("home"); // home, login, signup
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
      setMessage("Username already exists. Please login or choose another.");
      return;
    }
    users[formUsername] = formPassword;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login now.");
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
    if (users[formUsername] && users[formUsername] === formPassword) {
      localStorage.setItem("loggedInUser", formUsername);
      setUser(formUsername);
      setMessage("");
      setFormUsername("");
      setFormPassword("");
      setView("home");
    } else {
      setMessage("Invalid username or password.");
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
        <h1 style={styles.title}>My Projects</h1>
        <nav>
          {!user ? (
            <>
              <button
                style={styles.navButton}
                onClick={() => {
                  setView("login");
                  setMessage("");
                }}
              >
                Login
              </button>
              <button
                style={styles.navButton}
                onClick={() => {
                  setView("signup");
                  setMessage("");
                }}
              >
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
          <p style={styles.description}>Here are the websites I have built.</p>
          <div style={styles.projectsContainer}>
            {projects.map((project) => (
              <div
                key={project.name}
                style={styles.projectCard}
                className="project-card"
              >
                <h2 style={styles.projectName}>{project.name}</h2>
                <p style={styles.projectDesc}>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button style={styles.button}>Visit</button>
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {(view === "login" || view === "signup") && (
        <form
          onSubmit={view === "login" ? handleLogin : handleSignup}
          style={styles.form}
        >
          <h2>{view === "login" ? "Login" : "Sign Up"}</h2>
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
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={() => {
                    setView("signup");
                    setMessage("");
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  style={styles.linkButton}
                  onClick={() => {
                    setView("login");
                    setMessage("");
                  }}
                >
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
          aria-label="Follow on Facebook"
          className="follow-button"
        >
          <FacebookIcon /> Follow me on Facebook
        </a>
      </footer>

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #1e3a8a;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        main {
          min-height: 100vh;
          padding: 50px 20px 60px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .project-card:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
        }

        button:hover {
          background-color: #3b82f6;
          transition: background-color 0.3s ease;
        }

        .follow-button:hover {
          background-color: #2563eb;
          color: #fff;
          border-color: #1e40af;
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
    maxWidth: 540,
    width: "100%",
    margin: "0 auto",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    margin: 0,
  },
  navButton: {
    marginLeft: 12,
    padding: "7px 16px",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: 6,
    color: "#e0e7ff",
    cursor: "pointer",
  },
  dateTime: {
    marginBottom: 28,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  projectCard: {
    width: "100%",
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    color: "#e0e7ff",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "box-shadow 0.3s ease",
  },
  projectName: {
    fontSize: 20,
    margin: "0 0 8px 0",
  },
  projectDesc: {
    fontSize: 15,
    margin: "0 0 12px 0",
  },
  button: {
    backgroundColor: "#3b82f6",
    border: "none",
    padding: "10px 24px",
    fontSize: 15,
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    margin: "0 auto",
    backgroundColor: "#2563eb",
    padding: 28,
    borderRadius: 8,
    boxShadow: "0 6px 15px rgba(37, 99, 235, 0.5)",
    color: "#e0e7ff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 14,
    borderRadius: 6,
    border: "none",
    fontSize: 15,
    boxSizing: "border-box",
  },
  message: {
    color: "#f87171",
    marginBottom: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    width: "100%",
    maxWidth: 540,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  followButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 28px",
    fontWeight: "700",
    fontSize: 15,
    color: "#3b82f6",
    backgroundColor: "transparent",
    border: "2px solid #3b82f6",
    borderRadius: 50,
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none",
  },
};
