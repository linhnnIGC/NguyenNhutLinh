import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onHome: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onHome }) => {
  return (
    <div className="min-h-screen bg-teal-50 text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-teal-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onHome}
          >
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Global Success 11</h1>
              <p className="text-teal-100 text-xs">English Companion App</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-teal-100">
             <span className="flex items-center gap-2"><BookOpen size={16}/> Curriculum Aligned</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-teal-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>© 2024 Global Success Companion. Designed for Grade 11 Students.</p>
        </div>
      </footer>
    </div>
  );
};