ENDPOINT="http://localhost/api/polls/set/dailypoll/"
HEADER="Content-Type: application/json"
GID="$1"

curl -X POST "$ENDPOINT/$1" \
    -H "$HEADER"