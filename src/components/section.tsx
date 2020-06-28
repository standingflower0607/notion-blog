import sharedStyles from '../styles/me.module.css'

export default props => (
  <div className={sharedStyles.section}>
    {props.title && <h3 className={sharedStyles.header}>{props.title}</h3>}
    <div className={sharedStyles.content}>
      {props.details && <p>{props.details}</p>}
      {props.link && (
        <p>
          more → <a href={props.link}>{props.link_title}</a>
        </p>
      )}
    </div>
  </div>
)
