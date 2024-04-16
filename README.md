# EPITECH Katana

![EPITECH Katana](https://link-to-logo.png)

## Introduction

Boys' Finny Meals E-Commerce project aims to develop a robust API for e-commerce merchant sites specializing in computer components. This README provides comprehensive guidance on the project requirements, including backend and frontend development, deployment using Docker, API specifications, user management, product catalog, orders, storage, frontend implementation, payment integration, and development environment setup.

## Project Overview

### Backend

The backend of the project will be developed using the latest Symfony framework.

### Frontend

The frontend will be implemented using React library with TypeScript.

### Deployment

Docker will be utilized for deploying the project, ensuring seamless integration and scalability.

## API Specifications

### REST Standard

The API will adhere to the REST standard and utilize JSON format for data representation. Tools such as api-platform are prohibited.

### Endpoint Structure

Endpoints will follow a structured format: `/api/endpoint/{variablePart}`. Variable parts will be replaced by appropriate values in requests.

### HTTP Verbs and Error Handling

Each endpoint will use the most suitable HTTP verb (GET, POST, PUT, or DELETE). HTTP response codes will be consistent and precise, providing meaningful feedback. Error responses will include descriptive error messages.

## User Management

### User Representation

A user will be represented with the following attributes:
- `login`
- `password`
- `email`
- `firstname`
- `lastname`

### User Actions

- Registration: `/api/register`
- Login: `/api/login` (returns authentication token)
- Update User Information: `/api/users` (authenticated)
- Display User Information: `/api/users` (authenticated)

## Catalog

### Product Representation

A product will include attributes such as `id`, `name`, `description`, `photo`, and `price`.

### Product Actions

- Retrieve List of Products: `/api/products`
- Retrieve Product Information: `/api/products/{productId}`
- Add Product: `/api/products` (authenticated)
- Modify and Delete Product: `/api/products/{productId}` (authenticated)
- Manage Shopping Cart: 
    - Add Product: `/api/carts/{productId}` (authenticated)
    - Remove Product: `/api/carts/{productId}` (authenticated)
    - View Cart: `/api/carts` (authenticated)
    - Validate Cart (Convert to Order): `/api/carts/validate` (authenticated)

## Orders

### Order Representation

An order will include attributes such as `id`, `totalPrice`, `creationDate`, and `products`.

### Order Actions

- Retrieve User's Orders: `/api/orders/` (authenticated)
- Get Order Information: `/api/orders/{orderId}` (authenticated)

## Storage

Data storage will be implemented using Postgresql. Database connection will be established using the `DATABASE_URL` environment variable.

## Frontend

The frontend will be developed using React with Typescript, implementing UI components corresponding to backend API routes.

## Payment

Stripe will be integrated for payment processing. Careful consideration will be given to ensure correct configuration to avoid potential issues.

## Development Environment

A development environment will be set up using PHP's built-in web server for Symfony application. The command `symfony server:start` will launch the application.

## Deployment

Deployment will be facilitated using Docker, with separate services for PHP, web server, and database. Docker Compose will orchestrate the containers, ensuring smooth deployment.

## Organization

The project will be organized incrementally, focusing on parallel development of API and deployment. Gradual additions will be made to the API functionality, followed by frontend implementation and payment integration.

---

*Version: 4*
