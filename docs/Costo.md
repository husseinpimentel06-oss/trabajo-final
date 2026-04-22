**Costo**

El costo de esta arquitectura es altamente flexible porque se basa en un
modelo de pago por uso. Para una aplicación pequeña o mediana, es muy
probable que pagues cerca de \$0 USD al mes durante el primer año
gracias a la Capa Gratuita de AWS, y montos muy bajos después. 

Aquí tienes un desglose estimado para un tráfico de 100,000 peticiones
mensuales:

**1. Servicios que suelen ser GRATIS (Capa Gratuita)**

-   **Amazon Cognito**: Gratis para los primeros 10,000 usuarios activos
    mensuales **(**MAU).

-   **AWS Lambda**: Incluye 1 millón de solicitudes gratis al mes de
    forma permanente.

-   **DynamoDB**: Ofrece 25 GB de almacenamiento y suficiente capacidad
    de lectura/escritura para aplicaciones pequeñas de forma gratuita.

-   **CloudFront**: El primer 1 TB de transferencia de datos a internet
    es gratuito.

-   **S3**: Los primeros 5 GB de almacenamiento son gratuitos durante
    los primeros 12 meses. 

**2. Servicios con costo desde el día 1**

-   **API Gateway**: Es el componente más \"caro\" en esta escala.
    Cobran aproximadamente \$3.50 USD por cada millón de
    peticione**s** (si usas APIs REST) o mucho menos si usas APIs HTTP
    (\~\$1.00 por millón).

-   **Route 53 (Dominio)**: Alojar tu zona DNS cuesta \$0.50 USD al
    mes por dominio, más el costo anual del nombre (ej. .com suele
    costar \~\$12-15 USD/año).

-   **EventBridge Scheduler**: Cuesta \$1.00 USD por cada millón de
    eventos programados.

  -----------------------------------------------------------------------
  **Escala de Tráfico**        **Costo Estimado (Aprox.)**
  ---------------------------- ------------------------------------------
  Desarrollo / Pruebas         \$0.50 - \$1.00 USD

  Bajo (100k visitas)          \$1.00 - \$3.00 USD

  Medio (1M visitas)           \$10.00 - \$20.00 USD
  -----------------------------------------------------------------------
