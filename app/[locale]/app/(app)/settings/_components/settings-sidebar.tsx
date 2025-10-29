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
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("settings");

  const sidebarSections = [
    {
      label: t("sections.account"),
      items: [
        {
          name: t("menu.profile"),
          href: "/app/settings/account/profile",
          icon: UserIcon,
        },
        {
          name: t("menu.security"),
          href: "/app/settings/account/security",
          icon: LockIcon,
        },
        {
          name: t("menu.notifications"),
          href: "/app/settings/account/notifications",
          icon: BellIcon,
        },
      ],
    },
    {
      label: t("sections.preferences"),
      items: [
        {
          name: t("menu.appearance"),
          href: "/app/settings/preferences/appearance",
          icon: PaletteIcon,
        },
      ],
    },
    {
      label: t("sections.billing"),
      items: [
        {
          name: t("menu.planPayments"),
          href: "/app/settings/billing",
          icon: CreditCardIcon,
        },
      ],
    },
    {
      label: t("sections.developers"),
      items: [
        { name: t("menu.apiKeys"), href: "/app/settings/api", icon: KeyIcon },
      ],
    },
    {
      label: t("sections.organization"),
      items: [
        {
          name: t("menu.members"),
          href: "/app/settings/organization/members",
          icon: UsersIcon,
        },
        {
          name: t("menu.invitations"),
          href: "/app/settings/organization/invites",
          icon: UsersIcon,
        },
      ],
    },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <>
      {/* Navbar mobile - barra superior con fondo */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-border bg-background px-4 shadow-sm md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group rounded-lg p-2 hover:bg-accent transition-colors"
          aria-expanded={isOpen}
        >
          <svg
            className="pointer-events-none"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </button>
        <span className="ml-3 text-lg font-semibold">{t("title")}</span>
      </div>

      {/* Sidebar fija, alto completo; solo cambia el ancho */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ width: isHovered || isOpen ? 240 : 80 }}
        transition={{ duration: 0.12, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 z-40 h-screen w-20 border-r bg-card shadow-lg",
          "top-14 md:top-0",
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
                  isHovered || isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                {t("title")}
              </span>
            </div>

            {sidebarSections.map((section) => (
              <div key={section.label} className="mb-4">
                {/* Header de sección: reserva altura con h-5, oculta texto sin colapsar */}
                <div className="h-5 mb-1">
                  <span
                    className={cn(
                      "block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap transition-all duration-75",
                      isHovered || isOpen
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0"
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
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "grid h-9 place-items-center rounded-md text-sm transition-colors",
                          "hover:bg-accent/50 hover:text-foreground",
                          isActive
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                        style={
                          {
                            // Grid con 2 columnas: ícono fijo (24px + gap), label flexible.
                            display: "grid",
                            gridTemplateColumns: "24px 1fr",
                            gap: "12px",
                            paddingInline: "8px",
                          } as React.CSSProperties
                        }
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
                            isHovered || isOpen
                              ? "opacity-100 w-auto"
                              : "opacity-0 w-0"
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

          {/* Logout button */}
          <div className="px-3 py-3 border-t">
            <button
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className={cn(
                "grid h-9 w-full place-items-center rounded-md text-sm transition-colors",
                "hover:bg-destructive/10 hover:text-destructive"
              )}
              style={
                {
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",
                  gap: "12px",
                  paddingInline: "8px",
                } as React.CSSProperties
              }
            >
              <LogOutIcon
                size={18}
                className="justify-self-start text-muted-foreground hover:text-destructive"
              />
              <span
                className={cn(
                  "justify-self-start whitespace-nowrap overflow-hidden transition-all duration-75",
                  isHovered || isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                {t("menu.logout")}
              </span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-14 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  );
}
