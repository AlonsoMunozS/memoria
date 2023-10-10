interface User {
    email: string,
    password: string
}
//let intervalID: NodeJS.Timeout | null = null;
const login = async (body: User) => {
    let status = null;
    await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            status = response.status;
            if (!response.ok) {
                throw new Error(`La solicitud falló con código de estado ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            localStorage['authToken'] = data.accessToken;
            localStorage['refreshToken'] = data.refreshToken;
            localStorage['expirationTime'] = data.expirationTime;


            const tokenSections = (data.accessToken || '').split('.')

            const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
            const payload = JSON.parse(payloadJSON)

            // const userRole = payload['cognito:groups'][0]
            const userId = payload['user_id']

        })
        .catch(error => {
            //console.error('Error de solicitud:', error.message);
        });
    /*if (intervalID) {
        clearInterval(intervalID);
        intervalID = null; // Reinicia el ID del intervalo.
      }
        let status: number | null = null;
        let accessToken: string | null = null;
        let refreshToken: string | null = null;
        let expirationTime: number | null = 0;
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            status = response.status;
            if (!response.ok) {
                throw new Error(`La solicitud falló con código de estado ${response.status}`);
              }
            const data = await response.json();
            localStorage['authToken'] = data.accessToken;
            localStorage['refreshToken'] = data.refreshToken;
            localStorage['expirationTime'] = data.expirationTime;
    
            if (accessToken && refreshToken) {
                startTokenExpirationCheck( refreshToken, expirationTime);
              }
        }
        catch (error) {
        }*/

    return status;
}

/*function startTokenExpirationCheck( refreshToken: string, expirationTime: number) {
  
    // Configura un intervalo para verificar periódicamente el tiempo restante en el accessToken.
    intervalID = setInterval(async () => {
      const expirationTimeSeconds = expirationTime/1000 // Obtener el tiempo de expiración del accessToken desde tu almacenamiento.
      const currentTime = Date.now() / 1000; // Obtener la hora actual en segundos.
  
      if (expirationTimeSeconds - currentTime < 300) { // 5 minutos o menos antes de que expire.
        try {
          // Usa el refreshToken para obtener un nuevo accessToken.
          const newAccessToken = await renewAccessToken(refreshToken);
          
          // Almacena el nuevo accessToken en el almacenamiento local.
          localStorage['authToken'] = newAccessToken;
        } catch (error) {
        }
      }
    }, 60000); // Verificar cada minuto, por ejemplo.
  }
function renewAccessToken(refreshToken:string){
    
}
*/
const refreshLogin = () => {
    let timestampActual = Date.now();
    let expirationTime = Number(localStorage.getItem('expirationTime'));
    if ((expirationTime - timestampActual) / 1000 < 300) {
        //Endpoint que refresca el token
    }

}
export {
    login,
    refreshLogin
};
