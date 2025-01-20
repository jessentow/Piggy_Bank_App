import { useAuth } from "./AuthProvider";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User } from "lucide-react";

export const Header = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
  };

  return (
    <header className="border-b">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        {user && (
          <div className="flex items-center gap-4">
            {location.pathname === "/profile" ? (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};