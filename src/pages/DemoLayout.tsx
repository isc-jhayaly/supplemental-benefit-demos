import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { patients } from "@/data/patients";
import { getDemoScenarioByKey } from "@/data/demoScenarios";
import { usePatient } from "@/context/PatientContext";
import NttHeader from "@/components/NttHeader";

const parseReturnUrl = (value: string | null) => {
  if (!value) return null;
  try {
    return new URL(value, window.location.href).href;
  } catch {
    return null;
  }
};

const DemoLayout = () => {
  const { scenario } = useParams<{ scenario: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentPatient,
    demoScenario,
    returnUrl,
    setCurrentPatient,
    setClinicalData,
    setDemoScenario,
    setReturnUrl,
  } = usePatient();

  useEffect(() => {
    if (!scenario) return;
    const scenarioInfo = getDemoScenarioByKey(scenario);
    if (!scenarioInfo) {
      navigate("/");
      return;
    }

    const patient = patients[scenarioInfo.patientIndex];
    const shouldResetPatient =
      !currentPatient ||
      currentPatient.apiFirstName !== patient.apiFirstName ||
      currentPatient.apiLastName !== patient.apiLastName;

    if (shouldResetPatient) {
      setCurrentPatient(patient);
      setClinicalData(null);
    }

    if (demoScenario !== scenario) {
      setDemoScenario(scenario);
    }

    const maybeReturnUrl = searchParams.get("returnUrl");
    const parsedReturnUrl = parseReturnUrl(maybeReturnUrl);
    if (parsedReturnUrl && parsedReturnUrl !== returnUrl) {
      setReturnUrl(parsedReturnUrl);
    }

    const currentPath = window.location.pathname;
    const shouldRedirectToConsent =
      currentPath === `/demo/${scenario}` ||
      currentPath === `/loveable/demo/${scenario}`;

    if (shouldRedirectToConsent) {
      navigate("consent", { replace: true });
    }
  }, [scenario, searchParams, currentPatient, demoScenario, returnUrl, navigate, setCurrentPatient, setClinicalData, setDemoScenario, setReturnUrl]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <NttHeader />
      <Outlet />
    </div>
  );
};

export default DemoLayout;
