import { useHistory } from "react-router-dom";
import http from '../../Services/RequestService'
import curlirize from 'axios-curlirize';

curlirize(http);

export default function Post() {

  let history = useHistory();

  function handleClick() {
    http.get('post/', {withCredentials: true}).then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
    history.push("/post");
  }

    return (
      <button type="button" onClick={handleClick}>
      Go home
    </button>
    );
  }