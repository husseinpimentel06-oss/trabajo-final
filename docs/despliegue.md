**Despliegue**

Para desplegar una arquitectura Serverless en AWS utilizando el AWS CDK (Cloud Development Kit), los comandos principales y la estructura del pipeline se centran en transformar tu código de infraestructura (TypeScript/Python/etc.) en plantillas de CloudFormation y ejecutarlas.

**Comandos Esenciales de AWS CDK**

Desde tu terminal en la raíz del proyecto:

- **npm install:** Instala las dependencias del CDK y de tu aplicación.
- **cdk bootstrap:** (Solo la primera vez) Prepara tu cuenta de AWS (crea un bucket de S3 para assets) en la región específica donde vas a desplegar.
- **cdk synth:** Genera la plantilla de CloudFormation a partir de tu código. Útil para verificar que no hay errores de síntesis.
- **cdk diff:** Compara tu código local con lo que ya está desplegado en AWS. Te muestra exactamente qué recursos se crearán, modificarán o destruirán.
- **cdk deploy:** Compila y despliega la infraestructura en tu cuenta de AWS.

Usa --all si tienes múltiples stacks (ej. Front y Back separados).

Usa --require-approval never en entornos automatizados (pipelines).

**Estructura del Pipeline (CI/CD)**

Para una aplicación profesional, el pipeline suele dividirse en estas etapas (usando AWS CodePipeline con CDK Pipelines o GitHub Actions):

- Etapa de Source (Origen)
- Detecta cambios en tu repositorio (GitHub, CodeCommit).
- Etapa de Build (Construcción)
- Instalar dependencias (npm ci).
- Ejecutar tests unitarios (Linter, Jest).
- Ejecutar npx cdk synth para generar los artefactos de CloudFormation.
- Etapa de Deploy (Despliegue)
- El pipeline ejecuta internamente el despliegue de los stacks definidos:
- Infraestructura Base: VPC (si aplica), IAM Roles, Cognito User Pools.
- Backend: DynamoDB, API Gateway y funciones Lambda.
- Frontend: S3 para el hosting estático y CloudFront para la distribución.