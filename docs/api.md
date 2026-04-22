**API**

Para diseñar una aplicación web serverless en AWS según tus requisitos, el primer paso fundamental es definir la especificación OpenAPI. Esto actuará como el contrato entre tu frontend estático y tu backend de microservicios.

**Especificación OpenAPI**

Define los puntos de enlace principales que integrará tu API Gateway

openapi: 3.0.3

info:

&nbsp; title: API de Gestión de Talleres de Formación

&nbsp; version: 1.0.0

paths:

&nbsp; /talleres:

&nbsp; get:

&nbsp; summary: Listar todos los talleres disponibles

&nbsp; responses:

&nbsp; '200':

&nbsp; description: Lista de talleres

&nbsp; content:

&nbsp; application/json:

&nbsp; schema:

&nbsp; type: array

&nbsp; items:

&nbsp; \$ref: '#/components/schemas/Taller'

&nbsp; post:

&nbsp; summary: Crear un nuevo taller (Requiere Auth)

&nbsp; security:

&nbsp; - CognitoUserPool: \[\]

&nbsp; requestBody:

&nbsp; required: true

&nbsp; content:

&nbsp; application/json:

&nbsp; schema:

&nbsp; \$ref: '#/components/schemas/Taller'

&nbsp; responses:

&nbsp; '201':

&nbsp; description: Taller creado exitosamente

components:

&nbsp; securitySchemes:

&nbsp; CognitoUserPool:

&nbsp; type: apiKey

&nbsp; name: Authorization

&nbsp; in: header

&nbsp; x-amazon-apigateway-authtype: cognito_user_pools

&nbsp; schemas:

&nbsp; Taller:

&nbsp; type: object

&nbsp; properties:

&nbsp; id: { type: string }

&nbsp; titulo: { type: string }

&nbsp; fecha: { type: string, format: date-time }

&nbsp; instructor: { type: string }

**Infraestructura como Código (AWS SAM)**

Para desplegar esto de forma automatizada, **AWS SAM** es ideal para unir Lambda, DynamoDB y API Gateway.

AWSTemplateFormatVersion: '2010-09-09'

Transform: AWS::Serverless-2016-10-31

Resources:

&nbsp; TalleresTable:

&nbsp; Type: AWS::Serverless::SimpleTable # DynamoDB

&nbsp; Properties:

&nbsp; PrimaryKey:

&nbsp; Name: id

&nbsp; Type: String

&nbsp; GetTalleresFunction:

&nbsp; Type: AWS::Serverless::Function

&nbsp; Properties:

&nbsp; Handler: index.handler

&nbsp; Runtime: nodejs18.x

&nbsp; Events:

&nbsp; ApiEvent:

&nbsp; Type: Api

&nbsp; Properties:

&nbsp; Path: /talleres

&nbsp; Method: get

&nbsp; Policies:

&nbsp; - DynamoDBCrudPolicy: { TableName: !Ref TalleresTable }

**Lógica Backend (Lambda con Node.js)**

Esta función interactúa con **DynamoDB** y podría disparar un evento a **EventBridge** tras una creación.

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

&nbsp; const method = event.httpMethod;

&nbsp;

&nbsp; if (method === 'GET') {

&nbsp; const data = await dynamo.scan({ TableName: process.env.TABLE_NAME }).promise();

&nbsp; return { statusCode: 200, body: JSON.stringify(data.Items) };

&nbsp; }

&nbsp;

};