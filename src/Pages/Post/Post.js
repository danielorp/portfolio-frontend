import { useHistory } from "react-router-dom";
import http from '../../Services/RequestService'

export default function Post() {

  let history = useHistory();

  function handleClick() {
    http.get('post/').then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
    history.push("/post");
    alert('Foi pra pagina')
  }

    return (
      <button type="button" onClick={handleClick}>
      Go home
    </button>
    );
  }