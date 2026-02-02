import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Save, ArrowLeft, LogOut, Info, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSchedule, ScheduleItem } from "@/hooks/useSchedule";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Admin = () => {
    const { schedule, updateSchedule } = useSchedule();
    const [localSchedule, setLocalSchedule] = useState<ScheduleItem[]>(schedule);
    const navigate = useNavigate();

    const parseTime = (timeStr: string) => {
        if (timeStr === "Tutup") return { open: "08:00", close: "16:00", isClosed: true };
        const match = timeStr.match(/(\d{2})[.:](\d{2})\s*-\s*(\d{2})[.:](\d{2})/);
        if (match) {
            return {
                open: `${match[1]}:${match[2]}`,
                close: `${match[3]}:${match[4]}`,
                isClosed: false
            };
        }
        return { open: "08:00", close: "16:00", isClosed: false };
    };

    const formatTime = (open: string, close: string, isClosed: boolean) => {
        if (isClosed) return "Tutup";
        const openFormatted = open.replace(':', '.');
        const closeFormatted = close.replace(':', '.');
        return `${openFormatted} - ${closeFormatted} WIB`;
    };

    const handleInputChange = (index: number, field: keyof ScheduleItem, value: string) => {
        const next = [...localSchedule];
        next[index] = { ...next[index], [field]: value };
        setLocalSchedule(next);
    };

    const handleTimeChange = (index: number, type: 'open' | 'close' | 'toggle', value?: string | boolean) => {
        const item = localSchedule[index];
        const { open, close, isClosed } = parseTime(item.time);

        let newOpen = open;
        let newClose = close;
        let newIsClosed = isClosed;

        if (type === 'open') newOpen = value as string;
        if (type === 'close') newClose = value as string;
        if (type === 'toggle') newIsClosed = value as boolean;

        const newTimeStr = formatTime(newOpen, newClose, newIsClosed);
        handleInputChange(index, 'time', newTimeStr);
    };

    const handleSave = () => {
        updateSchedule(localSchedule);
        toast.success("Jadwal Berhasil Diperbarui");
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-secondary/30 pt-20 pb-12">
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
                        <p className="text-muted-foreground">Kelola jadwal pelayanan Ponkesdes</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate("/beranda")} className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Lihat Beranda
                        </Button>
                        <Button variant="destructive" onClick={handleLogout} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex items-start gap-4">
                    <Info className="w-6 h-6 text-primary mt-1" />
                    <p className="text-sm text-[hsl(0,66%,32%)] leading-relaxed font-medium">
                        Perubahan yang Anda lakukan di halaman ini akan langsung terlihat oleh seluruh pengguna di halaman Kontak.
                        Pastikan data yang dimasukkan sudah benar sebelum menekan tombol Simpan.
                    </p>
                </div>

                {/* Schedule Editor Card */}
                <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-border/50 bg-card/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h2 className="text-xl font-bold">Edit Jadwal Pelayanan</h2>
                        </div>
                        <Button onClick={handleSave} variant="hero" className="gap-2">
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </Button>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="hidden lg:grid grid-cols-12 gap-6 mb-4 px-4 text-sm font-bold text-muted-foreground">
                            <div className="col-span-1">HARI</div>
                            <div className="col-span-2">TANGGAL</div>
                            <div className="col-span-5">JAM OPERASIONAL</div>
                            <div className="col-span-4">JENIS LAYANAN</div>
                        </div>

                        <div className="space-y-4 lg:space-y-3">
                            {localSchedule.map((item, index) => {
                                const { open, close, isClosed } = parseTime(item.time);
                                return (
                                    <div
                                        key={index}
                                        className="grid lg:grid-cols-12 gap-4 lg:gap-6 p-4 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors border border-transparent hover:border-primary/10 items-center"
                                    >
                                        <div className="col-span-1 flex items-center font-bold text-foreground">
                                            {item.day}
                                        </div>
                                        <div className="col-span-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-background border-border h-10 px-3 py-2",
                                                            !item.date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {item.date && item.date !== "-" ? item.date : <span>Pilih Tanggal</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                handleInputChange(index, 'date', format(date, "dd MMM", { locale: id }));
                                                            }
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background/50 p-2 rounded-lg border border-border/50">
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    id={`closed-${index}`}
                                                    checked={!isClosed}
                                                    onCheckedChange={(checked) => handleTimeChange(index, 'toggle', !checked)}
                                                />
                                                <Label htmlFor={`closed-${index}`} className="cursor-pointer whitespace-nowrap">
                                                    {isClosed ? "Tutup" : "Buka"}
                                                </Label>
                                            </div>

                                            <div className={cn("flex items-center gap-2 transition-opacity", isClosed ? "opacity-30 pointer-events-none" : "opacity-100")}>
                                                <Input
                                                    type="time"
                                                    value={open}
                                                    onChange={(e) => handleTimeChange(index, 'open', e.target.value)}
                                                    className="w-24 h-9 p-2 bg-background border-border"
                                                />
                                                <span className="text-muted-foreground">-</span>
                                                <Input
                                                    type="time"
                                                    value={close}
                                                    onChange={(e) => handleTimeChange(index, 'close', e.target.value)}
                                                    className="w-24 h-9 p-2 bg-background border-border"
                                                />
                                                <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">WIB</span>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <Input
                                                value={item.service}
                                                onChange={(e) => handleInputChange(index, 'service', e.target.value)}
                                                placeholder="Contoh: Pelayanan Umum"
                                                className="bg-background border-border"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button onClick={handleSave} variant="hero" size="lg" className="w-full sm:w-auto gap-2">
                                <Save className="w-5 h-5" />
                                Simpan Semua Perubahan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
