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

## UX

Kezdőoldalon egyből a kereső jelenik meg:
gazdik nevét lehet keresni, valós-idejű találatok

change URL to /rendelo

change etc/hosts
add IP - rendelo