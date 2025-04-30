## Astral Task

Task submission for Abdallah Ebrahim
The following application implements a calendar view with events that user can drag and drop them between calendar days

## Table of Contents

- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

For a scalable and maintainable solution, we followed clean architecture that separates concerns, supports scaling and ensure testability.

### 1. High level architecture

```
src/
├── components/
├── features/
│   ├── calendar/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── index.tsx
├── lib/
├── utils/
├── types/
```

### 2. Architecture layers

#### Data Layer

- handles API calls and caching logic
- using server components to fetch data
- Using singleton api instance to easily manage api integration
- handles api layer logs and configurations

Example:

```tsx
/* page.tsx */
const getEvents = async (): Promise<EventsByDate> => {
  return await api.getEvents();
};
```

```tsx
/* lib/api  */
export const api = {
  getEvents: async () => {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
  },
};
```

#### Domain layer

- Abstract the business logic
- Handles reuseable utility functions or custom hooks for each domain

Example:

```tsx
/* features/calendar/use-calendar */

export const useCalendar() {
  // abstract and handles calendar related business logic
}
```

#### Presentation Layer

- Handles UI components, screen and custom ui hooks
- Follows MVVM pattern where container integrates with data and business layer and responsible for getting/updating ui components

```tsx
export const Calendar() {
  const {state, updateSomething} = useCalendar()

  return (
    <UIComponent state={state} />
    <AnotherComponent onSomething={updateSomething} />
  )
}
```

#### State management

For the current requirements, there were no much need for a state management solution.

#### Testing

- TBD

## Tech Stack

- React
- Nextjs
- TailwindCSS
- Shadcnui
- dnd-kit
