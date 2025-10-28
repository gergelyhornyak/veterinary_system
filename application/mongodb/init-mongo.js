db = db.getSiblingDB("appdb");

db.owners.insertMany(
  [
    {
      uid: "6c9e7d88-924f-4d26-9cf8-423f4762f2bb",
      fullname: "Kovács Ildikó",
      mobile: "+3630123235",
      email: "kovacs.ildiko@gmail.com",
      debt: 0,
      address: "2113, Dunakeszi, Karom utca, 8",
      pet: ["f45b6d7d-09cc-44a8-a981-1f4b2970a46c",
        "c83e6b0f-0f89-4ec2-8b45-9b6a513aa119"]
    },
    {
      uid: "d0a7bfc4-99b3-46d5-8cc0-2d5f6f394e3c",
      fullname: "Nagy Béla",
      mobile: "+36304561234",
      email: "nagy.bela@yahoo.com",
      debt: 4899,
      address: "1053, Budapest, Kossuth Lajos utca, 22",
      pet: ["20d76f8a-5305-4c43-93e5-d5b8f3784e30",
        "f9b47041-f5d1-497c-9c5e-6a86e79d9203",
        "f3c4a28e-3b71-4d32-9f9e-0c4e8d2306d5"
      ]
    },
    {
      uid: "52c1a2d0-14f7-4a43-a3d1-1b0f9d2dbfc8",
      fullname: "Horváth Etelka",
      mobile: "+36309876543",
      email: "szabo.katalin@gmail.com",
      debt: 0,
      address: "6725, Debrecen, Kabar utca, 13",
      pet: ["5c8b2f9c-0e4e-4e77-b59c-1992fb0c4a7b"]
    },
    {
      uid: "26b19dc9-7b95-4c40-8e08-2a4e2277e1d3",
      fullname: "Tóth Gergely",
      mobile: "+36301239876",
      email: "toth.gergely@hotmail.com",
      debt: 0,
      address: "9400, Sopron, Fő tér, 3",
      pet: ["781a8c53-1b16-4b3c-81e5-8e81cb3c1b1d"]
    },
    {
      uid: "0fbd7481-37c0-4c88-b3c0-0b9d3b612a36",
      fullname: "Horváth Eszter",
      mobile: "+36307778899",
      email: "horvath.eszter@gmail.com",
      debt: 34000,
      address: "4032, Debrecen, Derék utca, 45",
      pet: ["7d62f13c-05ad-49ef-8943-cccfda4af799"]
    },
    {
      uid: "9f10c452-6b2f-4cb2-9d15-8466b415cb55",
      fullname: "Varga Tamás",
      mobile: "+36301112222",
      email: "varga.tamas@yahoo.com",
      debt: 0,
      address: "6000, Kecskemét, Petőfi Sándor utca, 18",
      pet: ["ae85f882-2380-4a3e-8b38-86f90cb0ac62"]
    },
    {
      uid: "35a5f66b-3d65-4bbf-b3d7-0dd820d40c27",
      fullname: "Kiss Mária Zsófia",
      mobile: "+36306665544",
      email: "kiss.zsofia@gmail.com",
      debt: 0,
      address: "9022, Győr, Baross út, 7",
      pet: ["ef2a9cf1-1d5d-40ad-9859-c653beea91f3"]
    },
    {
      uid: "4e1c5f8a-9c66-45c2-94b1-19b4ec2a9f22",
      fullname: "Molnár Ferenc",
      mobile: "+36307773344",
      email: "molnar.ferenc@gmail.com",
      debt: 0,
      address: "8000, Székesfehérvár, Budai út, 12",
      pet: ["a7b8e654-cc0d-49a5-84f1-0e3f6784cfbb",
        "d6c24e7f-4099-46eb-88e1-08c6bb80f2f0"
      ]
    },
    {
      uid: "0a7f9e71-3f1c-41a8-b1a4-50f3a3e24d67",
      fullname: "Balogh-Kiss Andrea",
      mobile: "+36303332211",
      email: "balogh.andrea@gmail.com",
      debt: 0,
      address: "8900, Zalaegerszeg, Kosztolányi utca, 9",
      pet: ["41f59d7c-50f1-44c0-8ad7-7cfb2a6f0c52"]
    },
    {
      uid: "cb5b1574-9a87-4c7c-8b92-b9a6b9d2f1f0",
      fullname: "Farkas Bertalan Miklós",
      mobile: "+36301114455",
      email: "farkas.miklos@gmail.com",
      debt: 0,
      address: "3529, Miskolc, Árpád utca, 30",
      pet: ["2e9f803a-18ab-4c3f-9647-26d2d19c0a19"]
    },
    {
      uid: "a0f7e8b4-2c66-44aa-8c02-71f0f2de29a9",
      fullname: "Bognár Judit",
      mobile: "+36304445566",
      email: "bognar.judit@gmail.com",
      debt: 0,
      address: "7400, Kaposvár, Fő utca, 21",
      pet: ["fd6aa1a2-8637-44d6-a523-4bda7b7b37a6"]
    },
    {
      uid: "3d1aef17-814c-47a7-b87a-4e9a445b6b21",
      fullname: "Papp Dániel",
      mobile: "+36306669900",
      email: "papp.daniel@yahoo.com",
      debt: 0,
      address: "5600, Békéscsaba, Kazinczy utca, 5",
      pet: ["c96d4f26-f36a-4a45-8f7e-b32e22677bb9"]
    },
    {
      uid: "77bb72e6-f09c-4e07-a4e1-445b3dfeac27",
      fullname: "Lakatos Ágnes",
      mobile: "+36301115555",
      email: "lakatos.agnes@gmail.com",
      debt: 0,
      address: "7100, Szekszárd, Rákóczi út, 10",
      pet: ["b34dc63a-98df-4f5f-8ea0-8af6349a2381"]
    },
    {
      uid: "90a1a36f-245e-48f8-a279-f30e1a55a68a",
      fullname: "Istváni István",
      mobile: "+36307774422",
      email: "juhasz.istvan@hotmail.com",
      debt: 0,
      address: "3300, Eger, Dobó István tér, 6",
      pet: ["dcf3aaf7-f29b-48e8-8242-308dd7d2cf19"]
    },
    {
      uid: "31c3c7f6-58a8-4bcf-a91c-6f14c0cf8f41",
      fullname: "Gál Réka",
      mobile: "+36302229988",
      email: "gal.reka@gmail.com",
      debt: 0,
      address: "5000, Szolnok, Hunyadi út, 3",
      pet: ["92227b6a-cc76-4d02-8b1b-80464b4d6ad3"]
    },
    {
      uid: "59a1d0db-0f19-44e4-a7f6-64a2f5c95c8a",
      fullname: "Takács Norbert",
      mobile: "+36308881122",
      email: "takacs.norbert@gmail.com",
      debt: 4500,
      address: "4400, Nyíregyháza, Szent István utca, 28",
      pet: ["764ce523-f3c5-4d10-9b60-2fd0148f2f0e"]
    },
    {
      uid: "e8f4b640-6fc5-4cc7-bc84-10ddf815ea87",
      fullname: "Oláh Krisztina",
      mobile: "+36301119977",
      email: "olah.krisztina@yahoo.com",
      debt: 0,
      address: "7100, Paks, Béke utca, 17",
      pet: []
    },
    {
      uid: "3be481ad-d514-4fd8-8325-30d3a92a24d6",
      fullname: "Simonné Attiláné",
      mobile: "+36302223344",
      email: "simon.attila@gmail.com",
      debt: 0,
      address: "7400, Siófok, Vitorlás utca, 2",
      pet: []
    },
    {
      uid: "c94d3e10-c631-462b-b879-4781d763c318",
      fullname: "Simon Attila",
      mobile: "+36309997755",
      email: "fekete.laszlo@gmail.com",
      debt: 0,
      address: "2500, Esztergom, Kossuth Lajos tér, 12",
      pet: []
    },
    {
      uid: "abfa985e-7b5e-4147-9d56-c88f5b46c6fc",
      fullname: "Kelemen Beáta",
      mobile: "+36304446677",
      email: "kelemen.beata@gmail.com",
      debt: 0,
      address: "7632, Pécs, Rét utca, 15",
      pet: []
    },
    {
      uid: "d7b9b4c5-3271-42bb-bd4c-45a0e33b0191",
      fullname: "Kovács Anna Mária",
      mobile: "+36301112233",
      email: "kovacs.anna.maria@gmail.com",
      debt: 980,
      address: "2600, Vác, Duna utca, 5",
      pet: []
    },
    {
      uid: "ae60252f-2a8f-4974-91ec-2b8d7ad0f15c",
      fullname: "Szűcs Balázs",
      mobile: "+36305554433",
      email: "szucs.balazs@yahoo.com",
      debt: 0,
      address: "2131, Göd, Kertész utca, 8",
      pet: []
    },
    {
      uid: "1af5f9a8-82c1-463c-8058-73aa4a4f3a66",
      fullname: "Varga Éva",
      mobile: "+36306663311",
      email: "varga.eva@gmail.com",
      debt: 0,
      address: "2151, Fót, Béke tér, 2",
      pet: []
    },
    {
      uid: "8d37f0eb-6c41-4d72-9c83-6d7b4979f62e",
      fullname: "Tóth Gábor",
      mobile: "+36304445599",
      email: "toth.gabor@hotmail.com",
      debt: 10000,
      address: "2120, Dunakeszi, Liget utca, 4",
      pet: []
    },
    {
      uid: "6f011a5f-9d91-4764-9c7d-35f62d2cf182",
      fullname: "Molnár Péter András",
      mobile: "+36307778822",
      email: "molnar.peter.andras@gmail.com",
      debt: 0,
      address: "2600, Vác, Március 15. tér, 9",
      pet: []
    },
    {
      uid: "b1b25f33-bf2d-4b85-b1cd-82ff447a9f72",
      fullname: "Kiss Nagy Katalin",
      mobile: "+36301119955",
      email: "kiss.katalin@yahoo.com",
      debt: 2000,
      address: "2132, Göd, Ady Endre utca, 6",
      pet: []
    },
    {
      uid: "da0b0671-3c23-4e9d-8f0a-95cf6fcd4f82",
      fullname: "Farkas Zoltán",
      mobile: "+36302224488",
      email: "farkas.zoltan@gmail.com",
      debt: 0,
      address: "2151, Fót, Vörösmarty tér, 14",
      pet: []
    },
    {
      uid: "4c70c6b0-95d4-4bdb-9f0b-4cfd301f0f63",
      fullname: "Horváth Judit",
      mobile: "+36303335522",
      email: "horvath.judit@gmail.com",
      debt: 0,
      address: "2120, Dunakeszi, Kinizsi utca, 12",
      pet: []
    },
    {
      uid: "ed3d6a27-177e-4d0e-b3e2-7a5e6a27483d",
      fullname: "Balogh Tamás Ferenc",
      mobile: "+36307770011",
      email: "balogh.tamas.ferenc@gmail.com",
      debt: 0,
      address: "2600, Vác, Rákóczi út, 30",
      pet: []
    },
    {
      uid: "72d9b8ec-b3b5-4c6d-8122-5f53672778a0",
      fullname: "Istváni Erika",
      mobile: "+36309996644",
      email: "juhasz.erika@gmail.com",
      debt: 0,
      address: "2151, Fót, Kossuth Lajos utca, 25",
      pet: []
    }
  ]
);

