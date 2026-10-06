export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Welcome to Social Hub</h1>

      <p>Your social media platform is being built.</p>

      <div>
        <a href="/signup">Create an account</a>
        {" | "}
        <a href="/signin">Sign in</a>
      </div>
    </main>
  );
}
