ENDPOINT="http://localhost/api/groups/create"
HEADER="Content-Type: application/json"
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"name\": \"Alpha Squad\",\"creatoruid\": \"3432423\"}"
#sleep 2
curl -X POST "$ENDPOINT" -H "$HEADER" -d "{\"name\": \"Harcosok Klubja\",\"creatoruid\": \"43242432\"}"

