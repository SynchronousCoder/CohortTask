import "./globals.css";

export const metadata = {
  title: "AgriAI - Intelligent Farmer Decision Platform",
  description: "End-to-end AI assistant for Plan, Grow, Store, Aggregate, and Sell agricultural produce.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
