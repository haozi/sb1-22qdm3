import React, { useEffect, useRef } from 'react';
import { Code, Zap } from 'lucide-react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const animate = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Figma-like shapes
      ctx.fillStyle = '#1E1E1E';
      ctx.fillRect(50, 50, 100, 100);
      ctx.fillStyle = '#4B4B4B';
      ctx.fillRect(170, 50, 100, 100);

      // Animate code lines
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(300, 50 + Math.sin(t) * 20);
      ctx.lineTo(450, 50 + Math.cos(t) * 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(300, 100 + Math.cos(t) * 20);
      ctx.lineTo(450, 100 + Math.sin(t) * 20);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code size={32} />
          <span className="text-2xl font-bold">CodeExport</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
            <li><a href="#demo" className="hover:text-green-400 transition-colors">Demo</a></li>
            <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section id="hero" className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">Figma to Code in a Flash</h1>
            <p className="text-xl mb-8">Transform your designs into efficient, production-ready code</p>
            <canvas ref={canvasRef} width="500" height="200" className="mx-auto mb-8 border border-gray-700 rounded-lg"></canvas>
            <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition-colors flex items-center mx-auto">
              <Zap className="mr-2" />
              Try CodeExport Now
            </button>
          </div>
        </section>

        {/* Add more sections as needed */}
      </main>

      <footer className="bg-gray-900 text-center py-4">
        <p>&copy; 2024 CodeExport. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;