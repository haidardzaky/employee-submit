import { MainLayout } from "@/layout/main-layout";
import { WizardScreen } from "@/screens/wizard";

export default function Wizard() {
  return (
    <MainLayout title="Wizard Form">
      <WizardScreen />
    </MainLayout>
  );
}
