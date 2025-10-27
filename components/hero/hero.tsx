import React from 'react'
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        onClick={() => (window.location.href = "/app")}
        className="text-sm  cursor-pointer border-2 bg-transparent border-indigo-700 hover:bg-indigo-700 text-foreground"
      >
        Try App
      </Button>
    </div>
  );
}

export default Hero