# 🏛️ Ozymandias Spatial System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebAuthn](https://img.shields.io/badge/WebAuthn-Security-emerald?style=for-the-badge)

**A next-generation, proxy-proof BLE attendance system built for modern campuses.** 
Developed for the Dropcode Hackathon (October 2026).

---

## 🛑 The Problem
In an average engineering college, professors waste 10–15 minutes of every lecture manually calling out roll numbers. Despite this wasted time, traditional systems remain completely broken due to "proxies"—students easily marking attendance for their absent friends. Installing biometric hardware on every desk is financially impossible.

## 💡 Our Solution
Ozymandias leverages the hardware students already have in their pockets, paired with low-cost (₹300) ESP32 Bluetooth beacons placed in classrooms. The system guarantees **Proof of Location** via BLE proximity and **Proof of Identity** via native OS biometrics, completely eliminating the proxy loophole while giving professors their teaching time back.

---

## ✨ Key Features

### 👨‍🎓 For Students
*   **Interactive Spatial Map:** A live, dynamic campus floor plan that syncs with the college timetable. Rooms light up automatically when a lecture is active.
*   **Zero-Click Proximity:** Students connect to the classroom beacon via BLE. Calibrated TX power ensures they must be *inside* the walls of the room, preventing corridor-bleed.
*   **Native Biometric Integration:** Utilizes the **WebAuthn API** to trigger native device security (Windows Hello, TouchID, FaceID). You cannot give your fingerprint to a friend.

### 👨‍🏫 For Professors
*   **Hierarchical Drill-Down Dashboard:** Seamlessly navigate from academic years → semesters → specific divisions.
*   **Lecture-Specific Rosters:** Click on any lecture in the Monday-Friday timetable to see an exact timestamped breakdown of who was present, late, or absent.
*   **Manual Override System:** A robust "Add Data" portal with toast notifications for handling medical leaves or beacon edge cases.
*   **Global Overview:** Switch between a Weekly Schedule Analysis and a Daily Timeline to track overall attendance health.

---

## 🛡️ Security Architecture (Proxy-Proofing)

When dealing with hardware and attendance, security is paramount. We anticipated the most common attack vectors:

1.  **Replay Attacks (Beacon Spoofing):** 
    Beacons do not broadcast static IDs. We implemented **Cryptographic Rolling Codes (TOTP)**. Every 30 seconds, the ESP32 generates a new time-based token (e.g., `ROOM_302_849201`). If a student records the signal and tries to broadcast it from their hostel a minute later, the server instantly rejects it.
2.  **Hardware Data Breaches:** 
    Our architecture is entirely **Stateless**. The ESP32 beacon holds zero student data, no PII, and no attendance logs. It acts as a "dumb" broadcaster. If a beacon is stolen or hacked, absolutely no data is compromised.
3.  **API Endpoint Spoofing:** 
    Biometric verification returns a cryptographic token from the device's Secure Enclave/TrustZone. Attendance cannot be faked via Postman or script injections.

---

## 🚀 Getting Started (Run the Demo)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/ozymandias.git](https://github.com/your-username/ozymandias.git)
