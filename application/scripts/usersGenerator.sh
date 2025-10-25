ENDPOINT="http://localhost/api/auth/register"
HEADER="Content-Type: application/json"

curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"admin\",\"nickname\": \"admin\",\"email\": \"admin.zf@gmail.com\",\"password\": \"admin\"}"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"James McRoll\",\"nickname\": \"jamie\",\"email\": \"james.mc@gmail.com\",\"password\": \"james123\"}"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"Ritha Othello\",\"nickname\": \"ritha\",\"email\": \"ritha.o@gmail.com\",\"password\": \"ritha123\"}"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"Carlos Montoya\",\"nickname\": \"carlo\",\"email\": \"carlos.mot@gmail.com\",\"password\": \"carlos123\"}"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"Alex Bulder\",\"nickname\": \"alex\",\"email\": \"ab@gmail.com\",\"password\": \"alex123\"}"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"username\": \"Fiona Shilling\",\"nickname\": \"fiona\",\"email\": \"fshill@gmail.com\",\"password\": \"fiona123\"}"

