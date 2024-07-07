# Nogwon

### [Website](https://nogwon.com/)

> **Currently switching to the music sharing platform Nogwon**
> 

## **Update history**

### 2024.07.08

Web - 100% (Complete)

Program - 90%

App - 0% (Before the start)

# ~~Turborepo-kit~~

<img width="2790" alt="turborepo-kit" src="https://github.com/kdnhyk/turborepo-kit/assets/64140936/87085222-86e3-46b6-90bd-28cf6a9f9cd8">

The Tuborepo-kit is a Turborepo-based multi-platform dedicated monorepo boilerplate designed for general use in Web (Next.js), App (Expo) + Webview (Next.js), and Program (Tauri, Next.js).

### [Demo website](https://turborepo-kit.01.works/)
    

## Dependency(Library)

### Global

Supabase - @supabase/supabase-js(Client side), @supabase/ssr(Server side)

Tailwindcss - Styling (App with nativewind)

TanStack Query - Global state management

React-hook-form - Form management

### Animation

Framer-motion (Next.js)

React-native-reanimated (Expo)

## About

```
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ app
  |   ├─ Expo SDK 51
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   └─ Tailwind CSS using NativeWind
  ├─ program
  |   ├─ Tauri 1.6
  |   ├─ Next.js 14 using React 18 (Static Exports)
  |   ├─ Auth using tauri-plugin-oauth
  |   └─ Tailwind CSS
  ├─ web
  |   ├─ Next.js 14 using React 18
  |   ├─ React Server Component with PrefetchQuery
  |   ├─ Tailwind CSS
  |   └─ @supabase/ssr
  └─ webview
      ├─ Next.js 14 using React 18
      ├─ React Server Component with PrefetchQuery
      ├─ Tailwind CSS
      ├─ @supabase/ssr
      └─ Only using webview for App
packages
  ├─ api
  |   └─ Api using Supabase client
  ├─ eslint-config
  |   └─ Shared eslint configuration
  ├─ query
  |   └─ State management using TanStack-query
  ├─ supabase
  |   └─ Supabase client, Edge functions
  ├─ tailwind-config
  |   └─ Shared tailwind configuration
  ├─ typescript-config
  |   └─ Shared tsconfig
  ├─ ui
  |   └─ Shared ui using Framer-motion, React-hook-form
  ├─ ui-app
  |   └─ Shared ui for app using Reanimated
  └─ utils
      └─ Shared utils

```

## Quick Start

### 1. Install

```bash
git clone <https://github.com/01-works/turborepo-kit.git>
```

```bash
pnpm install
```

### 2. Supabase setup

```sql
create table
  public.profile (
    user_id uuid primary key,
    profile_image text,
    nickname text not null,
    foreign key (user_id) references auth.users (id)
  );

```

```sql
create table
  public.post (
    id number primary key
    user_id uuid,
    title text not null,
    content text,
    foreign key (user_id) references auth.users (id)
  );

```

Create a project in [Supabase](https://supabase.com/) and create profile/post table, and profile storage. (RLS settings omitted)

### **3. Environment Variables setup**

```bash
cp .env.example .env.local
```

Set the Supabase environment variable for each project.

### 3. Run

Please refer to the official documents of [Expo](https://docs.expo.dev/), [Next.js](https://nextjs.org/docs), and [Tauri](https://tauri.app/ko/v1/guides/) for pre-setting for each environment.

- app
    
    ```bash
    pnpm run dev
    ```
    
- program
    
    ```bash
    pnpm tauri dev
    ```
    
- web
    
    ```bash
    pnpm run dev
    ```
    

### 4. A**dditional** C**ommand (supabase)**

```bash
supabase init
supabase login
supabase link
```

 Running the above commands in order and entering `pnpm gen-types` creates the `database.types.ts` file.
