import axios from "axios";

useEffect(() => {
    axios.get('http://localhost:8000/api/personas/')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las personas", error);
      });
  }, []);