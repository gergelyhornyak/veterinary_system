# create 3x5 users (15) = 3 groups, 5 person each
USER_FILE="users.json"

USER_ENDPOINT="http://localhost/api/auth/register"
GROUP_ENDPOINT="http://localhost/api/groups/create"
HEADER="Content-Type: application/json"

jq -c '.[]' "$USER_FILE" | while read user; do
  USERNAME=$(echo "$user" | jq -r '.username')
  NICKNAME=$(echo "$user" | jq -r '.nickname')
  EMAIL=$(echo "$user" | jq -r '.email')
  PASSWORD=$(echo "$user" | jq -r '.password')

  echo "Registering user: $USERNAME"

  RESPONSE=$(curl -sS -X POST "$USER_ENDPOINT" \
       -H "$HEADER" \
       -d "{\"username\": \"$USERNAME\", \"nickname\": \"$NICKNAME\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

  UUID=$(echo "$RESPONSE" | jq -r '.uuid')

  echo "$USERNAME register with $UUID"

  echo -e "\n"
done
# create 3 groups with admins
# curl -X POST "$GROUP_ENDPOINT" -H "$HEADER" -d "{\"name\": \"HahaGang\",\"creatoruid\": \"\"}"
# curl -X POST "$GROUP_ENDPOINT" -H "$HEADER" -d "{\"name\": \"Jatilla\",\"creatoruid\": \"\"}"
# curl -X POST "$GROUP_ENDPOINT" -H "$HEADER" -d "{\"name\": \"SzokiCsopi\",\"creatoruid\": \"\"}"
# create 3x7 polls (21) = 7 polls per each groups
# activate 1 poll in each group