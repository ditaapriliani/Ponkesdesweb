import { useState, useEffect } from 'react';

export interface ScheduleItem {
    day: string;
    date: string;
    time: string;
    service: string;
}

const DEFAULT_SCHEDULE: ScheduleItem[] = [
    { day: "Senin", date: "02 Feb", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Selasa", date: "03 Feb", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + KIA" },
    { day: "Rabu", date: "04 Feb", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Kamis", date: "05 Feb", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Imunisasi" },
    { day: "Jumat", date: "06 Feb", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Posbindu" },
    { day: "Sabtu", date: "07 Feb", time: "08.00 - 12.00 WIB", service: "Pelayanan Umum" },
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
