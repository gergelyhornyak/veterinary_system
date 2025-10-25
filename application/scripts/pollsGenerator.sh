ENDPOINT="http://192.168.0.19/api/poll/create"
HEADER="Content-Type: application/json"
GID="59f8a3d7-0f78-462d-ab39-f442c16df8ef"

curl -X POST "$ENDPOINT" \
    -H "$HEADER" \
    -d '{
        "pollData": {
            "question": "Which realm shall we journey to next?",
            "type": "single-choice",
            "options": ["Forest of Shadows", "Crystal Mountains", "Sunken Ruins"],
            "pollster": "Dungeon Master",
            "gid": "83e0b3cc-3b5d-4678-8923-913f553c2481"
        },
        "creatoruid": "12345"
    }'

curl -X POST "$ENDPOINT" \
    -H "$HEADER" \
    -d '{
        "pollData": {
            "question": "Who is most likely to eat kebab super spicy?",
            "type": "single-choice",
            "options": {"o1":"person1", "o2":"person2", "o3":"person3", "o4":"person4"},
            "pollster": "person3",
            "gid": "59f8a3d7-0f78-462d-ab39-f442c16df8ef",
            "lang": "UK"
        },
        "creatoruid": "9274931",
        "isPublic": true
    }'

curl -X POST "$ENDPOINT" \
    -H "$HEADER" \
    -d '{
        "pollData": {
            "question": "Who is most likely to eat kebab super spicy?",
            "type": "single-choice",
            "options": ["person1", "person2", "person3", "person4"],
            "pollster": "person3",
            "gid": "e877e2a4-f9ee-40bb-8f6a-a3206c33ff27"
        },
        "creatoruid": "9274932"
    }'

curl -X POST "$ENDPOINT" \
    -H "$HEADER" \
    -d '{
        "pollData": {
            "question": "Who will live alone?",
            "type": "single-choice",
            "options": ["person1", "person2", "person3", "person4"],
            "pollster": "person5",
            "gid": "e877e2a4-f9ee-40bb-8f6a-a3206c33ff27"
        },
        "creatoruid": "9274932"
    }'