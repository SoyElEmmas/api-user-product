** se puede correr mediante el comando npm run dev
** El servidor se levanta en el puerto 3000 de localhost
** Existen 3 tipos de roles: admin, moderator y user
** Para poder iniciar a crear usuarios es necesario crear una petición post a la URL http://localhost:3000/api/auth/signup y colocarle roles, ejemplo:
{
	"username": "emmas",
	"email": "emmas@kings.com",
	"password": "admin123",
	"roles":["moderator","admin"]
}
** Si no se colocan roles, se pondrá user, por defecto
** El token devuelto por la API, tiene una vigencia de 30 minutos, para renovarlo se puede hacer una petición a la URL http://localhost:3000/api/auth/signin, ejemplo:
{
    "email": "emmas@kings.com",
	"password": "admin123"
}
** El resto de los endpoints disponibles requieren de mandar, al menos, un header de nombre
access-token y en el valor colocar el token
** Tanto para Users como para Products existe CRUD, las rutas tienen diferentes niveles de protección y estos pueden ser modificados