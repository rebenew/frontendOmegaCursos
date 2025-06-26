# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Omega Cursos Frontend!

## 🚀 Cómo Contribuir

### 1. Configuración del Entorno

1. **Fork del repositorio**
   ```bash
   git clone https://github.com/tu-usuario/omega-cursos-frontend.git
   cd omega-cursos-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   - Edita `src/environments/environment.ts` con las URLs de tu backend
   - Asegúrate de que el backend esté funcionando

4. **Ejecutar el proyecto**
   ```bash
   npm start
   ```

### 2. Flujo de Trabajo

1. **Crear una rama**
   ```bash
   git checkout -b feature/nombre-de-la-feature
   # o
   git checkout -b fix/nombre-del-fix
   ```

2. **Hacer cambios**
   - Escribe código limpio y bien documentado
   - Sigue las convenciones de Angular
   - Agrega tests cuando sea posible

3. **Commit de cambios**
   ```bash
   git add .
   git commit -m "feat: agregar nueva funcionalidad"
   ```

4. **Push a tu fork**
   ```bash
   git push origin feature/nombre-de-la-feature
   ```

5. **Crear Pull Request**
   - Ve a tu fork en GitHub
   - Crea un Pull Request hacia la rama `main`
   - Describe claramente los cambios

### 3. Convenciones de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, config, etc.

**Ejemplos:**
```bash
git commit -m "feat(auth): agregar sistema de refresh tokens"
git commit -m "fix(courses): corregir error en listado de cursos"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

### 4. Estándares de Código

#### TypeScript/Angular
- Usar TypeScript strict mode
- Interfaces para todos los modelos de datos
- Servicios para lógica de negocio
- Componentes solo para presentación
- Lazy loading para módulos grandes

#### Estructura de Archivos
```
src/app/
├── core/                    # Funcionalidades centrales
│   ├── guards/             # Guards de autenticación
│   ├── interceptors/       # Interceptores HTTP
│   ├── models/             # Modelos de datos
│   └── services/           # Servicios centralizados
├── shared/                 # Componentes compartidos
├── features/               # Módulos de características
└── pages/                  # Páginas principales
```

#### Nomenclatura
- **Componentes**: `kebab-case` (ej: `user-profile.component.ts`)
- **Servicios**: `camelCase` (ej: `userService.ts`)
- **Interfaces**: `PascalCase` (ej: `UserProfile.ts`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `API_ENDPOINTS`)

### 5. Testing

#### Tests Unitarios
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm test -- --watch
```

#### Tests de Integración
- Crear tests para servicios
- Mock de HTTP requests
- Verificar comportamiento de componentes

### 6. Linting y Formato

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
```

### 7. Pull Request Guidelines

#### Antes de enviar un PR:
- [ ] El código sigue las convenciones del proyecto
- [ ] Los tests pasan (`npm test`)
- [ ] El linting pasa (`npm run lint`)
- [ ] La documentación está actualizada
- [ ] Los cambios están probados localmente

#### Template del PR:
```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Cambios realizados
- Lista de cambios específicos

## Screenshots (si aplica)
Agregar capturas de pantalla si hay cambios en la UI

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He ejecutado los tests localmente
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
```

### 8. Reportar Issues

#### Template de Bug Report:
```markdown
## Descripción del Bug
Descripción clara y concisa del bug

## Pasos para reproducir
1. Ir a '...'
2. Hacer clic en '...'
3. Ver error

## Comportamiento esperado
Descripción de lo que debería pasar

## Screenshots
Capturas de pantalla si aplica

## Información del sistema
- OS: [ej: Windows 10]
- Browser: [ej: Chrome 120]
- Versión: [ej: 1.0.0]

## Información adicional
Cualquier contexto adicional
```

#### Template de Feature Request:
```markdown
## Descripción de la funcionalidad
Descripción clara de la funcionalidad deseada

## Problema que resuelve
Explicar qué problema resuelve esta funcionalidad

## Solución propuesta
Descripción de la solución propuesta

## Alternativas consideradas
Otras soluciones que se consideraron

## Información adicional
Cualquier contexto adicional
```

### 9. Comunicación

- **Issues**: Para bugs y feature requests
- **Discussions**: Para preguntas generales
- **Pull Requests**: Para contribuciones de código

### 10. Reconocimiento

Todas las contribuciones serán reconocidas en:
- El archivo `CHANGELOG.md`
- La sección de contribuidores del README
- Los releases de GitHub

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:
- Abre un issue en GitHub
- Únete a las discusiones del proyecto
- Contacta al equipo de desarrollo

¡Gracias por contribuir a hacer Omega Cursos mejor! 🎉 