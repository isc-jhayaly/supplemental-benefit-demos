import { useState, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle, FileText, FlaskConical, Info, Loader2, Pill, Shield, Stethoscope } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { usePatient } from "@/context/PatientContext";
import { postToUrl } from "@/lib/utils";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
];

type Phase = "retrieving" | "retrieved" | "error";

const API_BASE = "";

const encounterTypeMap: Record<string, string> = {
  I: "Inpatient",
  O: "Outpatient",
  E: "Emergency",
  S: "Surgical",
  R: "Referral",
};

const RecordRetrieval = () => {
  const navigate = useNavigate();
  const { currentPatient, clinicalData, setClinicalData, returnUrl } = usePatient();
  const [phase, setPhase] = useState<Phase>("retrieving");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (phase !== "retrieving" || !currentPatient) return;

    const fetchRecords = async () => {
      const url = `${API_BASE}/api/patient?firstname=${encodeURIComponent(currentPatient.apiFirstName)}&lastname=${encodeURIComponent(currentPatient.apiLastName)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          let detail = "";
          try { detail = await res.text(); } catch { /* ignore */ }
          throw new Error(
            `Server returned ${res.status} ${res.statusText}${detail ? `: ${detail}` : ""}`
          );
        }
        const data = await res.json();
        setClinicalData(data);
        setPhase("retrieved");
      } catch (err) {
        console.error("Failed to fetch patient records:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        const isNetworkError = message === "Failed to fetch" || message.includes("NetworkError");
        setErrorMsg(
          isNetworkError
            ? `Could not connect to the backend server at ${API_BASE}. Make sure the server is running (cd server && npm run dev).`
            : `Request to ${url} failed — ${message}`
        );
        setPhase("error");
      }
    };

    fetchRecords();
  }, [phase, currentPatient, setClinicalData]);

  const encounters = clinicalData?.encounters ?? [];
  const diagnoses = clinicalData?.diagnoses ?? [];
  const medications = clinicalData?.medications ?? [];
  const allergies = clinicalData?.allergies ?? [];
  const labOrders = clinicalData?.labOrders ?? [];
  const problems = clinicalData?.problems ?? [];
  const procedures = clinicalData?.procedures ?? [];

  const returnToCaller = () => {
    if (!returnUrl || !clinicalData) return;
    postToUrl(returnUrl, clinicalData);
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-4 py-10">
      <StepIndicator steps={steps} currentStep={3} completedSteps={[1, 2]} />

      <div className="mt-8 w-full max-w-2xl space-y-6">
        {/* Identity Verified Box */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Identity Verified</h3>
              <p className="text-sm text-muted-foreground">Your IAL2 token is active and verified</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">IAL2 Authentication Token</h4>
                <p className="text-sm text-muted-foreground">Token ID: IAL2-CLEAR-XEICZSGR7W</p>
                <p className="text-sm text-muted-foreground">Expires: 3/4/2026</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-300 px-3 py-0.5 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>
        </div>

        {/* Retrieving Phase */}
        {phase === "retrieving" && (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
              <div>
                <h3 className="text-base font-bold text-foreground">Retrieving Your Records</h3>
                <p className="text-sm text-muted-foreground">
                  Pulling health records for {currentPatient?.firstName} {currentPatient?.lastName}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Electronic Health Records</h4>
                <p className="text-sm text-muted-foreground">
                  Securely accessing medical history, prescriptions, and health data from connected networks
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Phase */}
        {phase === "error" && (
          <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <h3 className="text-base font-bold text-foreground">Record Retrieval Failed</h3>
                <p className="text-sm text-muted-foreground">{errorMsg}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setPhase("retrieving")}>
              Retry
            </Button>
          </div>
        )}

        {/* Retrieved Phase — show real data summary */}
        {phase === "retrieved" && (
          <>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Records Retrieved Successfully</h3>
                  <p className="text-sm text-muted-foreground">
                    Health records for {currentPatient?.firstName} {currentPatient?.lastName} have been securely accessed
                  </p>
                </div>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <SummaryCard icon={<Stethoscope className="h-4 w-4" />} label="Encounters" count={encounters.length} />
                <SummaryCard icon={<Activity className="h-4 w-4" />} label="Diagnoses" count={diagnoses.length} />
                <SummaryCard icon={<Pill className="h-4 w-4" />} label="Medications" count={medications.length} />
                <SummaryCard icon={<FlaskConical className="h-4 w-4" />} label="Lab Orders" count={labOrders.length} />
              </div>

              {/* Diagnoses list */}
              {diagnoses.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4 mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Diagnoses</h4>
                  <div className="space-y-2">
                    {diagnoses.map((d: { diagnosis?: { description?: string }; diagnosisType?: { description?: string }; encounterNumber?: string }, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Activity className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-foreground">{d.diagnosis?.description ?? "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">
                            {d.diagnosisType?.description ?? ""} — Encounter {d.encounterNumber}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Problems list */}
              {problems.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4 mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Active Problems</h4>
                  <div className="space-y-2">
                    {problems.map((p: { problem?: { description?: string }; status?: string | null }, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-foreground">{p.problem?.description ?? "Unknown"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Encounters list */}
              {encounters.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4 mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Encounters</h4>
                  <div className="space-y-2">
                    {encounters.map((e: { visitDescription?: string; encounterType?: string; healthCareFacility?: { description?: string }; fromTime?: string }, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Stethoscope className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-foreground">{e.visitDescription || (e.encounterType && encounterTypeMap[e.encounterType]) || e.encounterType || "Encounter"}</p>
                          <p className="text-xs text-muted-foreground">
                            {e.healthCareFacility?.description ?? ""}{e.fromTime ? ` — ${new Date(e.fromTime).toLocaleDateString()}` : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergies */}
              {allergies.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4 mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Allergies</h4>
                  <div className="space-y-1">
                    {allergies.map((a: { allergy?: { description?: string }; severity?: { description?: string } }, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="text-foreground">{a.allergy?.description ?? "Unknown"}</span>
                        {a.severity?.description && (
                          <span className="text-xs text-muted-foreground">({a.severity.description})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Procedures */}
              {procedures.length > 0 && (
                <div className="rounded-lg border border-border bg-card p-4 mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Procedures</h4>
                  <div className="space-y-1">
                    {procedures.map((p: { procedure?: { description?: string }; procedureTime?: string }, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-foreground">{p.procedure?.description ?? "Unknown"}</span>
                        {p.procedureTime && (
                          <span className="text-xs text-muted-foreground">{new Date(p.procedureTime).toLocaleDateString()}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="default"
                size="lg"
                className="w-full text-sm font-medium bg-[#009688] text-white hover:bg-[#00796b]"
                onClick={() => {
                  if (returnUrl) {
                    returnToCaller();
                    return;
                  }
                  navigate("/routing-back");
                }}
              >
                Continue to Application
              </Button>
            </div>
          </>
        )}

        {/* Processing / Secure info box */}
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {phase === "retrieving" ? "Processing Your Request" : "Secure & Compliant"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {phase === "retrieving"
                ? "Your records are being retrieved. All data remains encrypted and protected under HIPAA regulations."
                : "All data remains encrypted and protected under HIPAA regulations throughout the entire process."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Small stat card */
const SummaryCard = ({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) => (
  <div className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <div>
      <p className="text-lg font-bold text-foreground">{count}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

export default RecordRetrieval;
