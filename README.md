# App Registro de Clientes

Este é um aplicativo completo que implementa todas as funcionalidades propostas no sistema. O sistema está completamente dockerizado, permitindo uma configuração rápida e fácil.

## Requisitos

- Docker >= 26.1.3
- Docker Compose

## Instalação e Configuração

Após instalar Docker e Docker Compose, execute o seguinte comando no terminal para configurar o sistema:

```sh
docker compose up --build
```

Este comando baixará todas as dependências do projeto e configurará automaticamente o ambiente de desenvolvimento. Banco, server e client, o código conta com seeds e configuração automática do banco. Os logs serão exibidos no terminal; fique atento ao container client, que indicará onde sua aplicação foi iniciada. Por exemplo:

Log Example
![alt text](readme2024-06-24_11-25.png)

## Acesso ao Sistema

Para acessar o sistema, utilize as seguintes credenciais:

- **Email:** admin@admin.com
- **Senha:** admin

Apenas a rota de login (signin) não requer autenticação. As demais rotas do CRUD exigem um token de acesso retornado pelo próprio signin.

## Estrutura do Projeto

O projeto está dividido em duas partes: `client` e `server`. O banco de dados é um container MySQL. Aqui estão mais detalhes sobre cada parte:

- **Client:** Desenvolvido com Next.js 14, utilizando TypeScript.
- **Server:** Desenvolvido com Node.js e Prisma ORM, também utilizando TypeScript.

## Tecnologias Utilizadas

- **Frontend:** Shadcn UI para componentes de interface.
- **Backend:** Node.js, Prisma ORM
- **Database:** MySQL (em container Docker)


