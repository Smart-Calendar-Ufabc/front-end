"use client";

import OnboardingLayout from "../../components/layout/OnboardingLayout";
import PageUnderConstruction from "../../components/PageUnderConstructionAlert";

export default function SignUp() {
  return (
    <OnboardingLayout>
      <PageUnderConstruction title="Cadastro" />
    </OnboardingLayout>
  );
}
