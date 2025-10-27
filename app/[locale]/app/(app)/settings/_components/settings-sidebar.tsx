"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  UserIcon,
  LockIcon,
  BellIcon,
  PaletteIcon,
  CreditCardIcon,
  KeyIcon,
  UsersIcon,
  MenuIcon,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const sidebarSections = [
  {
    label: "Account",
    items: [
      {
        name: "Profile",
        href: "/app/settings/account/profile",
        icon: UserIcon,
      },
      {
        name: "Security",
        href: "/app/settings/account/security",
        icon: LockIcon,
      },
      {
        name: "Notifications",
        href: "/app/settings/account/notifications",
        icon: BellIcon,
      },
    ],
  },
  {
    label: "Preferences",
    items: [
      {
        name: "Appearance",
        href: "/app/settings/preferences/appearance",
        icon: PaletteIcon,
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        name: "Plan & Payments",
        href: "/app/settings/billing",
        icon: CreditCardIcon,
      },
    ],
  },
  {
    label: "Developers",
    items: [{ name: "API Keys", href: "/app/settings/api", icon: KeyIcon }],
  },
  {
    label: "Organization",
    items: [
      {
        name: "Members",
        href: "/app/settings/organization/members",
        icon: UsersIcon,
      },
      {
        name: "Invitations",
        href: "/app/settings/organization/invites",
        icon: UsersIcon,
      },
    ],
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Toggle mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg border bg-card p-2 shadow-sm md:hidden"
      >
        <MenuIcon size={20} />
      </button>

      {/* Sidebar fija, alto completo; solo cambia el ancho */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ width: isHovered ? 240 : 80 }}
        transition={{ duration: 0.12, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-20 border-r bg-card shadow-lg",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Contenido interno con padding y sin overflow horizontal */}
        <div className="flex h-full flex-col justify-between overflow-hidden">
          <div className="px-3 py-4">
            {/* Título: mantiene altura SIEMPRE (h-6). El texto solo cambia opacidad/ancho. */}
            <div className="mb-4 h-6">
              <span
                className={cn(
                  "block text-lg font-semibold text-foreground whitespace-nowrap transition-all duration-75",
                  isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                Settings
              </span>
            </div>

            {sidebarSections.map((section) => (
              <div key={section.label} className="mb-4">
                {/* Header de sección: reserva altura con h-5, oculta texto sin colapsar */}
                <div className="h-5 mb-1">
                  <span
                    className={cn(
                      "block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap transition-all duration-75",
                      isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                    )}
                  >
                    {section.label}
                  </span>
                </div>

                <nav className="flex flex-col">
                  {section.items.map((item) => {
                    const isActive = pathname.endsWith(item.href);
                    const Icon = item.icon;
                    return (
                      // Cada ítem mantiene altura fija (h-9)
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "grid h-9 place-items-center rounded-md text-sm transition-colors",
                          "hover:bg-accent/50 hover:text-foreground",
                          isActive
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                        style={{
                          // Grid con 2 columnas: ícono fijo (24px + gap), label flexible.
                          display: "grid",
                          gridTemplateColumns: "24px 1fr",
                          gap: "12px",
                          paddingInline: "8px",
                        }}
                      >
                        {/* Ícono: celda fija, no se mueve */}
                        <Icon
                          size={18}
                          className="justify-self-start text-muted-foreground group-hover:text-foreground"
                        />

                        {/* Label: ocupa su celda SIEMPRE; solo cambia opacidad/ancho para no empujar nada */}
                        <span
                          className={cn(
                            "justify-self-start whitespace-nowrap overflow-hidden transition-all duration-75",
                            isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                          )}
                        >
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Footer opcional con el mismo patrón (reserva altura) */}
          <div className="px-3 py-3 border-t">
            <div className="h-5">
              <span
                className={cn(
                  "text-xs text-muted-foreground whitespace-nowrap transition-all duration-75",
                  isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
