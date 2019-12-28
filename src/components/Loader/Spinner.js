import Icon from '../../static/spinner.svg'
import styles from './styles.css'

export const Spinner = (styles = {}) => (
  <div className="spinner" aria-label="loading">
    <Icon
      style={{
        height: 25,
        width: 25,
        ...styles
      }}
    />
    <style jsx>{styles}</style>
  </div>
)
