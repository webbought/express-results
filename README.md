##Express Results

###Installation
```shell
$ npm install express-results
```

###API
####.ok(content)
Generates a 200 OK result.

#####.created(content)
Generates a 201 Created result.

#####.noContent()
Generates a 204 No Content result.

#####.movedPermanently(url)
Generates a 301 Moved Permanently result.

#####.moveTemporarily(url)
Generates a 302 Move Temporarily result.

#####.badRequest(content)
Generates a 400 Bad Request result.

#####.forbidden(content)
Generates a 403 Forbidden result.

#####.unauthorized(content)
Generates a 401 Unauthorized result.

#####.notFound(content)
Generates a 404 Not Found result.

#####.internalServerError(content)
Generates a 500 Internal Server Error result.

