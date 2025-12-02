import { MainLayout } from "@/layout/main-layout";
import { WizardScreen } from "@/screens/wizard";
import { useRouter } from "next/router";

export default function Wizard() {
  const router = useRouter();
  const role = (router.query.role as string) || "guest";
  return (
    <MainLayout title="Wizard Form">
      <WizardScreen role={role} />
    </MainLayout>
  );
}
