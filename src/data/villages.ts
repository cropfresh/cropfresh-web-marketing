/**
 * Village/District data for Karnataka (MVP focus)
 * Used in farmer callback form
 */

export interface Village {
    id: string;
    name: string;
    nameKn: string; // Kannada name
    district: string;
}

export const villages: Village[] = [
    // Kolar District
    { id: "kolar-kolar", name: "Kolar", nameKn: "ಕೋಲಾರ", district: "Kolar" },
    { id: "kolar-bangarpet", name: "Bangarpet", nameKn: "ಬಂಗಾರಪೇಟೆ", district: "Kolar" },
    { id: "kolar-kgf", name: "KGF", nameKn: "ಕೆಜಿಎಫ್", district: "Kolar" },
    { id: "kolar-mulbagal", name: "Mulbagal", nameKn: "ಮುಳಬಾಗಿಲು", district: "Kolar" },
    { id: "kolar-srinivaspur", name: "Srinivaspur", nameKn: "ಶ್ರೀನಿವಾಸಪುರ", district: "Kolar" },

    // Chickballapur District
    { id: "chk-chickballapur", name: "Chickballapur", nameKn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", district: "Chickballapur" },
    { id: "chk-chintamani", name: "Chintamani", nameKn: "ಚಿಂತಾಮಣಿ", district: "Chickballapur" },
    { id: "chk-gauribidanur", name: "Gauribidanur", nameKn: "ಗೌರಿಬಿದನೂರು", district: "Chickballapur" },
    { id: "chk-sidlaghatta", name: "Sidlaghatta", nameKn: "ಸಿದ್ಲಘಟ್ಟ", district: "Chickballapur" },

    // Tumkur District
    { id: "tmk-tumkur", name: "Tumkur", nameKn: "ತುಮಕೂರು", district: "Tumkur" },
    { id: "tmk-tiptur", name: "Tiptur", nameKn: "ತಿಪಟೂರು", district: "Tumkur" },
    { id: "tmk-sira", name: "Sira", nameKn: "ಸಿರಾ", district: "Tumkur" },
    { id: "tmk-madhugiri", name: "Madhugiri", nameKn: "ಮಧುಗಿರಿ", district: "Tumkur" },

    // Bangalore Rural District
    { id: "blr-devanahalli", name: "Devanahalli", nameKn: "ದೇವನಹಳ್ಳಿ", district: "Bangalore Rural" },
    { id: "blr-doddaballapur", name: "Doddaballapur", nameKn: "ದೊಡ್ಡಬಳ್ಳಾಪುರ", district: "Bangalore Rural" },
    { id: "blr-hosakote", name: "Hosakote", nameKn: "ಹೊಸಕೋಟೆ", district: "Bangalore Rural" },
    { id: "blr-nelamangala", name: "Nelamangala", nameKn: "ನೆಲಮಂಗಲ", district: "Bangalore Rural" },

    // Ramanagara District
    { id: "rmn-ramanagara", name: "Ramanagara", nameKn: "ರಾಮನಗರ", district: "Ramanagara" },
    { id: "rmn-magadi", name: "Magadi", nameKn: "ಮಾಗಡಿ", district: "Ramanagara" },
    { id: "rmn-channapatna", name: "Channapatna", nameKn: "ಚನ್ನಪಟ್ಟಣ", district: "Ramanagara" },
    { id: "rmn-kanakapura", name: "Kanakapura", nameKn: "ಕನಕಪುರ", district: "Ramanagara" },

    // Mandya District
    { id: "mnd-mandya", name: "Mandya", nameKn: "ಮಂಡ್ಯ", district: "Mandya" },
    { id: "mnd-maddur", name: "Maddur", nameKn: "ಮದ್ದೂರು", district: "Mandya" },
    { id: "mnd-malavalli", name: "Malavalli", nameKn: "ಮಳವಳ್ಳಿ", district: "Mandya" },
    { id: "mnd-srirangapatna", name: "Srirangapatna", nameKn: "ಶ್ರೀರಂಗಪಟ್ಟಣ", district: "Mandya" },

    // Mysuru District
    { id: "mys-mysuru", name: "Mysuru", nameKn: "ಮೈಸೂರು", district: "Mysuru" },
    { id: "mys-nanjangud", name: "Nanjangud", nameKn: "ನಂಜನಗೂಡು", district: "Mysuru" },
    { id: "mys-hunsur", name: "Hunsur", nameKn: "ಹುಣಸೂರು", district: "Mysuru" },
    { id: "mys-tn-narsipur", name: "T. Narasipur", nameKn: "ತಿ. ನರಸೀಪುರ", district: "Mysuru" },

    // Hassan District
    { id: "hss-hassan", name: "Hassan", nameKn: "ಹಾಸನ", district: "Hassan" },
    { id: "hss-arsikere", name: "Arsikere", nameKn: "ಅರಸೀಕೆರೆ", district: "Hassan" },
    { id: "hss-channarayapatna", name: "Channarayapatna", nameKn: "ಚನ್ನರಾಯಪಟ್ಟಣ", district: "Hassan" },
    { id: "hss-belur", name: "Belur", nameKn: "ಬೇಲೂರು", district: "Hassan" },

    // Chitradurga District
    { id: "ctd-chitradurga", name: "Chitradurga", nameKn: "ಚಿತ್ರದುರ್ಗ", district: "Chitradurga" },
    { id: "ctd-davangere", name: "Davangere", nameKn: "ದಾವಣಗೆರೆ", district: "Chitradurga" },
    { id: "ctd-challakere", name: "Challakere", nameKn: "ಚಳ್ಳಕೆರೆ", district: "Chitradurga" },

    // Other option for flexibility
    { id: "other", name: "Other", nameKn: "ಇತರೆ", district: "Other" },
];

// Get villages grouped by district for dropdown
export function getVillagesByDistrict(): Record<string, Village[]> {
    return villages.reduce((acc, village) => {
        if (!acc[village.district]) {
            acc[village.district] = [];
        }
        acc[village.district].push(village);
        return acc;
    }, {} as Record<string, Village[]>);
}

// Get all unique districts
export function getDistricts(): string[] {
    return [...new Set(villages.map((v) => v.district))];
}
