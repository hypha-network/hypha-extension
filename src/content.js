/*global chrome*/
import ReactDOM from 'react-dom'

class Main extends React.Component {
  render() {
    return (
      <div className={'extension'} style={{ width: 250 }}>
        <h1>Hello world - My first Extension</h1>
      </div>
    )
  }
}

const app = document.createElement('div')
app.id = 'extension-root'
document.body.appendChild(app)
ReactDOM.render(<Main />, app)

app.style.display = 'none'
