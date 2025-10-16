"use client";

import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from "@/lib/o-auth-providers";
import { authClient } from "@/lib/auth-client";
import BetterAuthActionButton from "./auth/better-auth-action-button";


const SocialAuthButtons = () => {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].Icon;

    return (
      <BetterAuthActionButton
        key={provider}
        variant="outline"
        action={() => {return authClient.signIn.social({ provider, callbackURL: "/" })}}
      >
        <Icon />
        Continue with {SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
      </BetterAuthActionButton>
    );
  });
};

export default SocialAuthButtons;
