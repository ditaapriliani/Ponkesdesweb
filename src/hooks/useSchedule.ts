import { useState, useEffect } from 'react';
import { JSONBIN_CONFIG } from '@/config/jsonbin';

export interface ScheduleItem {
    day: string;
    time: string;
    service: string;
}

const DEFAULT_SCHEDULE: ScheduleItem[] = [
    { day: "Senin", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Selasa", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + KIA" },
    { day: "Rabu", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum" },
    { day: "Kamis", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Imunisasi" },
    { day: "Jumat", time: "08.00 - 16.00 WIB", service: "Pelayanan Umum + Posbindu" },
    { day: "Sabtu", time: "08.00 - 12.00 WIB", service: "Pelayanan Umum" },
    { day: "Minggu", time: "Tutup", service: "-" },
];


export const useSchedule = () => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
        const saved = localStorage.getItem('ponkesdes_schedule');
        return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            if (JSONBIN_CONFIG.BIN_ID === 'REPLACE_WITH_YOUR_BIN_ID') return;

            try {
                const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}/latest`, {
                    headers: {
                        'X-Master-Key': JSONBIN_CONFIG.API_KEY
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.record && Array.isArray(data.record)) {
                        setSchedule(data.record);
                        localStorage.setItem('ponkesdes_schedule', JSON.stringify(data.record));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch schedule from JSONbin:", error);
            }
        };

        fetchSchedule();
    }, []);

    const updateSchedule = (newSchedule: ScheduleItem[]) => {
        setSchedule(newSchedule);
        localStorage.setItem('ponkesdes_schedule', JSON.stringify(newSchedule));
    };

    return { schedule, updateSchedule };
};
