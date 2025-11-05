"use client";
import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CloneCommand() {
  const [copied, setCopied] = useState(false);
  const command =
    "git clone https://github.com/maticarrera12/opennextjs_boilerplate";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center text-center gap-3 mt-4">
      <p className="text-sm text-muted-foreground">
        Or if you want to try what’s available so far:
      </p>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 text-sm font-mono bg-muted/40 border border-border rounded-md px-4 py-2 
                   hover:bg-muted/60 transition-all duration-150 relative"
      >
        <span className="underline underline-offset-2 decoration-primary/50 cursor-pointer select-none">
          git clone OpenNextJS
        </span>

        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              <CheckIcon className="w-4 h-4 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              <CopyIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}
