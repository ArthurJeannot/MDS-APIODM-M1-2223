- Lancer le projet: `node .\index.js`
- Emplacement de la documentation swagger: `/ressources/StarWars.OpenAPI.yml` 
- Port par défaut : 8080 > si changement : Changer dans `index.js` l.16 & Changer dans `StarWars.OpenAPI.yml` l.8

-----

## Model de maturité de Richardson 

**Définition**

Le Modèle de Maturité de Richardson, également connu sous le nom de Web Service Maturity Heuristic, est un modèle qui évalue le niveau de maturité des services Web. Il est basé sur plusieurs niveaux de progression :

- Niveau 0 : The Swamp of POX (Plain Old XML)
A ce niveau, les services web ne suivent pas les principes fondamentaux de l'architecture RESTful. Au lieu de cela, ils utilisent des protocoles basés sur SOAP (Simple Object Access Protocol) ou d'autres technologies similaires pour la communication. Une API a ce niveau n'est donc pas considéré comme RESTful.

- Niveau 1 : Ressources
À ce niveau, l'API respecte le modèle de données, et chaque ressource est identifiée par une URL. Par exemple, les requêtes peuvent être formulées comme GET `/peoples/14`. Cela permet de manipuler des ressources spécifiques de manière claire.

- Niveau 2 : Verbes HTTP
Ce niveau consiste à utiliser des méthodes HTTP autres que GET et POST pour indiquer l'action souhaitée, telles que PATCH, PUT et DELETE. Les codes de statut HTTP sont utilisés pour résumer le résultat de l'opération, tels que 200 (OK), 201 (Created), 204 (No Content pour les suppressions), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict), etc.

- Niveau 3 : Contrôles Hypermedia
Ce niveau met en avant l'utilisation de l'hypermedia, conformément à la thèse de Fielding. L'idée est d'incorporer une logique hypermédia similaire à celle du HTML dans les API REST. Cela se traduit principalement par la présence de liens dans les ressources, permettant de définir les relations avec d'autres ressources. Ainsi, l'API REST devient découvrable, facilitant la navigation et la découverte des fonctionnalités.


**Application dans le projet:**

Le Niveau 1 et 2 a été respecté avec le système de route d'express. 

- Les endpoints sont défini dans index.js, l33 à l39. 
- Les routers sont eux créer dans les fichier du dossier `/back/routes` et utilisent les méthodes HTTP appropriés (GET, POST, PATCH, DELETE).
- Les statuts de réussite sont envoyé en fonction du résultat depuis les controllers de `/back/controller`, par exemple en cas de réussite, 200 (par défaut) est renvoyé quand un body est envoyé par la réponse, 204 quand il n'y a pas de body ou encore 201 quand la création a marché.
- La majorité des messages d'erreurs sont gérer par défaut par Mongoose, avec également l'utilisation de schéma mongoose dans `back/models` pour la validation des champs par exemple. J'ai juste ajouter des erreurs 500 en cas de problème internes dans les controller.

Le Niveau 3 a été respecté en ajoutant les hrefs avant l'envoi du json de la réponse dans les controllers, grace a la méthode `addHATEOASlinks` dans les collection qui ont des tableaux avec des ids d'autres collection. La méthode permet de transformer les tableaux  d'ID en tableau d'objet json, avec l'id et un href pour permettre la navigations entre les endpoints.