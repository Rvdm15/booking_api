# Booking API

[English version](README.md)

RESTful API voor een online boekingsapp, gebouwd met **Expres.js** en **Prisma** (SQLite).
Eindopdracht van de Winc Academy-opleiding Back-End Development.

## Functionaliteit

- CRUD endpoints voor users, hoosts, properties, bookings en reviews
- Inloggen met JWT-authenticatie (POST, PUT, en DELETE vereisen een token)
- Query-fliters, bijv. `/properties?location=...&pricePerNight=...`
- Logging-middelware (methode, URL, status en duur van elk request)
- Error-handling-middleware en foutmeldingen naar Sentry
- Validatie: ontbrekende velden geven 400, onbekende is's geven 404

## Installatie

1. Clone de repository en installer de packages:

   ```bash
   git clone https://github.com/Rvdm15/booking_api.git
   cd booking_api
   npm install
   ```

2. Maak een `.env`-bestand in de hoofdmap:

   ```
   AUTH_SECRET_KEY=jouw-geheime-sleutel
   SENTRY_DSN=jouw-sentry-dsn
   ```

## Gebruik

| Commando              | Wat het doet                                      |
| --------------------- | ------------------------------------------------- |
| `npm run clean-start` | Database resetten en vullen, server starten       |
| `npm run dev`         | Server starten op http://localhost:3000           |
| `npm run reset-db`    | Database resetten en vullen                       |
| `npm test`            | De positieve en negatieve Postman-tests uitvoeren |

**Vóór het testen:** altijd eerst `npm run reset-db`, dan `npm run dev`, en daarna `npm test`in een tweede terminal.

##Authenticatie

Stuur een POST-request naar `login`met username en password:

```json
{
  "username": "jdoe",
  "password": "password123"
}
```

Gebruik de token uit het antwoord in de header `Authorization` bij alle POST-, PUT-, en DELETE-requests.

## Auteur

Rob van den Maagdenberg - Winc Academy, 2026
