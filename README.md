# GreekDevs

## Using dangerouslySetInnerHTML in a React application and sanitize HTML

click [here](https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/)

## TBD

- Build markdown hook for markdown &harr; HTML

```mermaid
graph TD
A[User Input] -->|Quill.js| B[Rich Text HTML]
B -->|Turndown| C[Markdown]
C -->|Store| D[Database]
D -->|Fetch| E[Markdown]
E -->|markdown-it| F[HTML for Display]
F -->|DOMPurify| G[Sanitized HTML]
G -->|Render| H[Web Page]
```
