# React Quality Demo

Un proyecto de demostración para el curso de Gestión de Calidad que incluye componentes React con **code smells intencionales**, cobertura de pruebas limitada, y integración con SonarQube.

## 🎯 Propósito

Este proyecto está diseñado específicamente para enseñar conceptos de calidad de software mediante ejemplos prácticos de:

- **Code Smells**: Problemas de calidad de código comunes
- **Cobertura de Pruebas**: Configuración para mantener cobertura <75%
- **Análisis Estático**: Integración con SonarQube
- **Buenas Prácticas**: Qué hacer y qué NO hacer

## 🛠️ Tecnologías

- **React 18** con TypeScript/JavaScript
- **Vite** como bundler
- **Jest** + Testing Library para pruebas
- **PNPM** como gestor de paquetes
- **ESLint** para análisis estático
- **SonarQube** para análisis de calidad
- **Node.js 22.17.0**

## 📦 Instalación

### Requisitos Previos

```bash
# Instalar Node.js 22.17.0 (usar nvm recomendado)
nvm use

# Instalar PNPM
npm install -g pnpm
```

### Configuración del Proyecto

```bash
# Clonar el repositorio
git clone <repository-url>
cd react-quality-demo

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

## 🧪 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                    # Servidor de desarrollo
pnpm build                  # Build para producción
pnpm preview               # Preview del build

# Pruebas
pnpm test                   # Ejecutar pruebas
pnpm test:watch            # Pruebas en modo watch
pnpm test:coverage         # Generar reporte de cobertura

# Calidad
pnpm lint                   # Ejecutar ESLint
pnpm lint:fix              # Arreglar problemas automáticamente
pnpm sonar                 # Ejecutar análisis SonarQube
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes React (con code smells)
│   ├── Calculator.tsx   # Calculadora con lógica compleja
│   ├── UserList.tsx     # Lista de usuarios con problemas de rendimiento
│   ├── TodoApp.tsx      # App de todos con mutaciones directas
│   ├── WeatherWidget.tsx # Widget del clima con hardcoding
│   └── ProductCatalog.tsx # Catálogo con funciones muy largas
├── utils/               # Utilidades (con problemas de diseño)
│   └── helpers.js       # Funciones con múltiples responsabilidades
├── __tests__/          # Pruebas unitarias (cobertura parcial)
└── App.tsx             # Componente principal
```

## 🚨 Code Smells Incluidos

### 1. **Funciones Muy Largas**
- `processUserData()` en `helpers.js`
- Múltiples responsabilidades en una función

### 2. **Código Duplicado**
- `formatUserName()` y `formatCustomerName()`
- Lógica repetida de formateo

### 3. **Condicionales Complejas**
- Rendering condicional anidado en componentes
- Switch statements largos

### 4. **Acoplamiento Alto**
- Dependencias hardcodeadas
- Props drilling

### 5. **Mutación Directa de Estado**
- Modificación directa de objetos en `TodoApp.tsx`

### 6. **Falta de Manejo de Errores**
- Try-catch genéricos o inexistentes
- No validación de inputs

### 7. **Magic Numbers/Strings**
- Valores hardcodeados sin constantes
- URLs y configuraciones inline

### 8. **Console.log en Producción**
- Debugging statements olvidados
- Información sensible en logs

## 📊 Cobertura de Pruebas

El proyecto está configurado intencionalmente para mantener una **cobertura <75%**:

### Componentes Probados (Parcialmente):
- ✅ `App.tsx` - Navegación básica
- ✅ `Calculator.tsx` - Operaciones básicas
- ✅ `UserList.tsx` - Rendering inicial
- ✅ `helpers.js` - Algunas utilidades

### Componentes SIN Probar:
- ❌ `WeatherWidget.tsx`
- ❌ `ProductCatalog.tsx`
- ❌ `TodoApp.tsx`
- ❌ Muchas funciones en `helpers.js`

```bash
# Ver reporte de cobertura
pnpm test:coverage
```

## 🔍 Análisis con SonarQube

### Configuración Local

1. **Instalar SonarQube**:
```bash
# Con Docker
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest

# O descargar desde https://www.sonarqube.org/downloads/
```

2. **Configurar Token**:
```bash
# Crear token en SonarQube UI (http://localhost:9000)
export SONAR_TOKEN=your-token-here
```

3. **Ejecutar Análisis**:
```bash
# Generar cobertura primero
pnpm test:coverage

# Ejecutar SonarQube Scanner
pnpm sonar
```

### Configuración en CI/CD

```yaml
# Ejemplo para GitHub Actions
- name: SonarQube Scan
  uses: sonarqube-quality-gate-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 📈 Métricas de Calidad Esperadas

### SonarQube Quality Gate (Configurado para FALLAR):
- **Coverage**: <75% ❌
- **Duplicated Lines**: >3% ❌
- **Maintainability Rating**: C o peor ❌
- **Code Smells**: >50 ❌
- **Technical Debt**: >2h ❌

### ESLint Issues:
- Warnings por `console.log`
- Errors por variables no usadas
- Problemas de complejidad ciclomática

## 🎓 Uso Pedagógico

### Para Estudiantes:

1. **Analizar Code Smells**:
   - Identificar problemas en cada componente
   - Proponer soluciones de refactoring

2. **Mejorar Cobertura**:
   - Escribir pruebas para componentes faltantes
   - Alcanzar >80% de cobertura

3. **Arreglar Problemas de Calidad**:
   - Resolver issues de SonarQube
   - Pasar el Quality Gate

### Para Profesores:

- Usar como ejemplo de "qué NO hacer"
- Demostrar impacto de métricas de calidad
- Ejercicios de refactoring guiados

## 🔧 Configuración de Desarrollo

### VS Code Extensions Recomendadas:
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "sonarqube.sonarqube-vscode"
  ]
}
```

### Configuración de Git Hooks:
```bash
# Pre-commit: ejecutar linting
pnpm lint

# Pre-push: ejecutar pruebas
pnpm test
```

## 📚 Recursos Adicionales

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Clean Code Principles](https://clean-code-developer.com/)

## 🤝 Contribuir

Para propósitos educativos:

1. Fork el proyecto
2. Crear rama para mejoras (`git checkout -b feature/improve-quality`)
3. Hacer commit de cambios (`git commit -m 'Fix: Resolve code smells in Calculator'`)
4. Push a la rama (`git push origin feature/improve-quality`)
5. Crear Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**⚠️ Nota**: Este proyecto contiene problemas de calidad INTENCIONALMENTE para propósitos educativos. NO usar como base para proyectos de producción.