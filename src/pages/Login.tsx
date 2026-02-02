import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { branding } from "@/config/branding";
import bgImage from "@/assets/header-bg.png";

const Login = () => {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);
    const navigate = useNavigate();

    const handleUserLogin = () => {
        navigate("/beranda");
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "admin123") {
            toast.success("Login Admin Berhasil");
            navigate("/admin");
        } else {
            toast.error("PIN Admin Salah!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover scale-110 blur-md grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] backdrop-saturate-150" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-[400px] md:max-w-md relative z-10 animate-fade-in">
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-card border border-border/50">
                    <div className="text-center mb-8 md:mb-10">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-soft group hover:scale-110 transition-transform duration-300 border-4 border-white">
                            <img
                                src="/logo.jpg"
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1 md:mb-2 text-balance leading-tight">
                            Selamat Datang di <span className="text-gradient font-bold">{branding.name}</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">Silakan pilih akses masuk Anda</p>
                    </div>

                    {!isAdminMode ? (
                        <div className="space-y-4">
                            <Button
                                onClick={handleUserLogin}
                                variant="hero"
                                className="w-full h-14 md:h-16 text-base md:text-lg gap-3 md:gap-4 group"
                            >
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                                Masuk Sebagai Pengguna
                                <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                            </Button>

                            <button
                                onClick={() => setIsAdminMode(true)}
                                className="w-full py-4 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group"
                            >
                                <Lock className="w-4 h-4" />
                                Masuk Sebagai Administrator
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleAdminLogin} className="space-y-6 animate-slide-in-right">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">PIN Administrator</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type={showPin ? "text" : "password"}
                                        placeholder="Masukkan PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        className="pl-12 pr-12 h-12 md:h-14 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPin(!showPin)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors hover:bg-secondary p-1 rounded-lg"
                                    >
                                        {showPin ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAdminMode(false)}
                                    className="flex-1 h-12 rounded-xl"
                                >
                                    Kembali
                                </Button>
                                <Button
                                    type="submit"
                                    variant="hero"
                                    className="flex-[2] h-12 rounded-xl"
                                >
                                    Masuk Admin
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 pt-8 border-t border-border/50 text-center">
                        <p className="text-xs text-muted-foreground">
                            &copy; 2026 KKN 10 Gondowangi - Universitas Merdeka Malang.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
