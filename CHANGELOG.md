# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Agregado
- Estructura completa del proyecto Angular 19
- Sistema de autenticación con JWT
- Guards de autenticación y autorización por roles
- Interceptores HTTP para manejo de tokens y errores
- Servicios centralizados para cursos, usuarios y autenticación
- Configuración de entornos (desarrollo y producción)
- Dashboard de administrador con gestión de cursos y usuarios
- Dashboard de mentor para gestión de cursos propios
- Dashboard de estudiante con acceso a cursos, calificaciones y comunidad
- Sistema de rutas protegidas por roles
- Documentación completa del proyecto
- Guía de integración con backend

### Características Técnicas
- Angular 19 con standalone components
- TypeScript 5.6
- Angular Material para UI
- Bootstrap 5.3 para estilos
- RxJS para manejo de observables
- Configuración de CORS para integración con backend
- Manejo de errores HTTP centralizado
- Sistema de refresh tokens
- Lazy loading de componentes
- Server-Side Rendering (SSR) configurado

### Estructura del Proyecto
- `/src/app/core/` - Servicios y funcionalidades centrales
- `/src/app/Components/` - Componentes reutilizables
- `/src/app/Pages/` - Páginas principales
- `/src/app/students-dashboard/` - Dashboard de estudiantes
- `/src/app/Dashboard_Mentor/` - Dashboard de mentores
- `/src/app/admin-components/` - Componentes de administración
- `/src/environments/` - Configuración de entornos

### Endpoints del Backend Requeridos
- Autenticación: `/auth/*`
- Cursos: `/courses/*`
- Usuarios: `/users/*`
- Estudiantes: `/students/*`
- Mentores: `/mentors/*`
- Comunidad: `/community/*`
- Calificaciones: `/grades/*`
- Contenido: `/content/*`

### Roles de Usuario
- **Admin**: Acceso completo a todas las funcionalidades
- **Mentor**: Gestión de cursos propios
- **Estudiante**: Acceso a cursos, calificaciones y comunidad

### Scripts Disponibles
- `npm start` - Iniciar servidor de desarrollo
- `npm run build` - Build de desarrollo
- `npm run build:prod` - Build de producción
- `npm test` - Ejecutar tests
- `npm run lint` - Verificar código
- `npm run clean` - Limpiar dependencias

### Configuración
- Variables de entorno configuradas para desarrollo y producción
- CORS configurado para `http://localhost:4200`
- Headers de autorización automáticos
- Manejo de errores 401/403 automático

---

## [Unreleased]

### Planificado
- Tests unitarios completos
- Tests de integración
- CI/CD pipeline
- Dockerización
- Optimización de performance
- PWA (Progressive Web App)
- Internacionalización (i18n)
- Temas personalizables
- Notificaciones push
- Chat en tiempo real
- Sistema de pagos
- Analytics y métricas 