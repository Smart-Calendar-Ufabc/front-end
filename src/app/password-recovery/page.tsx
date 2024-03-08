"use client";

import OnboardingLayout from "@/components/layout/OnboardingLayout";
import PageUnderConstruction from "@/components/PageUnderConstructionAlert";

export default function PasswordRecovery() {
  return (
    <OnboardingLayout>
      <PageUnderConstruction title="Recuperar Conta" />
    </OnboardingLayout>
  );
}
