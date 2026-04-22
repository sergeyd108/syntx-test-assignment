# The Chat App

A small Vue 3 chat SPA built as a take-home assignment: a sidebar with a chat list, URL-driven chat selection, message sending, and a pseudo-bot that replies.

## Stack

- **Vue 3** + Composition API, `<script setup>`, TypeScript
- **Vue Router** — chat navigation
- **Pinia** — chat list store
- **@nuxt/ui v4** + **Tailwind v4** — UI and styling
- **vue-virtual-scroller** — message list virtualization
- **Vite** — bundler, **oxlint** + **ESLint** + **oxfmt** — lint/format
- **pnpm** — package manager

## Getting started

```sh
pnpm install
pnpm dev          # dev server
pnpm build        # type-check + production build
pnpm preview      # preview the production build locally
pnpm lint         # oxlint + eslint --fix
pnpm type-check   # vue-tsc
pnpm format       # oxfmt
```

Requirements: Node `^20.19.0 || >=22.12.0`, pnpm 10+.

## Project layout

```
src/
├── api/              # mock API (setTimeout-based delays) + seed data
├── stores/           # Pinia: chat list, pin/unpin
├── features/
│   ├── chat/         # chat window, input, message, chat/bot composables
│   ├── chats-nav/    # chat navigation: tabs, provide/inject, pin
│   └── new-chat/     # create-chat modal + form
├── layout/           # AppLayout, AppHeader, AppSidebar, AppLogo
├── pages/            # IndexPage, ChatPage
├── router/           # Vue Router configuration
├── utils/            # delay, scrollToBottom, bot text generator
└── App.vue / main.ts
```

The code is organized by feature folders: a component and its composable live next to each other, feature boundaries are explicit, and `pages/` + `layout/` stay thin.

## Design decisions

**Messages live in a scoped composable, not in Pinia.** `useChatMessages` is created on the chat page via `provideChatMessages(chatId)` and torn down with it. This:

- avoids accumulating messages from every ever-opened chat in a global store;
- keeps the `shallowRef` message list local to the page, so the virtual scroller works against a direct source without extra subscriptions;
- makes the invariant "messages exist only while the chat is open" explicit.

The trade-off is no cross-navigation cache: reopening a chat refetches its messages. For this mock it is an intentional choice; in a real product it would be worth replacing with a per-chat cache in the store.

**`structuredClone` at the mock-API boundary.** `api/chats.ts` and `api/chat.ts` return cloned objects so neither the store nor components can accidentally mutate "server" state — closer to how a real HTTP client behaves.

**`shallowRef` for lists.** Both the chat list and the message list are stored in `shallowRef` and updated by array replacement — cheaper for Vue reactivity on large lists.

**Pseudo-bot via `watch(messages)`.** The reaction to "latest message is from the user" is scoped to the chat page (`provideBotResponse` in `ChatBox.vue`). Combined with the scoped message composable, this guarantees the bot never replies in the background of closed chats.

**Exhaustiveness check.** The `default` branch in `ChatListNavTabs.vue` returns `activeTab.value satisfies never` — TypeScript will fail the build if a new tab is added without updating the switch.

## CI/CD

`.github/workflows/deploy.yml`:

1. `ci` — `pnpm install` → `pnpm lint` → `pnpm type-check`.
2. `deploy` — `vercel deploy --prod` on push to `main`.

The deploy job expects `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` in the repository secrets. SPA rewrites are declared in `vercel.json`.
