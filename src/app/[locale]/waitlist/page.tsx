"use client";

import { Copy, Check, Share2, Users, Sparkles, RefreshCw } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useWaitlistForm } from "@/hooks/use-waitlist-form";

export default function WaitlistPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const referralParam = searchParams.get("ref");
  // Extraer el locale del pathname (ej: /es/waitlist -> es, /en/waitlist -> en)
  const locale = pathname.split("/")[1] || "en";
  const t = useTranslations("waitlist");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [lookupValue, setLookupValue] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);

  const { form, onSubmit, isSubmitting } = useWaitlistForm({
    locale,
    referralParam,
    onSuccess: result => {
      setReferralCode(result.referralCode);
      setPosition(result.position || null);
      setIsSubmitted(true);

      localStorage.setItem("waitlist_referral_code", result.referralCode);
    },
    messages: {
      success: t("form.joinSuccess"),
      error: t("form.joinError"),
    },
  });

  const handleCopyReferralLink = () => {
    const baseURL = window.location.origin;
    const referralUrl = `${baseURL}/waitlist?ref=${referralCode}`;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    toast.success(t("success.copied"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const baseURL = window.location.origin;
    const referralUrl = `${baseURL}/waitlist?ref=${referralCode}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("success.shareTitle"),
          text: t("success.shareMessage"),
          url: referralUrl,
        });
      } catch (err) {
        toast.error("Share failed:", err!);
      }
    } else {
      handleCopyReferralLink();
    }
  };

  const refreshStats = async () => {
    if (!referralCode) return;

    try {
      const response = await fetch(`/api/waitlist/stats?code=${referralCode}`);
      if (response.ok) {
        const data = await response.json();
        setPosition(data.position);
        setReferralCount(data.referralCount);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("success.refreshError"));
    }
  };

  const handleLookup = async () => {
    if (!lookupValue.trim()) {
      toast.error(t("lookup.enterValue"));
      return;
    }

    setIsLookingUp(true);

    try {
      // Intentar buscar por código primero
      let response = await fetch(`/api/waitlist/stats?code=${lookupValue}`);

      // Si falla, intentar buscar por email
      if (!response.ok) {
        response = await fetch(`/api/waitlist/lookup?email=${encodeURIComponent(lookupValue)}`);
      }

      if (!response.ok) {
        throw new Error(t("lookup.notFound"));
      }

      const data = await response.json();

      // Recuperar información
      setReferralCode(data.referralCode || lookupValue);
      setPosition(data.position);
      setReferralCount(data.referralCount);
      setIsSubmitted(true);

      // Guardar en localStorage
      localStorage.setItem("waitlist_referral_code", data.referralCode || lookupValue);

      setShowLookup(false);
      toast.success(t("lookup.welcomeBack"));
    } catch (error) {
      const message = error instanceof Error ? error.message : t("lookup.notFound");
      toast.error(message);
    } finally {
      setIsLookingUp(false);
    }
  };

  // Cargar desde localStorage al montar
  useEffect(() => {
    const savedCode = localStorage.getItem("waitlist_referral_code");
    // Solo cargar si NO hay un referralParam nuevo (para permitir usar otro link)
    if (savedCode && !referralParam) {
      setReferralCode(savedCode);
      setIsSubmitted(true);
    }
  }, [referralParam]);

  // Cargar estadísticas iniciales cuando el componente monta con un referralCode
  useEffect(() => {
    if (isSubmitted && referralCode) {
      refreshStats();
    }
  }, [isSubmitted, referralCode]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="max-w-2xl w-full space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">{t("success.title")} 🎉</h1>
            <div className="flex items-center justify-center gap-6">
              {position && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">
                    {t("success.position")}
                  </p>
                  <p className="text-3xl font-bold text-primary">#{position}</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  {t("success.referrals")}
                </p>
                <p className="text-3xl font-bold text-primary">{referralCount}</p>
              </div>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {t("success.skipTheLineTitle")}
                </h2>
                <button
                  onClick={refreshStats}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  title={t("success.refreshTooltip")}
                >
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground">{t("success.skipTheLineSubtitle")}</p>
            </div>

            {/* Referral Code Display */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-3">
              <p className="text-sm text-muted-foreground text-center uppercase tracking-wider">
                {t("success.referralCodeLabel")}
              </p>
              <p className="text-4xl font-bold text-center text-primary font-mono tracking-wider">
                {referralCode}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleCopyReferralLink} variant="outline" className="flex-1 h-12">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {t("success.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {t("success.copyLink")}
                  </>
                )}
              </Button>
              <Button onClick={handleShare} className="flex-1 h-12 bg-primary hover:bg-primary/90">
                <Share2 className="w-4 h-4 mr-2" />
                {t("success.share")}
              </Button>
            </div>

            {/* Info */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-center text-foreground">
                <strong>{t("success.proTip")}</strong> {t("success.proTipMessage")}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{t("success.checkEmail")}</p>
            <p className="text-sm text-muted-foreground">{t("success.notify")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("form.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            {t("form.subtitle")}{" "}
            <span className="text-primary font-semibold">{t("form.subtitleHighlight")}</span>
          </p>
        </div>

        {/* Referral Notice */}
        {referralParam && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
            <p className="text-sm text-primary font-medium">🎉 {t("form.referred")}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t("form.email")} *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        className="h-12 bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              >
                <LoadingSwap isLoading={isSubmitting}>{t("form.submit")}</LoadingSwap>
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">{t("form.earlyAccess")}</p>
            <button
              onClick={() => setShowLookup(true)}
              className="text-sm text-primary hover:underline font-medium"
            >
              {t("form.alreadyJoined")}
            </button>
          </div>
        </div>

        {/* Lookup Modal */}
        {showLookup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl border border-border p-8 max-w-md w-full shadow-xl">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t("lookup.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("lookup.subtitle")}</p>
                </div>

                <Input
                  type="text"
                  placeholder={t("lookup.placeholder")}
                  value={lookupValue}
                  onChange={e => setLookupValue(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && handleLookup()}
                  className="h-12 bg-background"
                  disabled={isLookingUp}
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLookup(false)}
                    className="flex-1 h-12"
                    disabled={isLookingUp}
                  >
                    {t("lookup.cancel")}
                  </Button>
                  <Button
                    onClick={handleLookup}
                    className="flex-1 h-12 bg-primary hover:bg-primary/90"
                    disabled={isLookingUp}
                  >
                    <LoadingSwap isLoading={isLookingUp}>{t("lookup.submit")}</LoadingSwap>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
