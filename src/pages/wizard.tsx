import { MainLayout } from "@/layout/main-layout";
import { WizardScreen } from "@/screens/wizard";
import { WizardFormProps } from "@/types/wizardTypes";
import { useRouter } from "next/router";

export default function Wizard() {
  const router = useRouter();
  const role = router.query.role || "guest";
  const step = +(router.query.step || 1);
  return (
    <MainLayout title="Wizard Form">
      <WizardScreen role={role as WizardFormProps["role"]} step={step} />
    </MainLayout>
  );
}
