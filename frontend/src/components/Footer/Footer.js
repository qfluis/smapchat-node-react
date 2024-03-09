import React, {useState} from 'react'
import gmailPicture from './gmail.png';
import linkedinPicture from './linkedin.png';
import githubPicture from './github.png';


export const Footer = () => {

  const [moreInfo, setMoreInfo] = useState(false);

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  }

    return (
    <footer class="m-0 mt-auto bg-dark text-light p-2">
      <h5>&copy; Luis Quevedo <button onClick={toggleMoreInfo} className='btn btn-success' >
        {(moreInfo)?'Less info':'More info'}
        </button></h5>
      {
      (moreInfo)
      ?
      <ul>
        <li><img src={gmailPicture} width="20" alt="email" class="me-2" /><a href="mailto:qfluis@gmail.com">qfluis@gmail.com</a></li>
        <li><img src={linkedinPicture} width="20" alt="linkedin" class="me-2" /><a href="https://www.linkedin.com/in/luisquevedoferreiros/">luisquevedoferreiros</a></li>
        <li><img src={githubPicture} width="20" alt="github" class="me-2" /><a href="https://github.com/qfluis">qfluis</a></li>
      </ul>   
      :"" 
      }
    </footer>
  )
}
