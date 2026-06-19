# Architecture Detector Specification

## Purpose

Detect software architecture patterns used in a project repository.

The detector should analyze folder structures, naming conventions, dependency flow, and project organization.

Framework detection is handled separately by framework-detector.

---

# Supported Architectures

## MVC

Indicators:

* Controllers
* Models
* Views

Examples:

Laravel MVC
CodeIgniter
ASP.NET MVC

Detection Rules:

* app/Http/Controllers
* app/Models
* resources/views

Output:

architecture:
pattern: mvc

---

## SOLID / Layered Architecture

Indicators:

* Services
* Repositories
* Interfaces
* Dependency Injection

Examples:

Controller
→ Service
→ Interface
→ Repository
→ Model

Detection Rules:

* app/Services
* app/Repositories
* app/Interfaces

Output:

architecture:
pattern: solid

---

## Clean Architecture

Indicators:

* Domain
* Application
* Infrastructure
* Presentation

Detection Rules:

* src/Domain
* src/Application
* src/Infrastructure
* src/Presentation

Output:

architecture:
pattern: clean-architecture

---

## Domain Driven Design (DDD)

Indicators:

* Aggregates
* Entities
* Value Objects
* Bounded Contexts

Detection Rules:

* src/Domains
* src/Contexts
* src/Aggregates

Output:

architecture:
pattern: ddd

---

## Hexagonal Architecture

Indicators:

* Ports
* Adapters

Detection Rules:

* src/Ports
* src/Adapters

Output:

architecture:
pattern: hexagonal

---

## Modular Architecture

Indicators:

* Modules

Detection Rules:

* src/modules
* app/modules

Output:

architecture:
pattern: modular

---

## Feature-Based Architecture

Indicators:

* Features
* Shared

Detection Rules:

* src/features
* src/shared

Output:

architecture:
pattern: feature-based

---

## Microservices

Indicators:

* Multiple services
* Service boundaries

Detection Rules:

* services/*
* docker-compose.yml
* multiple APIs

Output:

architecture:
pattern: microservices

---

# Confidence Scoring

Each architecture receives a score.

Example:

SOLID:
score: 90

MVC:
score: 40

Highest score wins.

---

# Multiple Architecture Support

Projects may contain multiple patterns.

Example:

architecture:
primary: solid
secondary:
- modular
- feature-based

---

# Output Example

architecture:
primary: solid

secondary:
- modular

confidence: 92
