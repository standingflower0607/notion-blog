import sharedStyles from '../styles/me.module.css'

export default props => (
  <div className={sharedStyles.section}>
    {props.title && <h2 className={sharedStyles.header}>{props.title}</h2>}
    <div className={sharedStyles.content}>
      {props.details && <p>{props.details}</p>}
      {props.link && (
        <p>
          <a href={props.link}>{props.link_title || '詳しく知る'}</a>
        </p>
      )}
    </div>
  </div>
)
