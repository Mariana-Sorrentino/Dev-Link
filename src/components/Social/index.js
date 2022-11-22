import './social.css';

export function Social({ children, url }) {
  return (      
    <a 
      className="linkSocial"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}                      
    </a>         
  )
}