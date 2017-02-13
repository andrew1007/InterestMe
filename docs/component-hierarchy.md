## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**BoardContainer**
 - HomeBoard
 - SelectedBoard
 - Sidebar

**PinContainer**
 - PinShow
 - PinNew
 - PinEdit

**SearchResultsContainer**
 - SearchBoard
 - SearchTag
 - SearchPin

**UserContainer**
  - UserBoards
  - UserPins
  - UserFollows
  - UserFollowers
## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "AuthFormContainer" |
| "/sign-in" | "AuthFormContainer" |
| "/home" | "HomeContainer" |
| "/home/board/:boardId" | "BoardContainer" |
| "/home/pin/:pinId" | "PinContainer" |
| "/home/pin/new" | "PinContainer" |
| "/home/pin/:pinId/edit" | "PinContainer" |
| "/home/search-results" | "SearchResultsContainer" |
| "/user/userID" | "UserContainer" |