db.pets.insertMany(
  [
    {
      pid: "f45b6d7d-09cc-44a8-a981-1f4b2970a46c",
      chipid: "985141000123456",
      name: "Buksi",
      species: "kutya",
      breed: ["tacskó"],
      colour: ["barna"],
      sex: "hím",
      birthday: "2018-06-21",
      record: [
        "7a1b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r"
      ],
      alive: true,
      neuter: false
    },
    {
      pid: "c83e6b0f-0f89-4ec2-8b45-9b6a513aa119",
      chipid: "",
      name: "Cirmi",
      species: "macska",
      breed: ["házi"],
      colour: ["cirmos"],
      sex: "nőstény",
      birthday: "2018-03-14",
      record: [
        "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
        "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
        "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u"
      ],
      alive: false,
      neuter: true
    },
    {
      pid: "20d76f8a-5305-4c43-93e5-d5b8f3784e30",
      chipid: "985141000987654",
      name: "Morzsi",
      species: "kutya",
      breed: ["keverék"],
      colour: ["fekete"],
      sex: "hím",
      birthday: "2017-11-02",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "f9b47041-f5d1-497c-9c5e-6a86e79d9203",
      chipid: "985141000192837",
      name: "Luna",
      species: "macska",
      breed: ["brit rövidszőrű"],
      colour: ["szürke"],
      sex: "nőstény",
      birthday: "2020-01-25",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "f3c4a28e-3b71-4d32-9f9e-0c4e8d2306d5",
      chipid: "985141000918273",
      name: "Rex",
      species: "kutya",
      breed: ["német juhász"],
      colour: ["fekete","barna"],
      sex: "hím",
      birthday: "2014-12-10",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "5c8b2f9c-0e4e-4e77-b59c-1992fb0c4a7b",
      chipid: "985141000546372",
      name: "Szerénke",
      species: "macska",
      breed: ["házi"],
      colour: ["fehér"],
      sex: "nőstény",
      birthday: "2019-07-19",
      record: [
        "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
        "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
        "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x"
      ],
      alive: true,
      neuter: false
    },
    {
      pid: "781a8c53-1b16-4b3c-81e5-8e81cb3c1b1d",
      chipid: "985141000334455",
      name: "Csoki",
      species: "kutya",
      breed: ["labrador"],
      colour: ["barna"],
      sex: "hím",
      birthday: "2016-05-07",
      record: [
        "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y"
      ],
      alive: true,
      neuter: false
    },
    {
      pid: "7d62f13c-05ad-49ef-8943-cccfda4af799",
      chipid: "985141000778899",
      name: "Mici",
      species: "macska",
      breed: ["sziámi"],
      colour: ["krémszínű"],
      sex: "nőstény",
      birthday: "2021-09-01",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "ae85f882-2380-4a3e-8b38-86f90cb0ac62",
      chipid: "985141000112233",
      name: "Folti",
      species: "kutya",
      breed: ["dalmata"],
      colour: ["fehér","fekete"],
      sex: "hím",
      birthday: "2012-08-15",
      record: [],
      alive: false,
      neuter: false
    },
    {
      pid: "ef2a9cf1-1d5d-40ad-9859-c653beea91f3",
      chipid: "985141000445566",
      name: "Cuki",
      species: "nyúl",
      breed: ["törpenyúl"],
      colour: ["szürke-fehér"],
      sex: "nőstény",
      birthday: "2022-04-11",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "a7b8e654-cc0d-49a5-84f1-0e3f6784cfbb",
      chipid: "985141000223344",
      name: "Picur",
      species: "kutya",
      breed: ["yorkshire terrier"],
      colour: ["arany","barna"],
      sex: "nőstény",
      birthday: "2019-10-03",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "d6c24e7f-4099-46eb-88e1-08c6bb80f2f0",
      chipid: "985141000667788",
      name: "Sámson",
      species: "kutya",
      breed: ["bernipásztor"],
      colour: ["fekete","fehér","barna"],
      sex: "hím",
      birthday: "2016-02-17",
      record: [],
      alive: true,
      neuter: true
    },
    {
      pid: "41f59d7c-50f1-44c0-8ad7-7cfb2a6f0c52",
      chipid: "985141000334466",
      name: "Pille",
      species: "macska",
      breed: ["házi"],
      colour: ["fehér","cirmos"],
      sex: "nőstény",
      birthday: "2021-12-08",
      record: [],
      alive: true,
      neuter: true
    },
    {
      pid: "2e9f803a-18ab-4c3f-9647-26d2d19c0a19",
      chipid: "985141000554433",
      name: "Max",
      species: "kutya",
      breed: ["golden retriever","keverék"],
      colour: ["arany"],
      sex: "hím",
      birthday: "2018-07-27",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "fd6aa1a2-8637-44d6-a523-4bda7b7b37a6",
      chipid: "985141000112299",
      name: "Cuki",
      species: "hörcsög",
      breed: ["törpehörcsög"],
      colour: ["szürke","fehér"],
      sex: "nőstény",
      birthday: "2023-03-14",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "c96d4f26-f36a-4a45-8f7e-b32e22677bb9",
      chipid: "985141000778800",
      name: "Frakk",
      species: "kutya",
      breed: ["vizsla"],
      colour: ["barna","foltos"],
      sex: "hím",
      birthday: "2015-05-01",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "b34dc63a-98df-4f5f-8ea0-8af6349a2381",
      chipid: "985141000445577",
      name: "Panna",
      species: "macska",
      breed: ["maine coon"],
      colour: ["vörös","cirmos"],
      sex: "nőstény",
      birthday: "2020-09-09",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "dcf3aaf7-f29b-48e8-8242-308dd7d2cf19",
      chipid: "985141000991122",
      name: "Bogyó",
      species: "nyúl",
      breed: ["holland törpenyúl"],
      colour: ["fekete","fehér"],
      sex: "hím",
      birthday: "2022-11-22",
      record: [],
      alive: true,
      neuter: false
    },
    {
      pid: "92227b6a-cc76-4d02-8b1b-80464b4d6ad3",
      chipid: "985141000553322",
      name: "Szellő",
      species: "kutya",
      breed: ["whippet"],
      colour: ["szürke","fehér"],
      sex: "nőstény",
      birthday: "2017-04-05",
      record: [],
      alive: false,
      neuter: false
    },
    {
      pid: "764ce523-f3c5-4d10-9b60-2fd0148f2f0e",
      chipid: "985141000889900",
      name: "Cirmoska",
      species: "macska",
      breed: ["házi"],
      colour: ["csíkos","fehér"],
      sex: "hím",
      birthday: "2019-01-30",
      record: [],
      alive: true,
      neuter: false
    }
  ]
);

