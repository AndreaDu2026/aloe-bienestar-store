# Aloe & Bienestar 🪴

Base ecommerce para una tienda de nutrición, belleza y bienestar en Ecuador.

## Flujo implementado

**Productos → detalle → carrito persistente → checkout Ecuador → proveedor de pago → confirmación.**

El catálogo inicial vive en `lib/products.ts` para que pueda sustituirse después por PostgreSQL/Prisma. El esquema de `prisma/schema.prisma` ya contempla productos, clientes, pedidos, items, pagos y cupones.

## Desarrollo

1. Instala Node.js LTS.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env.local`.
4. Configura `DATABASE_URL` si vas a activar persistencia con Prisma.
5. `npm run db:generate` y luego `npm run db:push`.
6. `npm run dev`.

## Pago con tarjeta en Ecuador

El checkout **no guarda números de tarjeta** y no contiene un pago simulado. `app/api/checkout/route.ts` reconstruye los precios desde el servidor y deriva la transacción a un gateway configurado mediante `PAYMENT_PROVIDER`, `PAYMENT_CREATE_URL` y `PAYMENT_API_KEY`.

Antes de producción hay que conectar un proveedor real que opere en Ecuador y adaptar su SDK/API, checkout hosted o tokenización y webhook. El pedido solo debe pasar a `PAID` después de validar la firma/autenticidad del webhook del proveedor y aplicar idempotencia.

No pongas claves secretas en `NEXT_PUBLIC_*` ni en el navegador.

## Datos que faltan para producción

- Proveedor de pagos elegido y credenciales de producción.
- Base de datos PostgreSQL.
- Imágenes reales y precios definitivos.
- Número real de WhatsApp.
- Reglas de envío por provincia/ciudad.
- Políticas comerciales, privacidad, devoluciones y términos.
