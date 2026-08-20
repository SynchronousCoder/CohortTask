HOW TO USE CONTEXT =>
// create karo context
// provide karo data
// use karo context

============================================================================

Frontend Architecture – 4-Layer Model (React)
This note describes a simple, scalable way to structure a React frontend into 4 strict layers:

UI (Presentation)
  ↓
Hooks (Orchestration) :👉 alag‑alag cheezon ko ek saath coordinate karke smoothly chalana.
  ↓
State (Memory)
  ↓
API (Backend Communication)
Each layer has a single responsibility. When layers leak into each other, technical debt starts.

Folder convention (example)
features/
  auth/
    pages/            # UI
    components/       # UI
    hooks/            # Orchestration
    store/ or *.context.tsx   # State
    services/         # API

1) UI Layer (Presentation Layer)
Location

features/*/pages/
features/*/components/
Responsibility

Render UI
Handle form input
Trigger actions (onClick, onSubmit)
Display loading and error states
Navigate between routes
UI must NOT

Call API directly
Access cookies/localStorage
Parse tokens
Manage global state directly
Contain business rules
Know backend response structure
UI should be dumb and declarative.

Example

const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
};
Real-life use case

A login page that only collects email/password, calls useAuth().login, and shows “Logging in…” / error text.
Why keep UI dumb?

Refactoring becomes safer
Testing becomes easier
Less duplication
Business rules don’t leak into every component