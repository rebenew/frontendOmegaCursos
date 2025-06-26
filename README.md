# Omega Cursos - Frontend Angular

Este proyecto es una aplicación Angular para la gestión de cursos en línea, con diferentes roles de usuario (admin, mentor, estudiante).

## 🚀 Características

- **Autenticación y Autorización**: Sistema completo de login/logout con roles
- **Dashboard de Administrador**: Gestión de cursos y usuarios
- **Dashboard de Mentor**: Gestión de cursos propios
- **Dashboard de Estudiante**: Acceso a cursos, calificaciones y comunidad
- **Interceptores HTTP**: Manejo automático de tokens y errores
- **Guards de Ruta**: Protección de rutas por roles
- **Configuración de Entornos**: Desarrollo y producción

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- Angular CLI (versión 19)
- Backend API funcionando

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd frontendOmegaCursos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar el backend**
Edita los archivos de entorno según tu configuración:

**Desarrollo** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  authUrl: 'http://localhost:8080/auth',
  coursesUrl: 'http://localhost:8080/courses',
  usersUrl: 'http://localhost:8080/users',
  studentsUrl: 'http://localhost:8080/students',
  mentorsUrl: 'http://localhost:8080/mentors',
  communityUrl: 'http://localhost:8080/community',
  gradesUrl: 'http://localhost:8080/grades',
  contentUrl: 'http://localhost:8080/content'
};
```

**Producción** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-produccion.com/api',
  authUrl: 'https://tu-backend-produccion.com/auth',
  coursesUrl: 'https://tu-backend-produccion.com/courses',
  usersUrl: 'https://tu-backend-produccion.com/users',
  studentsUrl: 'https://tu-backend-produccion.com/students',
  mentorsUrl: 'https://tu-backend-produccion.com/mentors',
  communityUrl: 'https://tu-backend-produccion.com/community',
  gradesUrl: 'https://tu-backend-produccion.com/grades',
  contentUrl: 'https://tu-backend-produccion.com/content'
};
```

## 🚀 Ejecutar la aplicación

### Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

### Producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Funcionalidades centrales
│   │   ├── guards/             # Guards de autenticación y roles
│   │   ├── interceptors/       # Interceptores HTTP
│   │   ├── models/             # Modelos de datos
│   │   └── services/           # Servicios centralizados
│   ├── Components/             # Componentes reutilizables
│   ├── Pages/                  # Páginas principales
│   ├── students-dashboard/     # Dashboard de estudiantes
│   ├── Dashboard_Mentor/       # Dashboard de mentores
│   └── admin-components/       # Componentes de administración
├── assets/                     # Recursos estáticos
└── environments/               # Configuración de entornos
```

## 🔐 Autenticación y Autorización

### Roles de Usuario
- **Admin**: Acceso completo a todas las funcionalidades
- **Mentor**: Gestión de cursos propios
- **Estudiante**: Acceso a cursos, calificaciones y comunidad

### Guards Implementados
- `AuthGuard`: Verifica si el usuario está autenticado
- `RoleGuard`: Verifica si el usuario tiene los permisos necesarios

### Uso en Rutas
```typescript
{
  path: 'admin-dashboard',
  data: { roles: ['admin'] },
  canActivate: [AuthGuard, RoleGuard],
  component: AdminDashboardComponent
}
```

## 🔧 Servicios Principales

### AuthService
Maneja la autenticación y el estado del usuario:
```typescript
// Login
this.authService.login(credentials).subscribe(response => {
  // Usuario autenticado
});

// Verificar rol
if (this.authService.isAdmin()) {
  // Lógica para admin
}
```

### CourseService
Gestión de cursos:
```typescript
// Obtener cursos
this.courseService.getCourses().subscribe(courses => {
  // Lista de cursos
});

// Crear curso
this.courseService.createCourse(courseData).subscribe(newCourse => {
  // Curso creado
});
```

### UserService
Gestión de usuarios:
```typescript
// Obtener usuarios
this.userService.getUsers().subscribe(users => {
  // Lista de usuarios
});
```

## 🌐 Integración con Backend

### Endpoints Esperados

#### Autenticación
- `POST /auth/login` - Login de usuario
- `POST /auth/register` - Registro de usuario
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Renovar token

#### Cursos
- `GET /courses` - Obtener todos los cursos
- `GET /courses/:id` - Obtener curso por ID
- `POST /courses` - Crear curso
- `PUT /courses/:id` - Actualizar curso
- `DELETE /courses/:id` - Eliminar curso
- `GET /courses/search?q=term` - Buscar cursos
- `GET /courses/mentor/:mentorId` - Cursos por mentor

#### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `GET /users/search?q=term` - Buscar usuarios
- `GET /users/type/:userType` - Usuarios por tipo
- `PUT /users/profile` - Actualizar perfil
- `PUT /users/change-password` - Cambiar contraseña

### Formato de Respuestas

#### Login Response
```json
{
  "user": {
    "id": 1,
    "first_name": "Juan",
    "last_name": "Pérez",
    "user_type": "admin",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here"
}
```

#### Course Response
```json
{
  "id": 1,
  "title": "Angular Avanzado",
  "imageUrl": "https://example.com/image.jpg",
  "modality": "Virtual",
  "certification": "Certificado oficial",
  "duration": "8 semanas",
  "description": "Curso avanzado de Angular",
  "price": 299.99,
  "mentor_id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## 🔒 Seguridad

### Headers de Autorización
El interceptor automáticamente agrega el token JWT a todas las peticiones:
```
Authorization: Bearer <token>
```

### Manejo de Errores
- **401**: Token expirado/inválido - Redirige al login
- **403**: Acceso prohibido - Redirige a página de error
- **404**: Recurso no encontrado
- **500**: Error del servidor

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📦 Build y Deploy

### Build de Producción
```bash
npm run build
```

### Build con SSR (Server-Side Rendering)
```bash
npm run build:ssr
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de CORS**
   - Asegúrate de que el backend permita peticiones desde `http://localhost:4200`
   - Configura los headers CORS en el backend

2. **Token no válido**
   - Verifica que el backend genere tokens JWT válidos
   - Revisa el formato del token en el localStorage

3. **Rutas no encontradas**
   - Verifica que las rutas del backend coincidan con las configuradas en `environment.ts`
   - Revisa que el servidor backend esté funcionando

## 📞 Soporte

Para soporte técnico o preguntas sobre la integración, contacta al equipo de desarrollo.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
