import { useState, useEffect } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { id } from 'date-fns/locale';

export interface ScheduleItem {
    day: string;
    date: string;
    time: string;
    service: string;
}

const getToday = () => new Date();
const monday = startOfWeek(getToday(), { weekStartsOn: 1 });

const DEFAULT_SCHEDULE: ScheduleItem[] = [
    { day: "Senin", date: format(monday, "dd MMM", { locale: id }), time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Selasa", date: format(addDays(monday, 1), "dd MMM", { locale: id }), time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + KIA" },
    { day: "Rabu", date: format(addDays(monday, 2), "dd MMM", { locale: id }), time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Kamis", date: format(addDays(monday, 3), "dd MMM", { locale: id }), time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Imunisasi" },
    { day: "Jumat", date: format(addDays(monday, 4), "dd MMM", { locale: id }), time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Posbindu" },
    { day: "Sabtu", date: format(addDays(monday, 5), "dd MMM", { locale: id }), time: "08.00 - 12.00 WIB", service: "Pelayanan Umum" },
    { day: "Minggu", date: "-", time: "Tutup", service: "-" },
];

export const useSchedule = () => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
        const saved = localStorage.getItem('ponkesdes_schedule');
        return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    });

    const updateSchedule = (newSchedule: ScheduleItem[]) => {
        setSchedule(newSchedule);
        localStorage.setItem('ponkesdes_schedule', JSON.stringify(newSchedule));
    };

    return { schedule, updateSchedule };
};
