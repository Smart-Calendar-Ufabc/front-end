"use client";

import OnboardingLayout from "../components/layout/OnboardingLayout";
import PageUnderConstruction from "../components/PageUnderConstructionAlert";

export default function Login() {
  return (
    <OnboardingLayout>
      <PageUnderConstruction title="Entrar" />
    </OnboardingLayout>
  );
}
