# Conexión Frontend Angular con Backend Spring Boot

## 🎯 **Estado Actual**

✅ **Frontend Angular configurado** para conectarse con el backend  
✅ **Servicio de cursos actualizado** para usar el backend real  
✅ **Componente de prueba creado** para verificar la conexión  
✅ **Ruta agregada** para acceder al componente de prueba  

## 🚀 **Cómo Probar la Conexión**

### **Paso 1: Iniciar el Backend**
```bash
# En la carpeta del backend
cd backend
./mvnw spring-boot:run
```

**Verifica que aparezca:**
```
Started BackendApplication in X.XXX seconds
```

### **Paso 2: Iniciar el Frontend**
```bash
# En la carpeta del frontend
cd frontendOmegaCursos
ng serve
```

**Verifica que aparezca:**
```
✔ Browser application bundle generation complete.
✔ Compiled successfully.
```

### **Paso 3: Probar la Conexión**

1. **Abre tu navegador** y ve a: `http://localhost:4200/backend-test`

2. **Verás el componente de prueba** que:
   - ✅ Verifica automáticamente la conexión con el backend
   - ✅ Muestra el estado de conexión (Conectado/Desconectado)
   - ✅ Permite cargar cursos desde el backend
   - ✅ Muestra errores si hay problemas

## 🔧 **Características del Servicio Actualizado**

### **Métodos Disponibles:**
- `getCourses()` - Obtiene todos los cursos del backend
- `getCourseById(id)` - Obtiene un curso específico
- `createCourse(course)` - Crea un nuevo curso (requiere ADMIN)
- `updateCourse(id, course)` - Actualiza un curso (requiere ADMIN)
- `deleteCourse(id)` - Elimina un curso (requiere ADMIN)
- `testBackendConnection()` - Prueba la conexión con el backend

### **Manejo de Errores:**
- ✅ **Fallback automático** a datos mock si el backend no está disponible
- ✅ **Mensajes de error claros** en español
- ✅ **Logs en consola** para debugging

### **Interfaces TypeScript:**
```typescript
interface Course {
  id: number;
  title: string;
  modality: 'PRESENCIAL' | 'VIRTUAL';
  certification: string;
  duration: string;
  description: string;
  price: number;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
}
```

## 🧪 **Pruebas Disponibles**

### **1. Test de Conexión**
- Verifica que el backend esté respondiendo
- Muestra estado visual (verde = conectado, rojo = desconectado)

### **2. Carga de Cursos**
- Obtiene todos los cursos del backend
- Muestra los cursos en tarjetas con toda la información
- Incluye etiquetas, precios, modalidades, etc.

### **3. Manejo de Errores**
- Si el backend no está disponible, usa datos mock
- Muestra mensajes de error claros
- Notificaciones con Material Design

## 🔍 **Troubleshooting**

### **Problema: "Error de conexión"**
**Solución:**
1. Verifica que el backend esté corriendo en `http://localhost:8080`
2. Revisa la consola del navegador (F12) para errores específicos
3. Verifica que no haya problemas de CORS

### **Problema: "CORS Error"**
**Solución:**
- El backend ya tiene CORS configurado
- Verifica que la URL sea exactamente `http://localhost:8080`

### **Problema: "No se cargan los cursos"**
**Solución:**
1. Verifica que el backend tenga datos en la base de datos
2. Prueba directamente: `http://localhost:8080/courses`
3. Revisa los logs del backend

## 📱 **Próximos Pasos**

Una vez que la conexión funcione, puedes:

1. **Integrar el servicio** en tus componentes existentes
2. **Reemplazar datos mock** por datos reales del backend
3. **Agregar autenticación** para endpoints protegidos
4. **Implementar CRUD completo** para cursos

## 🎉 **¡Listo para Usar!**

Tu frontend Angular está completamente configurado para trabajar con tu backend Spring Boot. Solo necesitas:

1. **Ejecutar ambos servidores**
2. **Ir a `/backend-test`** para verificar la conexión
3. **¡Empezar a usar los datos reales!**

¿Necesitas ayuda con algún paso específico? 😊 