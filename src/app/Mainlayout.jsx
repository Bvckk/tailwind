import Header from "./Head";
import Nav from "./Nav";
export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/dist/styles.css" rel="stylesheet"></link>
      </head>
      <body>
        <div className="h-screen grid grid-rows-[80px_1fr] grid-cols-12">
          {/* Sidebar */}
          <aside className="col-span-2 row-span-2 flex flex-col items-start justify-start bg-gray-800 text-white p-4">
            <Nav />
          </aside>
          {/* Header */}
          <header className="col-span-10 row-span-1 flex items-center justify-between px-4 bg-black">
            <Header />
          </header>
          {/* Main */}
          <main className="col-span-10 row-span-1 p-4 overflow-auto relative flex align-center bg-black text-white">
            {children}
          </main>
        </div>
        
      </body>

    </html>
  );
}