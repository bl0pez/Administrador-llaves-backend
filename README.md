# Proyecto de administrador de llaves

## Descripción
Permite administrar las llaves y llevar un control de las mismas.

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias
3. Renombrar el archivo .example.env a .env


## Endpoints

### Llaves
#### GET /api/keys
Obtiene todas las llaves

#### GET /api/keys/:id
Obtiene una llave por su id

#### POST /api/keys
Crea una nueva llave

#### PUT /api/keys/:id
Actualiza una llave por su id

#### DELETE /api/keys/:id
Elimina una llave por su id

#

## Usuarios

#### POST /api/register
Crea un nuevo usuario

#### POST /api/login
Inicia sesión

#### GET api/validate
Refresca la sesión

#

### Llaves prestadas

#### GET /api/borrowedKeys
Obtiene todas las llaves prestadas

#### POST /api/borrowedKeys/create
Crea una nueva llave prestada

#### PUT /api/borrowedKeys/:id
Actualiza el estado de una llave prestada

#

### Historial de llaves prestadas

#### GET /api/keyHistory
Obtiene el historial de llaves prestadas
