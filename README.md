# Police crime reports

_A test task by Michael Lutsenko_

## Getting it to run

Run `npm install` to install dependencies. Run `npm start` to launch the app in development mode.

## Development notes

Due to time constraints I treated the app as a prototype or proof-of-concept. This dictated some of my choices: a simpler approach here and there. I tried to explain as my of my thinking process in the commentaries within the code. In general I tried to make things as simple as possible, but with possibility of extending them easily.

The environment was set up with use of `create-react-app` and the app is using `redux` for state management, `redux-thunk` for asynchronous calls. For the dropdown I used `react-select` and the tests were written with `jest` and `react-testing-library`

### State Management

The approach I took when designing the shape of the app's state was rather simplistic. There is no right or wrong approach and the minimalistic way with a simple `actions` and `reducers` folders fits the complexity of the task. Every project is a living, growing entity and this approach feels like a good place to start, easy to modify in case of potential expansions of functionality.
### Styles

I didn't try to make it as beautiful as possible, so the styles are pretty basic. As I said, I treated it as more of a prototype. The visual part in no way displays my knowledge of CSS and building layouts. I figured, the task was more concerned with the actual business logic and architectural approaches.

### Testing

I covered some cases of various difficulty in tests. Of course, the tests can be expanded but for time's sake I only implemented several tests for each of the components mentioned in the actual task description.