import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type User = { id?: string; _id?: string; name: string; email: string; phone?: string };

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const raw = localStorage.getItem("currentUser");
      if (!raw) {
        navigate("/login");
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || (!parsed.id && !parsed._id)) {
        navigate("/login");
        return;
      }
      setUser(parsed);
      if (parsed && parsed.email) {
        const API = import.meta.env.VITE_API_URL || "";
        fetch(`${API}/api/users`)
          .then((res) => (res.ok ? res.json() : Promise.reject()))
          .then((data) => {
            const list = Array.isArray(data?.users) ? data.users : [];
            const found = list.find(
              (u: any) => (u.email || "").toLowerCase() === parsed.email.toLowerCase()
            );
            if (found) {
              localStorage.setItem("currentUser", JSON.stringify(found));
              setUser(found);
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const deleteProfile = async () => {
    if (!user) return;
    const id = user._id || user.id;
    if (!id) {
      toast.error("Can't delete: missing user id. Try logging out and logging back in.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete your profile? This cannot be undone.")) return;
    try {
      setDeleting(true);
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/users/${id}`, { method: "DELETE" });
      let msg = "Deleted";
      try {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to delete profile");
        msg = data?.message || msg;
      } catch (e: any) {
        if (!res.ok) throw e || new Error("Failed to delete profile");
      }
      toast.success("Profile deleted successfully");
      logout();
    } catch (e) {
      toast.error((e as any)?.message || "Failed to delete profile");
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
                {user.phone && (
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{user.phone}</div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={logout}>Logout</Button>
                  <Button variant="destructive" onClick={deleteProfile} disabled={deleting}>
                    {deleting ? "Deleting..." : "Delete Profile"}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No user info found.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
