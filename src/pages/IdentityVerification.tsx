import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CheckCircle, Loader2, Smartphone } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
  { number: 4, label: "Application" },
];

type VerificationPhase =
  | "intro"
  | "selfie"
  | "photo-captured"
  | "id-scan"
  | "verifying"
  | "verified";

const IdentityVerification = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<VerificationPhase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // Camera not available — continue with placeholder
    }
  }, []);

  useEffect(() => {
    if (phase === "selfie") {
      startCamera();
    }
    return () => {
      if (phase === "selfie") stopCamera();
    };
  }, [phase, startCamera, stopCamera]);

  // Auto-advance from photo-captured → id-scan after 2s
  useEffect(() => {
    if (phase === "photo-captured") {
      const t = setTimeout(() => setPhase("id-scan"), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-advance from id-scan → verifying after 3.5s
  useEffect(() => {
    if (phase === "id-scan") {
      const t = setTimeout(() => setPhase("verifying"), 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-advance from verifying → verified after 5s
  useEffect(() => {
    if (phase === "verifying") {
      const t = setTimeout(() => setPhase("verified"), 5000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth || 480;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedPhoto(canvas.toDataURL("image/jpeg"));
      }
    }
    stopCamera();
    setPhase("photo-captured");
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <AppHeader />
      <StepIndicator steps={steps} currentStep={2} completedSteps={[1]} />

      <div className="mt-8 w-full max-w-2xl rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
        {/* CLEAR Header */}
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <CheckCircle className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-base font-bold text-foreground">
              CLEAR Identity Verification
            </h2>
            <p className="text-sm text-muted-foreground">
              IAL2 compliant identity authentication
            </p>
          </div>
        </div>

        {/* INTRO PHASE */}
        {phase === "intro" && <IntroContent onVerify={() => setPhase("selfie")} />}

        {/* SELFIE PHASE */}
        {phase === "selfie" && (
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl border-[3px] border-primary bg-muted overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <h3 className="text-lg font-bold text-foreground">
              Position Your Face
            </h3>
            <p className="text-sm text-muted-foreground -mt-4">
              Center your face in the frame
            </p>
            <Button
              variant="default"
              size="lg"
              className="text-sm font-medium"
              onClick={capturePhoto}
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture Photo
            </Button>
          </div>
        )}

        {/* PHOTO CAPTURED PHASE */}
        {phase === "photo-captured" && (
          <div className="flex flex-col items-center gap-6 py-8">
            {capturedPhoto && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                <img
                  src={capturedPhoto}
                  alt="Captured selfie"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-bold text-foreground">
              Photo Captured!
            </h3>
            <p className="text-sm text-muted-foreground -mt-4">
              Processing your image...
            </p>
            <div className="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* ID SCAN PHASE */}
        {phase === "id-scan" && (
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="w-full max-w-lg rounded-xl border-[3px] border-primary bg-accent/40 p-6">
              {/* Driver License Card */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-primary tracking-wide">
                    STATE OF CT
                  </p>
                  <h3 className="text-xl font-bold text-foreground">
                    DRIVER LICENSE
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-primary">DL</p>
                  <p className="text-sm font-semibold text-foreground">
                    D1234567
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                {/* Photo */}
                <div className="w-28 h-36 rounded border border-border bg-muted/60 overflow-hidden shrink-0">
                  {capturedPhoto ? (
                    <img
                      src={capturedPhoto}
                      alt="License photo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                      Photo
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-semibold text-foreground">LN SMITH</p>
                  <p className="font-semibold text-foreground">FN JOHN</p>
                  <p className="text-primary">
                    <span className="font-semibold">DOB:</span>{" "}
                    <span className="text-foreground">01/15/1975</span>
                  </p>
                  <p className="text-primary">
                    <span className="font-semibold">EXP:</span>{" "}
                    <span className="text-foreground">01/15/2028</span>
                  </p>
                  <p className="text-primary">
                    <span className="font-semibold">ISS:</span>{" "}
                    <span className="text-foreground">01/15/2024</span>
                  </p>
                  <div className="mt-1 text-muted-foreground text-xs">
                    <p>2936 State Avenue</p>
                    <p>Manchester, CT 06040</p>
                  </div>
                </div>
              </div>

              <hr className="my-3 border-border" />

              <div className="flex items-end justify-between text-xs">
                <div className="flex gap-8">
                  <div>
                    <p className="text-primary font-semibold">SEX: <span className="text-foreground">M</span></p>
                    <p className="text-primary font-semibold">HGT: <span className="text-foreground">5'-10"</span></p>
                  </div>
                  <div>
                    <p className="text-primary font-semibold">EYES: <span className="text-foreground">BRN</span></p>
                    <p className="text-primary font-semibold">WGT: <span className="text-foreground">170 lb</span></p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded border border-border bg-card flex items-center justify-center text-[10px] text-muted-foreground">
                  QR
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground">Scanning ID...</h3>
            <p className="text-sm text-muted-foreground -mt-4">
              Verifying document authenticity
            </p>
          </div>
        )}

        {/* VERIFYING PHASE */}
        {phase === "verifying" && (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground">Verifying Your Identity</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Please wait while we verify your documents...
              </p>
            </div>
            <div className="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* VERIFIED PHASE */}
        {phase === "verified" && (
          <div className="flex flex-col items-center gap-6 py-8">
            {/* Large green checkmark */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-12 w-12 text-emerald-500" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground">
                Identity Verified!
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your IAL2 token has been generated
              </p>
            </div>

            {/* Verification Complete box */}
            <div className="w-full rounded-lg border border-emerald-300 bg-emerald-50 p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Verification Complete
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Your identity has been authenticated to IAL2 standards. You now
                  have secure access to your health records.
                </p>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full text-sm font-medium bg-emerald-500 hover:bg-emerald-600"
              onClick={() => navigate("/record-retrieval")}
            >
              Continue Application
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/* Sub-component for intro phase */
const IntroContent = ({ onVerify }: { onVerify: () => void }) => (
  <>
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
        <Camera className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Step 1: Take a Selfie
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll capture a photo to verify your identity
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
        <CheckCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Step 2: Scan Your ID
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Scan a government-issued photo ID (driver's license or passport)
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
        <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-500" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Step 3: Verification
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll verify your identity and generate your IAL2 token
          </p>
        </div>
      </div>
    </div>

    <Button
      variant="default"
      size="lg"
      className="mt-6 w-full text-sm font-medium"
      onClick={onVerify}
    >
      <Camera className="mr-2 h-4 w-4" />
      Verify on This Device
    </Button>
    <Button
      variant="outline"
      size="lg"
      className="mt-3 w-full text-sm font-medium"
    >
      <Smartphone className="mr-2 h-4 w-4" />
      Verify on Your Phone
    </Button>
  </>
);

export default IdentityVerification;