db.records.insertMany(
  [
    {
      rid: "7a1b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      date: "2023-07-15T14:22:33Z",
      type: "vaccination",
      vaccination: 
      { value: "NOBIVAC TRICAT", label: "NOBIVAC TRICAT" },
      note: "Védőoltás beadva, enyhe láz jelentkezett, pihenés javasolt"
    },
    {
      rid: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
      date: "2023-08-22T10:15:00Z",
      type: "drug",
      drug: 
      { value: "CLAVUDALE TABL. 250 MG", label: "CLAVUDALE TABL. 250 MG", note: "2x1 naponta, étkezés után" },
      note: "Bőrgyulladás kezelése, antibiotikum kúra megkezdve"
    },
    {
      rid: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
      date: "2023-09-05T16:45:12Z",
      type: "treatment",
      treatment:
        { notes: "Fogkőeltávolítás elvégezve" },
      note: "Szájhigiénia rendben, kontroll 6 hónap múlva esedékes"
    },
    {
      rid: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
      date: "2023-10-18T11:30:45Z",
      type: "receipt",
      receipt: 
        { value: "APTUS NUTRISAL", label: "APTUS NUTRISAL" }
      ,
      note: "Folyadékpótlás és vitaminok felírva, hasmenés miatt"
    },
    {
      rid: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
      date: "2023-11-30T09:20:15Z",
      type: "drug",
      drug: 
        { value: "KEFAVET TABL. 500 MG", label: "KEFAVET TABL. 500 MG", note: "1x1 reggel" }
      ,
      note: "Húgyúti fertőzés kezelése, sok folyadék fogyasztása javasolt"
    },
    {
      rid: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
      date: "2023-12-12T13:40:22Z",
      type: "vaccination",
      vaccination: 
        { value: "VERSICAN DHPPI/L4", label: "VERSICAN DHPPI/L4" }
      ,
      note: "Éves oltás beadva, kutya jól viselte"
    },
    {
      rid: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
      date: "2024-01-25T15:55:33Z",
      type: "treatment",
      treatment: 
        { notes: "Fültisztítás és mintavétel" }
      ,
      note: "Középfülgyulladás gyanúja, további vizsgálatok szükségesek"
    },
    {
      rid: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
      date: "2024-02-08T10:10:10Z",
      type: "receipt",
      receipt: 
        { value: "OTODINE 100 ML", label: "OTODINE 100 ML" }
      ,
      note: "Fülcseppek felírva, napi kétszeri alkalmazás javasolt"
    },
    {
      rid: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
      date: "2024-03-17T14:15:00Z",
      type: "drug",
      drug: 
        { value: "RHEUMOCAM TABL. 2,5 MG", label: "RHEUMOCAM TABL. 2,5 MG", note: "1x1 délben" }
      ,
      note: "Ízületi gyulladás kezelése, mozgás mérséklése javasolt"
    },
    {
      rid: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
      date: "2024-04-01T11:25:45Z",
      type: "vaccination",
      vaccination: 
        { value: "NOBIVAC RABIES", label: "NOBIVAC RABIES" }
      ,
      note: "Veszettség elleni oltás beadva, minden rendben"
    }
  ]
);

