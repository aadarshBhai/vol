import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.message || "Failed to send reset link");
        return;
      }
      setIsSubmitted(true);
      toast.success(data?.message || "Password reset link sent to your email!");
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <Plane className="h-8 w-8" />
            <span>Volvoro</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Forgot Password?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted 
              ? "Check your email for reset instructions" 
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!isSubmitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <p className="mb-4 text-sm text-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your email and follow the instructions to reset your password.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Link to="/login">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Go to Login
                </Button>
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full text-sm text-muted-foreground hover:text-primary"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          </>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
