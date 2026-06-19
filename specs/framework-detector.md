# Framework Detector Specification

## Purpose

Detect backend frameworks, frontend frameworks, mobile frameworks, and runtime environments automatically from a repository.

Framework detection is used by:

* project-bootstrap
* architecture-detector
* bootstrap-engine

The detector should scan configuration files, lock files, project structure, and dependencies.

---

# Backend Frameworks

## Laravel

Indicators:

* composer.json
* artisan

Strong Indicators:

* config/app.php
* routes/web.php

Output:

framework:
backend: laravel

---

## Symfony

Indicators:

* composer.json
* bin/console

Output:

framework:
backend: symfony

---

## CodeIgniter

Indicators:

* app/Config
* spark

Output:

framework:
backend: codeigniter

---

## NestJS

Indicators:

* nest-cli.json

Output:

framework:
backend: nestjs

---

## Express

Indicators:

* package.json
* express dependency

Output:

framework:
backend: express

---

## Hapi

Indicators:

* package.json
* @hapi/hapi dependency

Output:

framework:
backend: hapi

---

## Fastify

Indicators:

* package.json
* fastify dependency

Output:

framework:
backend: fastify

---

## Django

Indicators:

* manage.py
* requirements.txt

Output:

framework:
backend: django

---

## FastAPI

Indicators:

* main.py
* fastapi dependency

Output:

framework:
backend: fastapi

---

## Spring Boot

Indicators:

* pom.xml
* src/main/java

Output:

framework:
backend: spring-boot

---

## ASP.NET Core

Indicators:

* *.csproj
* Program.cs

Output:

framework:
backend: aspnet-core

---

# Frontend Frameworks

## Vue

Indicators:

* vite.config.ts
* vue dependency

Output:

framework:
frontend: vue

---

## Nuxt

Indicators:

* nuxt.config.ts

Output:

framework:
frontend: nuxt

---

## React

Indicators:

* react dependency

Output:

framework:
frontend: react

---

## Next.js

Indicators:

* next.config.js
* next.config.ts

Output:

framework:
frontend: nextjs

---

## Angular

Indicators:

* angular.json

Output:

framework:
frontend: angular

---

## Svelte

Indicators:

* svelte.config.js

Output:

framework:
frontend: svelte

---

# Mobile Frameworks

## Flutter

Indicators:

* pubspec.yaml

Output:

framework:
mobile: flutter

---

## React Native

Indicators:

* react-native dependency

Output:

framework:
mobile: react-native

---

# Runtime Detection

## Node.js

Indicators:

* package.json

Output:

runtime:
nodejs

---

## PHP

Indicators:

* composer.json

Output:

runtime:
php

---

## Python

Indicators:

* requirements.txt
* pyproject.toml

Output:

runtime:
python

---

## Java

Indicators:

* pom.xml
* build.gradle

Output:

runtime:
java

---

# Monorepo Detection

Examples:

apps/
packages/

turbo.json

pnpm-workspace.yaml

Output:

repository:
type: monorepo

---

# Confidence Scoring

Each framework receives a score.

Example:

Laravel:
score: 100

Symfony:
score: 10

Highest score wins.

---

# Output Example

framework:
backend: laravel
frontend: vue

runtime:

* php
* nodejs

repository:
type: standard
