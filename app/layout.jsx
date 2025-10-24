import './globals.css';

export const metadata = {
  title: 'AI Job Poster Generator',
  description: 'Create AI-themed job posters and export to PNG/PDF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="container">
          <header className="header">
            <div className="logo">
              <div className="logo-badge" />
              <div>
                <div style={{ fontSize: 18 }}>AI Job Poster</div>
                <div className="subtitle" style={{ fontSize: 12 }}>Design posters for your AI job portal</div>
              </div>
            </div>
            <a className="button ghost" href="https://vercel.com" target="_blank" rel="noreferrer">Deploy</a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