db.drugs.insertMany(
  [
    { value: "OTOACT 100 ML", label: "OTOACT 100 ML", type: "vaccine" },
    { value: "OTODINE 100 ML", label: "OTODINE 100 ML", type: "vaccine" },
    { value: "EPIOTIC 125 ML", label: "EPIOTIC 125 ML", type: "vaccine" },
    { value: "OTIMAX 100 ML", label: "OTIMAX 100 ML" },
    { value: "OTODEZACIN FÜLCSEPP", label: "OTODEZACIN FÜLCSEPP", type: "drug" },
    { value: "OTOMICOL FÜLCSEPP", label: "OTOMICOL FÜLCSEPP" },
    { value: "EASOTIC FÜLCSEPP", label: "EASOTIC FÜLCSEPP" },
    { value: "NEXGARD COMBO MACSKA 2,5-7,5 KG", label: "NEXGARD COMBO MACSKA 2,5-7,5 KG", type: "pedigree" },
    { value: "VETGUARD 30 ML", label: "VETGUARD 30 ML" },
    { value: "SYNOMAX MACSKA 100 ML", label: "SYNOMAX MACSKA 100 ML" },
    { value: "SYNOMAX KUTYA 275 ML", label: "SYNOMAX KUTYA 275 ML" },
    { value: "DERMOMAX SAMPON", label: "DERMOMAX SAMPON" },
    { value: "CLOREXYDERM OLDAT", label: "CLOREXYDERM OLDAT" },
    { value: "FORESTO NYAKÖRV KICSI", label: "FORESTO NYAKÖRV KICSI" },
    { value: "FORESTO NYAKÖRV NAGY", label: "FORESTO NYAKÖRV NAGY" },
    { value: "KILTIX NYAKÖRV KICSI", label: "KILTIX NYAKÖRV KICSI" },
    { value: "KILTIX NYAKÖRV KÖZEPES", label: "KILTIX NYAKÖRV KÖZEPES" },
    { value: "KILTIX NYAKÖRV NAGY", label: "KILTIX NYAKÖRV NAGY" },
    { value: "BRAVECTO TABL. 4,5-10 KG", label: "BRAVECTO TABL. 4,5-10 KG" },
    { value: "BRAVECTO TABL. 10-20 KG", label: "BRAVECTO TABL. 10-20 KG" },
    { value: "BRAVECTO TABL. 20-40 KG", label: "BRAVECTO TABL. 20-40 KG" },
    { value: "BRAVECTO TABL. 40-56 KG", label: "BRAVECTO TABL. 40-56 KG" },
    { value: "MILPRAZON TABL. 2,5/25 MG", label: "MILPRAZON TABL. 2,5/25 MG" },
    { value: "MILPRAZON TABL. 12,5/125 MG", label: "MILPRAZON TABL. 12,5/125 MG" },
    { value: "BRAVECTO PLUS CSEPP MACSKA 2,8-6,25 KG", label: "BRAVECTO PLUS CSEPP MACSKA 2,8-6,25 KG" },
    { value: "ADTAB TABL. MACSKA 2-8 KG", label: "ADTAB TABL. MACSKA 2-8 KG" },
    { value: "VECTRA 3D CSEPP 1,5-4 KG", label: "VECTRA 3D CSEPP 1,5-4 KG" },
    { value: "VECTRA 3D CSEPP 4-10 KG", label: "VECTRA 3D CSEPP 4-10 KG" },
    { value: "VECTRA 3D CSEPP 10-25 KG", label: "VECTRA 3D CSEPP 10-25 KG" },
    { value: "VECTRA 3D CSEPP 25-40 KG", label: "VECTRA 3D CSEPP 25-40 KG" },
    { value: "AGROFERM 100GR", label: "AGROFERM 100GR" },
    { value: "PROBICOL-H PASZTA", label: "PROBICOL-H PASZTA" },
    { value: "PRO-PET PASZTA", label: "PRO-PET PASZTA" },
    { value: "PURINA FORTIFLORA MACSKA", label: "PURINA FORTIFLORA MACSKA" },
    { value: "PURINA FORTIFLORA KUTYA", label: "PURINA FORTIFLORA KUTYA" },
    { value: "CLX WIPES 20DB", label: "CLX WIPES 20DB" },
    { value: "SIMPARICA TRIO 1,25-2,5 KG", label: "SIMPARICA TRIO 1,25-2,5 KG" },
    { value: "SIMPARICA TRIO 2,5-5 KG", label: "SIMPARICA TRIO 2,5-5 KG" },
    { value: "SIMPARICA TRIO 5-10 KG", label: "SIMPARICA TRIO 5-10 KG" },
    { value: "SIMPARICA TRIO 10-20 KG", label: "SIMPARICA TRIO 10-20 KG" },
    { value: "SIMPARICA TRIO 20-40 KG", label: "SIMPARICA TRIO 20-40 KG" },
    { value: "SIMPARICA TRIO 40-60 KG", label: "SIMPARICA TRIO 40-60 KG" },
    { value: "NEXGARD SPECTRA 1,35-3,5 KG", label: "NEXGARD SPECTRA 1,35-3,5 KG" },
    { value: "NEXGARD SPECTRA 3,5-7,5 KG", label: "NEXGARD SPECTRA 3,5-7,5 KG" },
    { value: "NEXGARD SPECTRA 7,5-15 KG", label: "NEXGARD SPECTRA 7,5-15 KG" },
    { value: "NEXGARD SPECTRA 15-30 KG", label: "NEXGARD SPECTRA 15-30 KG" },
    { value: "NEXGARD SPECTRA 30-60 KG", label: "NEXGARD SPECTRA 30-60 KG" },
    { value: "SIMPARICA TABL. 1,3-2,5 KG", label: "SIMPARICA TABL. 1,3-2,5 KG" },
    { value: "SIMPARICA TABL. 2,5-5 KG", label: "SIMPARICA TABL. 2,5-5 KG" },
    { value: "SIMPARICA TABL. 5-10 KG", label: "SIMPARICA TABL. 5-10 KG" },
    { value: "SIMPARICA TABL. 10-20 KG", label: "SIMPARICA TABL. 10-20 KG" },
    { value: "SIMPARICA TABL. 20-40 KG", label: "SIMPARICA TABL. 20-40 KG" },
    { value: "SIMPARICA TABL. 40-60 KG", label: "SIMPARICA TABL. 40-60 KG" },
    { value: "FERDOCAT PASZTA", label: "FERDOCAT PASZTA" },
    { value: "FERDOCAT TABLETTA", label: "FERDOCAT TABLETTA" },
    { value: "DOGVERM TABL.", label: "DOGVERM TABL." },
    { value: "DRONTAL PLUS TABL.", label: "DRONTAL PLUS TABL." },
    { value: "ANIPRANTEL CAT TABL.", label: "ANIPRANTEL CAT TABL." },
    { value: "MILPRAZON MACSKA 16/40 MG", label: "MILPRAZON MACSKA 16/40 MG" },
    { value: "STRONGHOLD PLUS MACSKA 2,5 KG ALATT", label: "STRONGHOLD PLUS MACSKA 2,5 KG ALATT" },
    { value: "STRONGHOLD PLUS MACSKA 2,5-5 KG", label: "STRONGHOLD PLUS MACSKA 2,5-5 KG" },
    { value: "STRONGHOLD PLUS MACSKA 5-10 KG", label: "STRONGHOLD PLUS MACSKA 5-10 KG" },
    { value: "SELEHOLD CSEPP 15 MG", label: "SELEHOLD CSEPP 15 MG" },
    { value: "APTUS NUTRISAL", label: "APTUS NUTRISAL" },
    { value: "BISOLVON POR", label: "BISOLVON POR" },
    { value: "RHEUMOCAM TABL. 1 MG", label: "RHEUMOCAM TABL. 1 MG" },
    { value: "RHEUMOCAM TABL. 2,5 MG", label: "RHEUMOCAM TABL. 2,5 MG" },
    { value: "CANIDRYL TABL. 100 MG", label: "CANIDRYL TABL. 100 MG" },
    { value: "KESIUM TABL. 50 MG", label: "KESIUM TABL. 50 MG" },
    { value: "CLAVUDALE TABL. 250 MG", label: "CLAVUDALE TABL. 250 MG" },
    { value: "CLAVUDALE TABL. 500 MG", label: "CLAVUDALE TABL. 500 MG" },
    { value: "KEFAVET TABL. 250 MG", label: "KEFAVET TABL. 250 MG" },
    { value: "KEFAVET TABL. 500 MG", label: "KEFAVET TABL. 500 MG" },
    { value: "FLOXABACTIN TABL. 50 MG", label: "FLOXABACTIN TABL. 50 MG" },
    { value: "ENROFLOXACIN TABL. 150 MG", label: "ENROFLOXACIN TABL. 150 MG" },
    { value: "ZODON TABL. 275 MG", label: "ZODON TABL. 275 MG" },
    { value: "LAEVOLAC SZIRUP", label: "LAEVOLAC SZIRUP" },
    { value: "PARAFFINOLAJ", label: "PARAFFINOLAJ" },
    { value: "SOLU-MEDROL INJ.", label: "SOLU-MEDROL INJ." },
    { value: "DEPO-MEDROL INJ.", label: "DEPO-MEDROL INJ." },
    { value: "RAPIDEXON INJ.", label: "RAPIDEXON INJ." },
    { value: "MELOSOLUTE INJ.", label: "MELOSOLUTE INJ." },
    { value: "PRIMAMOX INJ.", label: "PRIMAMOX INJ." },
    { value: "SHOTAPEN INJ.", label: "SHOTAPEN INJ." },
    { value: "CATOSAL INJ.", label: "CATOSAL INJ." },
    { value: "NEOVIT-B INJ.", label: "NEOVIT-B INJ." },
    { value: "OXYTOCINE INJ.", label: "OXYTOCINE INJ." },
    { value: "PREVOMAX INJ.", label: "PREVOMAX INJ." },
    { value: "LIDOBELL INJ.", label: "LIDOBELL INJ." },
    { value: "DIPROPHOS INJ.", label: "DIPROPHOS INJ." },
    { value: "K VITAMIN INJ.", label: "K VITAMIN INJ." },
    { value: "MELOXIDYL SZIRUP", label: "MELOXIDYL SZIRUP" },
    { value: "VERAFLOX 15 ML", label: "VERAFLOX 15 ML" },
    { value: "NEOSTOMOSAN 5ML", label: "NEOSTOMOSAN 5ML" },
    { value: "DIARSANYL PASZTA", label: "DIARSANYL PASZTA" },
    { value: "BOLUS ADSTRINGENS TABL.", label: "BOLUS ADSTRINGENS TABL." },
    { value: "CRALEX TABL.", label: "CRALEX TABL." },
    { value: "KÉK LUKÁCS KENŐCS", label: "KÉK LUKÁCS KENŐCS" },
    { value: "VETRAMIL KENŐCS", label: "VETRAMIL KENŐCS" },
    { value: "VERSICAN DHPPI/L4", label: "VERSICAN DHPPI/L4" },
    { value: "VERSICAN DHPPI/L4R", label: "VERSICAN DHPPI/L4R" },
    { value: "NOBIVAC RABIES", label: "NOBIVAC RABIES" },
    { value: "RABISIN", label: "RABISIN" },
    { value: "NOBIVAC KC", label: "NOBIVAC KC" },
    { value: "NOBIVAC MYXO RHD", label: "NOBIVAC MYXO RHD" },
    { value: "VERSIFEL CVR", label: "VERSIFEL CVR" },
    { value: "VERSIFEL FELV", label: "VERSIFEL FELV" },
    { value: "LEUCOFELIGEN", label: "LEUCOFELIGEN" },
    { value: "PUREVAX RCPCH-FELV", label: "PUREVAX RCPCH-FELV" },
    { value: "NOBIVAC TRICAT", label: "NOBIVAC TRICAT" },
    { value: "NOBIVAC TRICAT/RABIES", label: "NOBIVAC TRICAT/RABIES" },
    { value: "PREDNICORTON TABL. 20 MG", label: "PREDNICORTON TABL. 20 MG" },
    { value: "PREDNISOLONE TABL. 5 MG", label: "PREDNISOLONE TABL. 5 MG" },
    { value: "CONTROLOC TABL. 20 MG", label: "CONTROLOC TABL. 20 MG" },
    { value: "CONTROLOC TABL. 40 MG", label: "CONTROLOC TABL. 40 MG" },
    { value: "QUAMATEL TABL.", label: "QUAMATEL TABL." },
    { value: "KLION TABL. 250 MG", label: "KLION TABL. 250 MG" },
    { value: "ATARAX TABL.", label: "ATARAX TABL." },
    { value: "CETIRIZIN TABL.", label: "CETIRIZIN TABL." },
    { value: "MUCOPRONT TABL.", label: "MUCOPRONT TABL." },
    { value: "MUCOPRONT SZIRUP", label: "MUCOPRONT SZIRUP" },
    { value: "ACC 200", label: "ACC 200" },
    { value: "BETADINE OLDAT", label: "BETADINE OLDAT" },
    { value: "SENSPERT DIROFILARIA TESZT", label: "SENSPERT DIROFILARIA TESZT" },
    { value: "SENSPERT FIV-FELV TESZT", label: "SENSPERT FIV-FELV TESZT" }
  ]
);