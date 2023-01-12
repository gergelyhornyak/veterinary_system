import flask
from flask import g
from med_rec_editor import Korlap,write_md

app = flask.Flask(__name__)

@app.route("/")
def main():
    return flask.render_template('med_rec_editor_webpage.html')

@app.route("/form", methods=["GET","POST"])
def submit_form():
    datenow = flask.request.form.get("datenow")
    owner_name = flask.request.form.get("owner_name")
    owner_address = flask.request.form.get("owner_address")
    owner_mobile = flask.request.form.get("owner_mobile")
    owner_email = flask.request.form.get("owner_email")
    pet_id = flask.request.form.get("pet_id")
    pet_name = flask.request.form.get("pet_name")
    pet_species =flask.request.form.get("pet_species")
    pet_breed = flask.request.form.get("pet_breed")
    pet_colour=flask.request.form.get("pet_colour")
    pet_born = flask.request.form.get("pet_born")
    pet_sex = flask.request.form.get("pet_sex")
    pet_passport_num = flask.request.form.get("pet_passport_num")
    pet_passport_date = flask.request.form.get("pet_passport_date")
    pet_chip_id = flask.request.form.get("pet_chip_id")
    pet_weight = flask.request.form.get("pet_weight")
    anamnesis = flask.request.form.get("anamnesis")
    symptoms = flask.request.form.get("symptoms")
    therapia = flask.request.form.get("therapia")
    notes = flask.request.form.get("notes")

    med_rec01 = Korlap("Felsőgödi Kisállatrendelő KFT.","Göd, Bozóky Gyula tér 3","kisallatrendelo@gmail.com",
    "32432423","+369382112",datenow,"Szamosi","Judit",owner_name,"",owner_address,owner_email,
    owner_mobile,pet_id,pet_name,pet_species,pet_breed,pet_colour,pet_born,pet_sex,pet_passport_num,pet_passport_date,pet_chip_id,pet_weight,anamnesis,symptoms,therapia,notes)
    write_md(med_rec01)

    return flask.redirect(flask.url_for("main"))