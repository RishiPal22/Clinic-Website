import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/components/SupabaseClient";

export default function SignOut({ mobile, onClick }) {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const confirmed = window.confirm("Are you sure you want to sign out?");
        if (!confirmed) return;

        await supabase.auth.signOut();
        navigate("/signin");
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleSignOut}
            title="Sign Out"
            className={`flex items-center gap-2 px-3 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition ${mobile ? "w-full justify-center" : ""
                }`}
        >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Sign Out</span>
            {mobile && <span className="md:hidden">Sign Out</span>}

        </button>
    );
}