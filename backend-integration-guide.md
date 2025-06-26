# Guía de Integración con Backend

Esta guía detalla cómo configurar tu backend para trabajar con el frontend Angular de Omega Cursos.

## 🔧 Configuración del Backend

### 1. Estructura de Endpoints Requeridos

Tu backend debe implementar los siguientes endpoints:

#### Autenticación (`/auth`)
```
POST /auth/login
POST /auth/register  
POST /auth/logout
POST /auth/refresh
```

#### Cursos (`/courses`)
```
GET    /courses
GET    /courses/:id
POST   /courses
PUT    /courses/:id
DELETE /courses/:id
GET    /courses/search?q=:term
GET    /courses/mentor/:mentorId
```

#### Usuarios (`/users`)
```
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
GET    /users/search?q=:term
GET    /users/type/:userType
PUT    /users/profile
PUT    /users/change-password
```

#### Estudiantes (`/students`)
```
GET    /students
GET    /students/:id
GET    /students/:id/courses
GET    /students/:id/grades
```

#### Mentores (`/mentors`)
```
GET    /mentors
GET    /mentors/:id
GET    /mentors/:id/courses
```

#### Comunidad (`/community`)
```
GET    /community
GET    /community/posts
POST   /community/posts
```

#### Calificaciones (`/grades`)
```
GET    /grades
GET    /grades/student/:studentId
POST   /grades
PUT    /grades/:id
```

#### Contenido (`/content`)
```
GET    /content
GET    /content/course/:courseId
POST   /content
PUT    /content/:id
DELETE /content/:id
```

### 2. Formato de Respuestas

#### Login Response
```json
{
  "user": {
    "id": 1,
    "first_name": "Juan",
    "last_name": "Pérez",
    "user_type": "admin",
    "email": "juan@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here"
}
```

#### Error Response
```json
{
  "error": "Mensaje de error",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00Z"
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

#### User Response
```json
{
  "id": 1,
  "first_name": "Juan",
  "last_name": "Pérez",
  "user_type": "admin",
  "email": "juan@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### 3. Headers Requeridos

#### CORS Headers
```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

#### Authorization Header
El frontend enviará automáticamente:
```
Authorization: Bearer <jwt_token>
```

### 4. Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔐 Autenticación JWT

### 1. Generación de Tokens
```javascript
// Ejemplo con Node.js y jsonwebtoken
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      user_type: user.user_type 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
```

### 2. Verificación de Tokens
```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
```

### 3. Middleware de Roles
```javascript
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_type)) {
      return res.status(403).json({ error: 'Acceso prohibido' });
    }
    next();
  };
};

// Uso
app.get('/admin/users', verifyToken, checkRole(['admin']), (req, res) => {
  // Solo administradores pueden acceder
});
```

## 📝 Ejemplos de Implementación

### Express.js (Node.js)

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        user_type: user.user_type,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Cursos endpoints
app.get('/courses', verifyToken, async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/courses', verifyToken, checkRole(['admin', 'mentor']), async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});

app.listen(8080, () => {
  console.log('Servidor corriendo en puerto 8080');
});
```

### Django (Python)

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

CORS_ALLOW_CREDENTIALS = True

# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_type': user.user_type,
                'email': user.email
            },
            'token': str(refresh.access_token),
            'refreshToken': str(refresh)
        })
    else:
        return Response(
            {'error': 'Credenciales inválidas'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)
```

## 🧪 Testing de Endpoints

### Usando Postman

1. **Login**
   ```
   POST http://localhost:8080/auth/login
   Content-Type: application/json
   
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

2. **Obtener Cursos**
   ```
   GET http://localhost:8080/courses
   Authorization: Bearer <token_from_login>
   ```

3. **Crear Curso**
   ```
   POST http://localhost:8080/courses
   Authorization: Bearer <token_from_login>
   Content-Type: application/json
   
   {
     "title": "Nuevo Curso",
     "modality": "Virtual",
     "certification": "Certificado",
     "duration": "4 semanas",
     "description": "Descripción del curso",
     "price": 199.99
   }
   ```

## 🚀 Despliegue

### Variables de Entorno
```bash
# Desarrollo
JWT_SECRET=tu_secret_key_desarrollo
DATABASE_URL=postgresql://user:pass@localhost:5432/omega_dev
CORS_ORIGIN=http://localhost:4200

# Producción
JWT_SECRET=tu_secret_key_produccion
DATABASE_URL=postgresql://user:pass@prod-server:5432/omega_prod
CORS_ORIGIN=https://tu-frontend-produccion.com
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

## 📞 Soporte

Si necesitas ayuda con la implementación del backend, consulta:

1. La documentación de tu framework
2. Los logs del servidor para errores específicos
3. Las herramientas de desarrollo del navegador para ver las peticiones HTTP
4. El equipo de desarrollo para problemas específicos del proyecto 