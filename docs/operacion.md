**Operación**

Para completar el diseño de tu arquitectura serverless en AWS con las operaciones de alarmas, runbooks y copias de seguridad solicitadas, aquí tienes la propuesta técnica detallada:

**Alarmas y Observabilidad (CloudWatch)**

Configuraremos un sistema proactivo para detectar fallos antes de que afecten a los usuarios de los talleres.

**Métricas Críticas:**

Lambda: Errores de ejecución, duración (latencia) y throttles (estrangulamiento por concurrencia).

**API Gateway:** Errores 4XX/5XX y tiempo de respuesta de integración.

**DynamoDB:** Consumo de unidades de lectura/escritura (RCU/WCU) y errores del sistema.

**Notificación:** Las alarmas de CloudWatch dispararán un mensaje a un tema de Amazon SNS, que enviará correos electrónicos o integrará con herramientas como Slack.

**Runbooks (Systems Manager - SSM)**

Para automatizar la respuesta a incidentes comunes, utilizaremos SSM Documents.

**Escalado de Emergencia:** Un runbook para aumentar temporalmente los límites de concurrencia de Lambda o la capacidad de DynamoDB si se detecta un pico inusual de tráfico durante las inscripciones a los talleres.

**Revisión de Permisos:** Un documento que audite y restablezca roles de IAM si se detecta una deriva de configuración (drift).

**Limpieza de Logs:** Automatización para rotar logs de CloudWatch y optimizar costes de almacenamiento.

**Backup & Restore (DynamoDB On-Demand)**

La estrategia de recuperación ante desastres se centrará en la protección de los datos de los talleres y alumnos.

**On-Demand Backups:** Creación de copias de seguridad completas de las tablas de DynamoDB sin impacto en el rendimiento ni en la disponibilidad de la aplicación.

**Automatización:** Utilizaremos AWS Backup para programar estas copias "On-Demand" de forma diaria y definir políticas de retención (ej. guardar por 30 días).

**Point-in-Time Recovery (PITR):** Activaremos PITR para permitir restauraciones a cualquier segundo dentro de los últimos 35 días, ideal para recuperarse de borrados accidentales por errores de código.