import json

class Korlap:
    def __init__(self,_hospital_name,_hospital_address,
    _hospital_email,_hospital_telephone,_hospital_mobile,_hospital_banner,
    _med_chart_date,_vet_fname,_vet_sname,_owner_fname,_owner_sname,_owner_address,
    _owner_email,_owner_mobile,_pet_id,_pet_name,_pet_species,
    _pet_breed,_pet_colour,_pet_born,_pet_sex,_pet_passport_num,
    _pet_passport_date,_pet_chip_id,_pet_weight,_anamnesis,_symptoms,_therapy,_notes):
        """Hosp-name, hosp-addr, hosp-email, hosp-tel, hosp-mobile, hosp-banner, 
        med_rec_date, vet_fname, vet_sname"""
        self.hospital_name=_hospital_name
        self.hospital_address=_hospital_address
        self.hospital_email=_hospital_email
        self.hospital_telephone=_hospital_telephone
        self.hospital_mobile=_hospital_mobile
        
        self.veterinarian_first_name=_vet_fname
        self.veterinarian_last_name=_vet_sname
        self.vet_name="Dr. "+self.veterinarian_first_name+" "+self.veterinarian_last_name
        
        self.med_chart_date=_med_chart_date

        self.owner_first_name=_owner_fname
        self.owner_last_name=_owner_sname
        self.owner_name = self.owner_first_name+" "+self.owner_last_name
        
        self.owner_address=_owner_address
        self.owner_email=_owner_email
        self.owner_mobile=_owner_mobile
        self.pet_id=_pet_id
        self.pet_name=_pet_name
        self.pet_species=_pet_species
        self.pet_breed=_pet_breed
        self.pet_colour=_pet_colour
        self.pet_born=_pet_born
        if _pet_sex == 0:
            self.pet_sex="szuka"
        else:
            self.pet_sex="kan"
        self.pet_passport_num=_pet_passport_num
        self.pet_passport_date=_pet_passport_date
        self.pet_chip_id=_pet_chip_id
        self.pet_weight=_pet_weight
        self.anamnesis = _anamnesis
        self.symptoms=_symptoms
        self.therapy=_therapy
        self.notes=_notes

        self.hospital_banner=_hospital_banner

        # pet_sex changer into different function

        # write_md under class

def write_md(k):
    f = open("demo_med_rec.html","w")
    html_code_pre="""
<html>
    <head>
        <style>
            * {
            box-sizing: border-box;

            }
            
            .columnl {
            float: left;
            width: 50%;
            }

            .columnl2 {
            float: left;
            width: 70%;
            }
            
            .columnr2 {
            text-align: right;
            float: right;
            width: 30%;
            }
            
            .columnr {
            text-align: right;
            float: right;
            width: 50%;
            }

            .column {
            float: left;
            width: 30%;
            }
            .column_owner {
            float: left;
            width: 35%;
            }
            .column_pet {
            float: left;
            width: 65%;
            }

            .row:after {
            content: '';
            display: table;
            clear: both;
            }
    """
    html_code=f"""
        </style>
    </head>
    <body>
        <center><h1>{k.hospital_name}</h1>
        <h4>{k.hospital_banner}</h4></center>

        <div class="row">
            <div class="columnl">
                {k.hospital_address}
            </div>
            <div class="columnr">
                Tel.: {k.hospital_telephone} | {k.hospital_mobile}
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="columnl2" style="font-size: 12px;">
                Nyomtatási adatok: {k.hospital_name}, {k.vet_name}
            </div>
            <div class="columnr2" style="font-size: 12px;">
                Dátum: {k.med_chart_date}
            </div>
        </div>
        <hr>
        <br>
        <center><h2>KÓRLAP</h2></center>
        <br>

        <div class="row">
            <div class="column_owner" style="font-size: 14px;">
                <p><u>Tulajdonos adatai:</u></p>
                <p>{k.owner_name}</p>
                <p>{k.owner_address}</p>
                <p>{k.owner_mobile}</p>
                <p>{k.owner_email}</p>
            </div>
            <div class="column_pet" style="padding-left: 10px;border-left: solid black 1px;font-size: 14px;">
                <p><u>Állat adatai:</u></p>
                <p>Állat kód: {k.pet_id}</p>
                <p>Név: {k.pet_name}</p>
                <p>Faj: {k.pet_species}</p>
                <p>Fajta: {k.pet_breed}</p>
                <p>Szín: {k.pet_colour}</p>
                <p>Születési d.: {k.pet_born}</p>
                <p>Ivar: {k.pet_sex}</p>
                <p>Útlevélszáma: {k.pet_passport_num}</p>
                <p>Útlevél kiállításának dátuma: {k.pet_passport_date}</p>
                <p>Mikrochip száma: {k.pet_chip_id}</p>
                <p>Tömege: {k.pet_weight}</p>
            </div>
        </div>
        <br>
        <hr>
        <br>
        <b>Dátum: {k.med_chart_date}<br>
        Klinika, orvos: {k.hospital_name}, {k.vet_name}</b>
        <br><br>
        <b>[ Anamnesis ]</b>
        <br><br>
        {k.anamnesis}
        <br><br>
        <b>[ Symptoma ]</b>
        <br><br>
        {k.symptoms}
        <br><br>
        <b>[ Therapia ]</b>
        <br><br>
        {k.therapy}
        <br><br>
        <b>[ Megjegyzés, kezelési javaslat ]</b>
        <br><br>
        {k.notes}
        <br><br>
    </body>
</html>
    """
    f.writelines(html_code_pre)
    f.writelines(html_code)
    f.close()

if __name__=="__main__":

    # different function
    with open("static.txt") as f:
        data = f.read()

    js = json.loads(data)

    print(js)

    hosp_nam = js["hospital_name"]
    hosp_ban = js["hospital_banner"]
    hosp_add = js["hospital_address"]
    hosp_tel = js["hospital_telnum"]
    hosp_mob = js["hospital_mobile"]
    vet_nam = js["vet_name"]
    hosp_ema = js["hospital_email"]

    med_rec02 = Korlap(hosp_nam,hosp_add,
    hosp_ema,hosp_tel,hosp_mob,hosp_ban,"2023.01.11.",
    vet_nam,"","Hornyák","Marcell","kolozs. 1.","ashdhsav@dsabd.hu",
    "435435354","632846-28346","Lajos","kutya",
    "bernáthegyi","kék","2020.04.01","szukan","324242342342426","2020-01-01","83624986492","14","NaN","NaN","NaN","NOCOMMENT")
    
    write_md(med_rec02)