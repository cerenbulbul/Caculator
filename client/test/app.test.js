
import { ReactDOM } from 'react-dom'
import App from '../src/App'


it("render App", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App></App>)
})