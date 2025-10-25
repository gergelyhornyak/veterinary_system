# Veterinary System

TODO

gyógyszerek összevetése
kezelés menete - és szükséges mezők

## Funkciók

- nyilvántartás + tulajdonos lekérdezés
- tulajdonos bevitel + állat bevitel
- kezelési oldal + gyógyszer keresés
- megjegyzések és kezelés tervek keresése
- értesítések esedékes oltásokra, varratszedés, ilyenek

https://veterinarypartner.vin.com/default.aspx?pid=19239&catId=102887&ind=741

## Modellek

- Tulajdonos
- Állat
- Kórtörténet

## Adatok

rendelő:
- neve
- lakcíme
- telefonszáma
- email címe(i)

## Kórlap

tulajdonos adatai:
- teljes neve
- lakcíme
- telefonszáma
- email címe

állat adatai:
- pid
- neve
- faj
- fajtája
- ivara
- neme
- színe
- születési dátuma
- útlevélszáma
- útlevél kiáll. dátuma
- mikrochip szám
- tömeg

gyógyszer
- neve
- adagolása

Anamnézis

Symptoma

Therapia

Megjegyzés

Tünetek: (rangsorolva)
- vezető tünet (jelezve: "ez és ez!" vagy piros színnel)
- egyéb

## UX

Kezdőoldalon egyből a kereső jelenik meg:
gazdik nevét lehet keresni, valós-idejű találatok

change URL to /rendelo

change etc/hosts
add IP - rendelo

record types:

vaccination,
treatment,
receipt,
drug

## Cases

1. new owner - new pet

create new owner - new uuid
create new pet
assign pet to owner

2. existing owner - new pet

create new pet - new uuid
assign to assigned owner

3. existing owner - existing pet - switch owner

assign to assigned new owner
remove from assigned old owner
