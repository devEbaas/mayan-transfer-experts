# mayan-transfer-web

Sitio web público de reservas de traslados turísticos para **Mayan Transfer Experts**.  
Permite a los turistas buscar, reservar y pagar traslados desde/hacia el Aeropuerto Internacional de Cancún hacia hoteles y destinos de la Riviera Maya.

---

## Stack

| Tecnología | Versión | Propósito |
|---|---|---|
| Vite + React | ^6 / ^19 | Bundler y librería de UI |
| TypeScript | ^5.5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos utilitarios |
| React Router | ^7 | Navegación y rutas |
| TanStack Query | ^5 | Fetching y cache de datos |
| React Hook Form + Zod | latest | Validación del wizard de reservas |
| Zustand | latest | Estado global del wizard |
| i18next | latest | Internacionalización ES / EN |
| Axios | latest | Cliente HTTP hacia la API |
| Stripe.js Elements | latest | Formulario de tarjeta (PCI compliant) |
| PayPal JS SDK | latest | Botón de pago PayPal |

---

## Estructura del proyecto

```
src/
├── assets/                  # Imágenes, íconos, fuentes
├── components/
│   ├── ui/                  # Button, Input, Select, Spinner, Badge
│   ├── layout/              # Header, Footer, Layout wrapper
│   ├── home/                # Hero, Services, Destinations, Testimonials
│   └── booking/             # StepIndicator, VehicleCard, PriceBreakdown, PaymentForm
├── pages/
│   ├── HomePage.tsx         # Landing con BookingWidget integrado
│   ├── BookingPage.tsx      # Wizard 4 pasos (step-1 al step-4)
│   ├── ConfirmationPage.tsx # Confirmación post-pago con número de reserva
│   ├── AboutPage.tsx        # Quiénes somos
│   ├── ContactPage.tsx      # Formulario de contacto
│   └── NotFoundPage.tsx     # 404
├── hooks/                   # useBookingPrice, useRoutes, useVehicles
├── services/
│   └── api.ts               # Instancia Axios + métodos por recurso
├── store/
│   └── bookingStore.ts      # Zustand: estado del wizard (step1-3, currentStep)
├── i18n/
│   ├── locales/
│   │   ├── es.json
│   │   └── en.json
│   └── index.ts
├── types/
│   └── booking.ts           # Interfaces: BookingStep1-3, PriceBreakdown, etc.
├── utils/                   # Formatters de fecha, precio, helpers
├── App.tsx                  # Router principal
└── main.tsx                 # Entry point
```

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PAYPAL_CLIENT_ID=...
```

---

## Comandos

```bash
npm install       # Instalar dependencias
npm run dev       # Servidor de desarrollo (http://localhost:5173)
npm run build     # Build de producción → dist/
npm run preview   # Preview del build
npm run lint      # ESLint
```

---

## Plan de implementación

### Fase 1 — Setup y fundación `Semana 1`

Objetivo: proyecto corriendo en local y pipeline de deploy configurado.

- [ ] Configurar alias `@/` en `tsconfig.json`
- [ ] Crear componentes base de UI: `Button`, `Input`, `Select`, `Spinner`, `Badge`
- [ ] Crear `Layout` con `Header` (logo + nav + selector de idioma) y `Footer`
- [ ] Configurar GitHub Actions: build en PR + deploy SSH al VPS en push a `main`

**Entregable:** Landing vacía con header/footer desplegada en staging.

---

### Fase 2 — Landing page y BookingWidget `Semanas 2–3`

Objetivo: home completo y widget de búsqueda funcional contra la API.

#### Secciones de `HomePage` (`/`)

| Sección | Descripción |
|---|---|
| **Hero** | Imagen de fondo del aeropuerto/Cancún, título, `BookingWidget` superpuesto |
| **BookingWidget** | Toggle One Way / Round Trip · Dropdowns Origen/Destino · DatePicker · TimePicker (15 min, 6:00–5:45) · Contadores Adultos (1–51) / Niños (0–25) · Botón Buscar |
| **Servicios** | Cards: 20+ años experiencia, Servicio 24 hrs, Cancelación gratuita, Seguro de pasajeros |
| **Destinos** | Grid: Cancún, Playa del Carmen, Tulum, Playa Mujeres, Holbox, Chichen Itzá, etc. |
| **Testimonios** | Carousel de reseñas con fuente Google Maps |
| **Contacto rápido** | WhatsApp flotante, teléfono Cancún, teléfono USA/Canadá (1-800) |
| **Footer** | Logo, navegación, redes sociales (FB, IG, YouTube), datos de contacto |

- [ ] Consumir `GET /routes` para poblar dropdowns
- [ ] Al enviar el widget, navegar a `/booking?origin=&destination=&...`
- [ ] Internacionalizar todos los textos con `useTranslation`

---

### Fase 3 — Wizard de reservas `Semanas 3–4`

Ruta: `/booking` · Estado global: `useBookingStore` (Zustand)

#### Step 1 — Tu viaje

- Toggle One Way / Round Trip
- Dropdown Origen y Destino (desde API)
- DatePicker de llegada + TimePicker (intervalos 15 min)
- Si Round Trip: fecha y hora de regreso
- Contadores Adultos / Niños
- Validación Zod → guarda en store → navega al step 2

#### Step 2 — Selección de vehículo

- Fetch `GET /vehicles?originId=&destinationId=`
- Grid de `VehicleCard`: foto, nombre, capacidad (pasajeros + maletas), precio
- Componente `PriceBreakdown`: ida / regreso / subtotal / impuestos / **total**
- Guarda `vehicleId` en store → navega al step 3

#### Step 3 — Datos del pasajero

Campos: Nombre · Apellido · Email · Teléfono · Número de vuelo (opcional) · Hora de llegada del vuelo · Solicitudes especiales

- Al "Siguiente": `POST /bookings` → recibe `bookingId` → navega al step 4

#### Step 4 — Pago

- Resumen de reserva (solo lectura)
- Tab **Stripe**: `POST /payments/stripe/intent` → renderizar `<PaymentElement>` → confirmar
- Tab **PayPal**: `POST /payments/paypal/order` → botón oficial PayPal JS SDK → capturar
- Pago exitoso → redirect a `/confirmation/:id`

#### Componente `StepIndicator`

Barra de progreso siempre visible: paso activo / completado / pendiente.

---

### Fase 4 — Confirmación y páginas de contenido `Semana 5`

#### `/confirmation/:id`

- `GET /bookings/:id` al montar
- Card: número de reserva, ruta, fecha/hora, vehículo, pasajeros, monto pagado
- Aviso "Recibirás un email de confirmación"
- Botón "Volver al inicio"

#### `/about`

- Historia de la empresa (20+ años)
- Choferes certificados, flota propia, monitoreo de vuelos
- Logos de confianza: PayPal Verified, SSL, ANTT

#### `/contact`

- Formulario → `POST /contacts`
- Datos: email, WhatsApp, teléfonos, horario de atención
- Mapa de Google Maps embebido (embed iframe)

---

### Fase 5 — SEO, accesibilidad y QA `Semana 6`

- [ ] Meta tags dinámicos con `react-helmet-async`
- [ ] `sitemap.xml` generado en build
- [ ] `robots.txt`
- [ ] Atributos `aria-label` y roles ARIA en formularios y navegación
- [ ] QA responsivo: iOS Safari, Android Chrome, Desktop Chrome / Firefox / Safari
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90
- [ ] Pruebas de pago con tarjetas de prueba Stripe y sandbox PayPal

---

### Fase 6 — Deploy a producción `Semanas 7–8`

- [ ] Variables de entorno de producción en VPS
- [ ] `npm run build` → subir `dist/` a `public_html` del dominio vía GitHub Actions
- [ ] Dominio + SSL (Let's Encrypt en cPanel)
- [ ] Activar claves **live** de Stripe y PayPal
- [ ] Verificar CORS apuntando al dominio de producción

---

## Deploy — GitHub Actions

El workflow `.github/workflows/deploy.yml` corre en cada push a `main`:

1. `npm ci` + `npm run build`
2. `rsync dist/ usuario@vps:/home/usuario/public_html/` vía SSH
3. Los archivos estáticos son servidos por Apache desde cPanel

**Secrets requeridos en GitHub:**

| Secret | Descripción |
|---|---|
| `VPS_HOST` | IP o dominio del servidor |
| `VPS_USER` | Usuario SSH del VPS |
| `VPS_SSH_KEY` | Clave privada SSH |
| `VITE_API_URL` | URL pública de la API |
| `VITE_STRIPE_PUBLIC_KEY` | Clave pública Stripe (live) |
| `VITE_PAYPAL_CLIENT_ID` | Client ID PayPal (live) |

---

## Referencia de diseño

- Sitio de referencia (flujo y UX): mayantransferexperts.com
- Colores de marca: `#0057A8` (azul) · `#00A896` (teal)
- Fuentes: system-ui / Segoe UI (sin dependencia externa)
- Breakpoints responsivos: mobile-first (`sm:640` `md:768` `lg:1024` `xl:1280`)
