import React, { useState, useEffect } from 'react';
import PageHeroBanner from '../components/PageHeroBanner';
import { getAssetPath } from '../utils/assets';

// Official Student Results Data (IELTS, SAT, Cambridge A-Level & AS-Level 2024-2026)
const studentResults = [
    // ==========================================
    // IELTS CERTIFICATES
    // ==========================================
    { id: 1, name: "Choriyeva Hurzoda", type: "IELTS", score: "8.0", year: "2026" },
    { id: 2, name: "Xudoyberdiyev Firdavs", type: "IELTS", score: "7.5", year: "2026" },
    { id: 3, name: "Abdusattorov Asrorbek", type: "IELTS", score: "7.0", year: "2026" },
    { id: 4, name: "Avazov Ismoil", type: "IELTS", score: "7.0", year: "2026" },
    { id: 5, name: "Baxromova Maxfuza", type: "IELTS", score: "7.0", year: "2026" },
    { id: 6, name: "Barotova Shakhrizoda", type: "IELTS", score: "7.0", year: "2026" },
    { id: 7, name: "Boboquov Sardor", type: "IELTS", score: "7.0", year: "2026" },
    { id: 8, name: "Choriyev Suhrob", type: "IELTS", score: "7.0", year: "2025" },
    { id: 9, name: "Eshqobilova Moxichexra", type: "IELTS", score: "7.0", year: "2025" },
    { id: 10, name: "Izzatullayev Muhibullo", type: "IELTS", score: "7.0", year: "2025" },
    { id: 11, name: "Jumayev Zuxriddin", type: "IELTS", score: "7.0", year: "2025" },
    { id: 12, name: "Xoliyarov Javohir", type: "IELTS", score: "7.0", year: "2025" },
    { id: 13, name: "Kholmirzaev Sanjar", type: "IELTS", score: "7.0", year: "2025" },
    { id: 14, name: "Khujanov Shohjahon", type: "IELTS", score: "7.0", year: "2025" },
    { id: 15, name: "Khurramov Asliddin", type: "IELTS", score: "7.0", year: "2024" },
    { id: 16, name: "Kucharov Muhammad", type: "IELTS", score: "7.0", year: "2024" },
    { id: 17, name: "Norboyev Nurbek", type: "IELTS", score: "7.0", year: "2024" },
    { id: 18, name: "Toshmuratov Alibek", type: "IELTS", score: "7.0", year: "2024" },
    { id: 19, name: "Madiyev Sardor", type: "IELTS", score: "6.5", year: "2024" },
    { id: 20, name: "Qarshiyev Jasur", type: "IELTS", score: "6.5", year: "2024" },
    { id: 21, name: "Tursunpo'latov Odilbek", type: "IELTS", score: "6.5", year: "2024" },
    { id: 22, name: "Norqobilova Yulduz", type: "IELTS", score: "6.0", year: "2024" },

    // ==========================================
    // SAT CERTIFICATES
    // ==========================================
    { id: 23, name: "Tursunpo'latov Odilbek", type: "SAT", score: "1480", year: "2026", file: "/images/Tursunpo'latov odilbek 1480.pdf" },
    { id: 24, name: "Choriyev Suhrob", type: "SAT", score: "1470", year: "2026", file: "/images/Choriev Suhrob SAT (1470).pdf" },
    { id: 25, name: "Choriyeva Hurzoda", type: "SAT", score: "1440", year: "2026", file: "/images/Choriyeva Hurzoda 1440.pdf" },
    { id: 26, name: "Boboquov Sardor", type: "SAT", score: "1440", year: "2026", file: "/images/Sardorbek Boboqulov 1440.pdf" },
    { id: 27, name: "Khujanov Shohjahon", type: "SAT", score: "1420", year: "2026", file: "/images/Xo'janov Shohjahon 1420.pdf" },
    { id: 28, name: "Kholmirzaev Sanjar", type: "SAT", score: "1370", year: "2025", file: "/images/Kholmirzaev Sanjar 1370.pdf" },
    { id: 29, name: "Madiyev Sardor", type: "SAT", score: "1370", year: "2025", file: "/images/Madiyev Sardor 1370.pdf" },
    { id: 30, name: "Xudoyberdiyev Firdavs", type: "SAT", score: "1360", year: "2025", file: "/images/Firdavs Xudoyberdiyev 1360.pdf" },
    { id: 31, name: "Khurramov Asliddin", type: "SAT", score: "1360", year: "2025", file: "/images/Khurramov Asliddin 1360.pdf" },
    { id: 32, name: "Jumayev Zuxriddin", type: "SAT", score: "1330", year: "2025", file: "/images/Jumaev Zukhriddin_SAT_1330.pdf" },
    { id: 33, name: "Norboyev Nurbek", type: "SAT", score: "1310", year: "2025", file: "/images/Norboyev Nurbek 1310.pdf" },
    { id: 34, name: "Baxromova Maxfuza", type: "SAT", score: "1300", year: "2025", file: "/images/Baxromova Maxfuza 1300.pdf" },
    { id: 35, name: "Toshmuratov Alibek", type: "SAT", score: "1300", year: "2025", file: "/images/Toshmuratov Alibek 1300.pdf" },
    { id: 36, name: "Avazov Ismoil", type: "SAT", score: "1290", year: "2024", file: "/images/Avazov Ismoil 1290.pdf" },
    { id: 37, name: "Xoliyarov Javohir", type: "SAT", score: "1290", year: "2024", file: "/images/Javohir Xoliyarov- SAT 1290.pdf" },
    { id: 38, name: "Barotova Shakhrizoda", type: "SAT", score: "1280", year: "2024", file: "/images/Barotova Shakhrizoda. 1280.pdf" },
    { id: 39, name: "Kucharov Muhammad", type: "SAT", score: "1280", year: "2024", file: "/images/Ko'charov Muhammad 1280.pdf" },
    { id: 40, name: "Qarshiyev Jasur", type: "SAT", score: "1260", year: "2024", file: "/images/Qarshiyev Jasur 1260.pdf" },
    { id: 41, name: "Abdusattorov Asrorbek", type: "SAT", score: "1240", year: "2024", file: "/images/Asrorbek Abdusattorov 1240.pdf" },
    { id: 42, name: "Izzatullayev Muhibullo", type: "SAT", score: "1240", year: "2024", file: "/images/Izzatullayev Muhibullo 1240.pdf" },
    { id: 43, name: "Eshqobilova Moxichexra", type: "SAT", score: "1200", year: "2024", file: "/images/Eshqobilova Moxichexra SAT 1200.pdf" },
    { id: 44, name: "Norqobilova Yulduz", type: "SAT", score: "1020", year: "2024", file: "/images/Norqobilova Yulduz SAT 1020.pdf" },

    // ==========================================
    // CAMBRIDGE A LEVEL RESULTS (11-SINF - 1-RASM)
    // ==========================================
    { id: 101, name: "Avazov Ismoil", type: "A-Level", subject: "Chemistry", score: "A", year: "2026" },
    { id: 102, name: "Avazov Ismoil", type: "A-Level", subject: "Math", score: "A", year: "2026" },
    { id: 103, name: "Avazov Ismoil", type: "A-Level", subject: "Physics", score: "B", year: "2026" },
    
    { id: 104, name: "Choriev Suhrob", type: "A-Level", subject: "Computer Science", score: "B", year: "2026" },
    { id: 105, name: "Choriev Suhrob", type: "A-Level", subject: "Math", score: "A", year: "2026" },
    { id: 106, name: "Choriev Suhrob", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 107, name: "Chorieva Hurzoda", type: "A-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 108, name: "Chorieva Hurzoda", type: "A-Level", subject: "Chemistry", score: "C", year: "2026" },
    { id: 109, name: "Chorieva Hurzoda", type: "A-Level", subject: "Math", score: "B", year: "2026" },

    { id: 110, name: "Eshkobilova Mokhichekhra", type: "A-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 111, name: "Eshkobilova Mokhichekhra", type: "A-Level", subject: "Chemistry", score: "B", year: "2026" },
    { id: 112, name: "Eshkobilova Mokhichekhra", type: "A-Level", subject: "Math", score: "A", year: "2026" },

    { id: 113, name: "Izzatullaev Muhibullo", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 114, name: "Izzatullaev Muhibullo", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 115, name: "Izzatullaev Muhibullo", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 116, name: "Kucharov Muhammad", type: "A-Level", subject: "Computer Science", score: "D", year: "2026" },
    { id: 117, name: "Kucharov Muhammad", type: "A-Level", subject: "Math", score: "C", year: "2026" },
    { id: 118, name: "Kucharov Muhammad", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 119, name: "Norboev Nurbek", type: "A-Level", subject: "Computer Science", score: "D", year: "2026" },
    { id: 120, name: "Norboev Nurbek", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 121, name: "Norboev Nurbek", type: "A-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 122, name: "Karshiev Jasurbek", type: "A-Level", subject: "Computer Science", score: "D", year: "2026" },
    { id: 123, name: "Karshiev Jasurbek", type: "A-Level", subject: "Math", score: "A", year: "2026" },
    { id: 124, name: "Karshiev Jasurbek", type: "A-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 125, name: "Tursunpulatov Odilbek", type: "A-Level", subject: "Biology", score: "A", year: "2026" },
    { id: 126, name: "Tursunpulatov Odilbek", type: "A-Level", subject: "Chemistry", score: "A", year: "2026" },
    { id: 127, name: "Tursunpulatov Odilbek", type: "A-Level", subject: "Math", score: "A*", year: "2026" },

    { id: 128, name: "Kholmirzaev Sanjar", type: "A-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 129, name: "Kholmirzaev Sanjar", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 130, name: "Kholmirzaev Sanjar", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 131, name: "Abdusattorov Asrorbek", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 132, name: "Abdusattorov Asrorbek", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 133, name: "Abdusattorov Asrorbek", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 134, name: "Bakhromova Makhfuza", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 135, name: "Bakhromova Makhfuza", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 136, name: "Bakhromova Makhfuza", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 137, name: "Barotova Shakhrizoda", type: "A-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 138, name: "Barotova Shakhrizoda", type: "A-Level", subject: "Chemistry", score: "C", year: "2026" },
    { id: 139, name: "Barotova Shakhrizoda", type: "A-Level", subject: "Math", score: "A", year: "2026" },

    { id: 140, name: "Bobokulov Sardorbek", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 141, name: "Bobokulov Sardorbek", type: "A-Level", subject: "Math", score: "A", year: "2026" },
    { id: 142, name: "Bobokulov Sardorbek", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 143, name: "Jumaev Zukhriddin", type: "A-Level", subject: "Computer Science", score: "B", year: "2026" },
    { id: 144, name: "Jumaev Zukhriddin", type: "A-Level", subject: "Math", score: "A", year: "2026" },
    { id: 145, name: "Jumaev Zukhriddin", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 146, name: "Madiev Sardor", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 147, name: "Madiev Sardor", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 148, name: "Madiev Sardor", type: "A-Level", subject: "Physics", score: "D", year: "2026" },

    { id: 149, name: "Toshmuratov Alibek", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 150, name: "Toshmuratov Alibek", type: "A-Level", subject: "Math", score: "C", year: "2026" },
    { id: 151, name: "Toshmuratov Alibek", type: "A-Level", subject: "Physics", score: "E", year: "2026" },

    { id: 152, name: "Khujanov Shohjahon", type: "A-Level", subject: "Biology", score: "A", year: "2026" },
    { id: 153, name: "Khujanov Shohjahon", type: "A-Level", subject: "Chemistry", score: "B", year: "2026" },
    { id: 154, name: "Khujanov Shohjahon", type: "A-Level", subject: "Math", score: "A", year: "2026" },

    { id: 155, name: "Kholiyarov Javohir", type: "A-Level", subject: "Computer Science", score: "B", year: "2026" },
    { id: 156, name: "Kholiyarov Javohir", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 157, name: "Kholiyarov Javohir", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 158, name: "Khudoyberdiev Firdavs", type: "A-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 159, name: "Khudoyberdiev Firdavs", type: "A-Level", subject: "Chemistry", score: "C", year: "2026" },
    { id: 160, name: "Khudoyberdiev Firdavs", type: "A-Level", subject: "Math", score: "B", year: "2026" },

    { id: 161, name: "Khurramov Asliddin", type: "A-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 162, name: "Khurramov Asliddin", type: "A-Level", subject: "Math", score: "B", year: "2026" },
    { id: 163, name: "Khurramov Asliddin", type: "A-Level", subject: "Physics", score: "C", year: "2026" },

    // ==========================================
    // CAMBRIDGE AS LEVEL RESULTS (10-SINF - 2-RASM)
    // ==========================================
    { id: 201, name: "Davlatov Jakhongir", type: "AS-Level", subject: "Biology", score: "A", year: "2026" },
    { id: 202, name: "Davlatov Jakhongir", type: "AS-Level", subject: "Chemistry", score: "A", year: "2026" },
    { id: 203, name: "Davlatov Jakhongir", type: "AS-Level", subject: "Math", score: "A", year: "2026" },

    { id: 204, name: "Egamberdiev Sukhrob", type: "AS-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 205, name: "Egamberdiev Sukhrob", type: "AS-Level", subject: "Math", score: "C", year: "2026" },
    { id: 206, name: "Egamberdiev Sukhrob", type: "AS-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 207, name: "Erkirov Isroil", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 208, name: "Erkirov Isroil", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 209, name: "Erkirov Isroil", type: "AS-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 210, name: "Hamrokulov Rizvonbek", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 211, name: "Hamrokulov Rizvonbek", type: "AS-Level", subject: "Math", score: "B", year: "2026" },
    { id: 212, name: "Hamrokulov Rizvonbek", type: "AS-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 213, name: "Murotov Manuchekhr", type: "AS-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 214, name: "Murotov Manuchekhr", type: "AS-Level", subject: "Chemistry", score: "D", year: "2026" },
    { id: 215, name: "Murotov Manuchekhr", type: "AS-Level", subject: "Math", score: "B", year: "2026" },

    { id: 216, name: "Safarov Eldorbek", type: "AS-Level", subject: "Biology", score: "B", year: "2026" },
    { id: 217, name: "Safarov Eldorbek", type: "AS-Level", subject: "Chemistry", score: "B", year: "2026" },
    { id: 218, name: "Safarov Eldorbek", type: "AS-Level", subject: "Math", score: "A", year: "2026" },

    { id: 219, name: "Soatov Javohir", type: "AS-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 220, name: "Soatov Javohir", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 221, name: "Soatov Javohir", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 222, name: "Turaev Sanjarbek", type: "AS-Level", subject: "Chemistry", score: "C", year: "2026" },
    { id: 223, name: "Turaev Sanjarbek", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 224, name: "Turaev Sanjarbek", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 225, name: "Zokirov Zafar", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 226, name: "Zokirov Zafar", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 227, name: "Zokirov Zafar", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 228, name: "Egamberdiev Sardor", type: "AS-Level", subject: "Chemistry", score: "D", year: "2026" },
    { id: 229, name: "Egamberdiev Sardor", type: "AS-Level", subject: "Math", score: "D", year: "2026" },
    { id: 230, name: "Egamberdiev Sardor", type: "AS-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 231, name: "Erkinvo Alisher", type: "AS-Level", subject: "Chemistry", score: "D", year: "2026" },
    { id: 232, name: "Erkinvo Alisher", type: "AS-Level", subject: "Math", score: "B", year: "2026" },
    { id: 233, name: "Erkinvo Alisher", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 234, name: "Eshmuminova Mushtariy", type: "AS-Level", subject: "Biology", score: "C", year: "2026" },
    { id: 235, name: "Eshmuminova Mushtariy", type: "AS-Level", subject: "Chemistry", score: "D", year: "2026" },
    { id: 236, name: "Eshmuminova Mushtariy", type: "AS-Level", subject: "Math", score: "B", year: "2026" },

    { id: 237, name: "Islamov Alisher", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 238, name: "Islamov Alisher", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 239, name: "Islamov Alisher", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 240, name: "Juraev Abbos", type: "AS-Level", subject: "Biology", score: "A", year: "2026" },
    { id: 241, name: "Juraev Abbos", type: "AS-Level", subject: "Chemistry", score: "A", year: "2026" },
    { id: 242, name: "Juraev Abbos", type: "AS-Level", subject: "Math", score: "B", year: "2026" },

    { id: 243, name: "Mamayusupov Asror", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 244, name: "Mamayusupov Asror", type: "AS-Level", subject: "Math", score: "B", year: "2026" },
    { id: 245, name: "Mamayusupov Asror", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 246, name: "Salomov Nurbek", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 247, name: "Salomov Nurbek", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 248, name: "Salomov Nurbek", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 249, name: "Salomova Mohinur", type: "AS-Level", subject: "Computer Science", score: "B", year: "2026" },
    { id: 250, name: "Salomova Mohinur", type: "AS-Level", subject: "Math", score: "B", year: "2026" },
    { id: 251, name: "Salomova Mohinur", type: "AS-Level", subject: "Physics", score: "B", year: "2026" },

    { id: 252, name: "Tojiboev Shohruh", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 253, name: "Tojiboev Shohruh", type: "AS-Level", subject: "Math", score: "B", year: "2026" },
    { id: 254, name: "Tojiboev Shohruh", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 255, name: "Ubaydulloev Zuhriddin", type: "AS-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 256, name: "Ubaydulloev Zuhriddin", type: "AS-Level", subject: "Math", score: "C", year: "2026" },
    { id: 257, name: "Ubaydulloev Zuhriddin", type: "AS-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 258, name: "Uralova Jasmina", type: "AS-Level", subject: "Biology", score: "A", year: "2026" },
    { id: 259, name: "Uralova Jasmina", type: "AS-Level", subject: "Chemistry", score: "A", year: "2026" },
    { id: 260, name: "Uralova Jasmina", type: "AS-Level", subject: "Math", score: "A", year: "2026" },

    { id: 261, name: "Khayrullaeva Bakhorakhon", type: "AS-Level", subject: "Computer Science", score: "A", year: "2026" },
    { id: 262, name: "Khayrullaeva Bakhorakhon", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 263, name: "Khayrullaeva Bakhorakhon", type: "AS-Level", subject: "Physics", score: "A", year: "2026" },

    { id: 264, name: "Choriyev Fozilbek", type: "AS-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 265, name: "Choriyev Fozilbek", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 266, name: "Choriyev Fozilbek", type: "AS-Level", subject: "Physics", score: "C", year: "2026" },

    { id: 267, name: "Abdumurodov Oybek", type: "AS-Level", subject: "Computer Science", score: "C", year: "2026" },
    { id: 268, name: "Abdumurodov Oybek", type: "AS-Level", subject: "Math", score: "A", year: "2026" },
    { id: 269, name: "Abdumurodov Oybek", type: "AS-Level", subject: "Physics", score: "B", year: "2026" },
];

export default function Results({ category = "all" }) {
    const [filterType, setFilterType] = useState(category);
    const [filterScore, setFilterScore] = useState("all");
    const [filterSubject, setFilterSubject] = useState("all");
    const [filterYear, setFilterYear] = useState("all");
    const [selectedCert, setSelectedCert] = useState(null);

    // Map prop category to filterType cleanly
    useEffect(() => {
        if (category === "a-level" || category === "A-Level") setFilterType("A-Level");
        else if (category === "as-level" || category === "AS-Level") setFilterType("AS-Level");
        else if (category === "ielts" || category === "IELTS") setFilterType("IELTS");
        else if (category === "sat" || category === "SAT") setFilterType("SAT");
        else setFilterType(category);

        setFilterScore("all");
        setFilterSubject("all");
        setFilterYear("all");
    }, [category]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredStudents = studentResults.filter(student => {
        if (filterType !== "all" && student.type.toLowerCase() !== filterType.toLowerCase()) return false;
        if (filterYear !== "all" && student.year !== filterYear) return false;
        if (filterSubject !== "all" && (student.type === "A-Level" || student.type === "AS-Level")) {
            if (student.subject !== filterSubject) return false;
        }
        if (filterScore !== "all") {
            if (student.type === "IELTS") {
                const score = parseFloat(student.score);
                if (filterScore === "high" && score < 7.5) return false;
                if (filterScore === "medium" && (score >= 7.5 || score < 6.5)) return false;
                if (filterScore === "low" && score >= 6.5) return false;
            } else if (student.type === "SAT") {
                const score = parseInt(student.score, 10);
                if (filterScore === "high" && score < 1400) return false;
                if (filterScore === "medium" && (score >= 1400 || score < 1250)) return false;
                if (filterScore === "low" && score >= 1250) return false;
            } else if (student.type === "A-Level" || student.type === "AS-Level") {
                if (filterScore === "star" && student.score !== "A*") return false;
                if (filterScore === "A" && student.score !== "A") return false;
                if (filterScore === "B" && student.score !== "B") return false;
                if (filterScore === "C" && student.score !== "C") return false;
                if (filterScore === "D-E" && (student.score !== "D" && student.score !== "E")) return false;
            }
        }
        return true;
    });

    const uniqueYears = ["2026", "2025", "2024"];
    const subjectsList = ["Biology", "Chemistry", "Computer Science", "Math", "Physics"];

    // Helper for Cambridge grade color badges
    const getGradeBadgeStyle = (score) => {
        switch (score) {
            case 'A*':
                return 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md border border-emerald-400';
            case 'A':
                return 'bg-emerald-500 text-white shadow-xs';
            case 'B':
                return 'bg-amber-500 text-white shadow-xs';
            case 'C':
                return 'bg-yellow-400 text-slate-900 shadow-xs';
            case 'D':
                return 'bg-sky-400 text-slate-950 shadow-xs';
            case 'E':
                return 'bg-blue-600 text-white shadow-xs';
            default:
                return 'bg-slate-700 text-white';
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-16 relative overflow-x-hidden font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            
            <div className="relative z-20">
                <PageHeroBanner category="Natijalar" title={`${filterType === 'all' ? 'Barcha' : filterType} Natijalari`} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8 pt-8 flex flex-col md:flex-row gap-8">
                
                {/* Left Sidebar Filter */}
                <div className="w-full md:w-[280px] shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 self-start">
                    <h3 className="font-bold text-[#0a1b3f] text-lg mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0088cc]">filter_alt</span>
                        Filtrlar
                    </h3>
                    
                    {/* Sertifikat Turi */}
                    <div className="mb-5">
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Sertifikat turi</h4>
                        <div className="flex flex-col gap-2">
                            {['all', 'IELTS', 'SAT', 'A-Level', 'AS-Level'].map(type => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="certType" 
                                        value={type}
                                        checked={filterType.toLowerCase() === type.toLowerCase()}
                                        onChange={() => { 
                                            setFilterType(type); 
                                            setFilterScore('all');
                                            setFilterSubject('all');
                                        }}
                                        className="accent-[#0088cc] w-4 h-4 cursor-pointer"
                                    />
                                    <span className={`text-sm ${filterType.toLowerCase() === type.toLowerCase() ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                        {type === 'all' ? 'Barchasi' : type === 'A-Level' ? 'A-Level (11-sinf)' : type === 'AS-Level' ? 'AS-Level (10-sinf)' : type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Cambridge Fanlar boyicha Filter (A-Level & AS-Level) */}
                    {(filterType === 'A-Level' || filterType === 'AS-Level' || filterType === 'all') && (
                        <div className="mb-5">
                            <h4 className="font-semibold text-slate-700 text-sm mb-3">Fan bo'yicha</h4>
                            <select 
                                value={filterSubject} 
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#0088cc]"
                            >
                                <option value="all">Barcha fanlar</option>
                                {subjectsList.map(subj => (
                                    <option key={subj} value={subj}>{subj}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Ball / Natija bo'yicha Filter */}
                    <div className="mb-5">
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Natija bo'yicha</h4>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="scoreFilter" value="all" checked={filterScore === 'all'} onChange={() => setFilterScore('all')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                <span className={`text-sm ${filterScore === 'all' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>Barchasi</span>
                            </label>

                            {(filterType === 'IELTS' || filterType === 'SAT') && (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="high" checked={filterScore === 'high'} onChange={() => setFilterScore('high')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'high' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            {filterType === 'IELTS' ? '7.5+' : '1400+'}
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="medium" checked={filterScore === 'medium'} onChange={() => setFilterScore('medium')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'medium' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            {filterType === 'IELTS' ? '6.5 — 7.0' : '1250 — 1390'}
                                        </span>
                                    </label>
                                </>
                            )}

                            {(filterType === 'A-Level' || filterType === 'AS-Level') && (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="star" checked={filterScore === 'star'} onChange={() => setFilterScore('star')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm flex items-center gap-1 ${filterScore === 'star' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            A <span className="material-symbols-outlined text-amber-400 text-base leading-none">star</span>
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="A" checked={filterScore === 'A'} onChange={() => setFilterScore('A')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'A' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>A daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="B" checked={filterScore === 'B'} onChange={() => setFilterScore('B')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'B' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>B daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="C" checked={filterScore === 'C'} onChange={() => setFilterScore('C')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'C' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>C daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="D-E" checked={filterScore === 'D-E'} onChange={() => setFilterScore('D-E')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'D-E' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>D / E daraja</span>
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Yil bo'yicha */}
                    <div>
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Olingan yil</h4>
                        <select 
                            value={filterYear} 
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#0088cc]"
                        >
                            <option value="all">Barcha yillar</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Content (Certificates Grid) */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => {
                                const isIELTS = student.type === 'IELTS';
                                const isSAT = student.type === 'SAT';
                                const isCambridge = student.type === 'A-Level' || student.type === 'AS-Level';

                                return (
                                    <div 
                                        key={student.id} 
                                        onClick={() => !isIELTS && setSelectedCert(student)}
                                        className={`relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 group transition-all duration-300 bg-white flex flex-col justify-between ${
                                            isIELTS 
                                                ? 'cursor-default' 
                                                : 'hover:shadow-2xl hover:border-[#0088cc] hover:-translate-y-1.5 cursor-pointer'
                                        }`}
                                    >
                                        {/* Dynamic Digital Certificate Card Visual Banner */}
                                        <div className={`relative w-full aspect-[4/3] overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${
                                            isIELTS 
                                                ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950' 
                                                : isSAT 
                                                    ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900'
                                                    : 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900'
                                        }`}>
                                            {/* Decorative Background Accents */}
                                            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                                            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
                                            
                                            {/* Certificate Inner Frame Border */}
                                            <div className="absolute inset-2 border border-white/15 rounded-xl pointer-events-none flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[80px] text-white/5 select-none transform rotate-12">
                                                    {isCambridge ? 'verified' : 'workspace_premium'}
                                                </span>
                                            </div>

                                            {/* Top Row: School & Certificate Level Badge */}
                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="text-[9px] font-bold text-white tracking-wider uppercase">
                                                        {isCambridge ? 'CAMBRIDGE RESULT' : 'VERIFIED RESULT'}
                                                    </span>
                                                </div>

                                                <div className={`px-2 py-0.5 rounded-lg text-xs font-black shadow-md border ${
                                                    isIELTS 
                                                        ? 'bg-blue-600/90 text-white border-blue-400/50' 
                                                        : isSAT 
                                                            ? 'bg-purple-600/90 text-white border-purple-400/50'
                                                            : 'bg-emerald-600/90 text-white border-emerald-400/50'
                                                }`}>
                                                    {student.type}
                                                </div>
                                            </div>

                                            {/* Center Section: Certificate Score Badge */}
                                            <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                                                <div className="text-[10px] font-extrabold tracking-widest text-slate-300 uppercase mb-1">
                                                    {isCambridge ? (student.subject || 'CAMBRIDGE EXAM') : 'OFFICIAL CERTIFICATE'}
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/20 shadow-lg">
                                                    <span className="text-xs font-bold text-white/80">
                                                        {isCambridge ? 'GRADE:' : 'SCORE:'}
                                                    </span>
                                                    
                                                    {/* Cambridge Grade formatted display with Star Icon if A* */}
                                                    <span className={`text-2xl font-black flex items-center gap-1 ${
                                                        isIELTS ? 'text-cyan-300' : isSAT ? 'text-purple-300' : 'text-emerald-300'
                                                    }`}>
                                                        {student.score}
                                                        {student.score === 'A*' && (
                                                             <span className="material-symbols-outlined text-amber-300 text-xl animate-pulse">star</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Candidate Name & Year */}
                                            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 font-medium pt-1">
                                                <span className="truncate max-w-[130px] font-bold text-white/90">{student.name}</span>
                                                <span className="font-mono text-white/60">{student.year}</span>
                                            </div>

                                            {/* Hover Overlay - Only for non-IELTS results */}
                                            {!isIELTS && (
                                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-20">
                                                    <div className="px-3.5 py-2 rounded-full bg-white text-[#0a1b3f] text-xs font-extrabold flex items-center gap-2 shadow-2xl transform scale-95 group-hover:scale-100 transition-transform">
                                                        <span className="material-symbols-outlined text-base">visibility</span>
                                                        <span>Natijani ko'rish</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Student Info & Details Card */}
                                        <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between space-y-2">
                                            <div>
                                                <h4 className={`font-bold text-[#0a1b3f] text-base leading-snug tracking-tight truncate transition-colors ${
                                                    !isIELTS ? 'group-hover:text-[#0088cc]' : ''
                                                }`}>
                                                    {student.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                                    {isCambridge ? (
                                                        <>
                                                            <span className="material-symbols-outlined text-sm text-emerald-500">menu_book</span>
                                                            <span className="font-semibold text-slate-700">{student.subject}</span>
                                                        </>
                                                    ) : (
                                                        <span>Prezident Maktabi O'quvchisi</span>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-slate-400 font-semibold">Natija:</span>
                                                    
                                                    {isCambridge ? (
                                                        <span className={`font-black text-sm px-2.5 py-0.5 rounded-md flex items-center gap-1 ${getGradeBadgeStyle(student.score)}`}>
                                                            {student.score}
                                                            {student.score === 'A*' && (
                                                                <span className="material-symbols-outlined text-xs">star</span>
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span className={`font-black text-base px-2 py-0.5 rounded-md ${
                                                            isIELTS
                                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                                                        }`}>
                                                            {student.score}
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="text-slate-400 font-bold text-xs bg-slate-100 px-2 py-1 rounded-md">
                                                    {student.year}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
                                <p className="font-semibold text-slate-700">Tanlangan filtrlar bo'yicha sertifikatlar topilmadi.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* ========================================================================= */}
            {/* FULL-SCREEN CERTIFICATE MODAL POPUP */}
            {/* ========================================================================= */}
            {selectedCert && selectedCert.type !== 'IELTS' && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedCert(null)}
                >
                    <div 
                        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden relative z-10 animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase ${
                                    selectedCert.type === 'IELTS' 
                                        ? 'bg-blue-500 text-white' 
                                        : selectedCert.type === 'SAT' 
                                            ? 'bg-purple-500 text-white' 
                                            : 'bg-emerald-500 text-white'
                                }`}>
                                    {selectedCert.type}
                                </span>
                                <div>
                                    <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight">
                                        {selectedCert.name}
                                    </h3>
                                    <p className="text-xs text-cyan-300 font-medium">
                                        Natija: <strong className="text-white">{selectedCert.score}</strong> | Yil: <strong className="text-white">{selectedCert.year}</strong>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {selectedCert.file && (
                                    <a 
                                        href={getAssetPath(selectedCert.file)} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors border border-white/10"
                                        title="Yangi oynada ochish"
                                    >
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        <span className="hidden sm:inline">Ochish</span>
                                    </a>
                                )}
                                <button 
                                    onClick={() => setSelectedCert(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-y-auto min-h-[50vh] flex items-center justify-center">
                            {selectedCert.file ? (
                                <object 
                                    data={getAssetPath(selectedCert.file)} 
                                    type="application/pdf"
                                    className="w-full h-[65vh] rounded-xl border border-slate-300 shadow-inner bg-white"
                                >
                                    <iframe 
                                        src={getAssetPath(selectedCert.file)} 
                                        className="w-full h-full rounded-xl border-none"
                                        title={`Full Certificate - ${selectedCert.name}`}
                                    >
                                        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-xl">
                                            <span className="material-symbols-outlined text-6xl text-[#0088cc] mb-3">picture_as_pdf</span>
                                            <h4 className="font-extrabold text-slate-800 text-lg mb-1">{selectedCert.name} - Sertifikat PDF</h4>
                                            <a 
                                                href={getAssetPath(selectedCert.file)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="mt-4 px-6 py-3 rounded-xl bg-[#0088cc] text-white font-bold text-sm shadow-md hover:bg-[#0077bb] transition-all"
                                            >
                                                Faylni ochish / yuklab olish
                                            </a>
                                        </div>
                                    </iframe>
                                </object>
                            ) : (
                                /* Cambridge Verified Digital Certificate Card Popup */
                                <div className="w-full bg-gradient-to-br from-slate-900 via-[#0a1c36] to-slate-950 p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-white text-center shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                                    <div className="relative z-10 flex flex-col items-center">
                                        <img 
                                            src="/images/aa1_logo.png" 
                                            alt="Prezident Maktabi" 
                                            className="w-16 h-16 object-contain mb-4 bg-white/10 rounded-full p-2 border border-white/20"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />

                                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
                                            CAMBRIDGE ASSESSMENT INTERNATIONAL EDUCATION
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                                            {selectedCert.type === 'A-Level' ? 'Cambridge International A Level' : 'Cambridge International AS Level'}
                                        </h3>
                                        <p className="text-slate-300 text-sm mb-6 max-w-md">
                                            Termiz shahridagi Prezident maktabi o'quvchisining rasmiy imtihon natijasi sertifikati
                                        </p>

                                        <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-md space-y-4 mb-6">
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">O'quvchi ismi:</span>
                                                <span className="text-base font-extrabold text-white">{selectedCert.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Fan nomi:</span>
                                                <span className="text-base font-extrabold text-cyan-300">{selectedCert.subject}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Imtihon topshirilgan yil:</span>
                                                <span className="text-base font-extrabold text-white">{selectedCert.year} yoz oyi</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-1">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Natija (Daraja):</span>
                                                <span className={`text-xl font-black px-4 py-1 rounded-xl flex items-center gap-1.5 ${getGradeBadgeStyle(selectedCert.score)}`}>
                                                    <span>{selectedCert.score}</span>
                                                    {selectedCert.score === 'A*' && (
                                                        <span className="material-symbols-outlined text-amber-300 text-lg">star</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-full text-xs font-bold">
                                            <span className="material-symbols-outlined text-base">verified</span>
                                            <span>Rasmiy Ma'lumot Tasdiqlangan</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
